from flask import Flask, request, json, jsonify, session, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from config import ApplicationConfig
from models import db, Users, Roles, Permissions, Courses, Documents, Videos, Enrollments
import os

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "Hello World From Flask!"


app.config.from_object(ApplicationConfig)
app.config["SESSION_TYPE"] = "redis"

bcrypt = Bcrypt(app)
server_session = Session(app)
CORS(app, supports_credentials=True)
db.init_app(app)


with app.app_context():
    db.create_all()
    
# ##********************USERS*********************#

# register a user
@app.route("/user", methods=["POST"])
def register_user():    
   
    try:
        firstName = request.json["firstName"]
        lastName = request.json["lastName"]
        email = request.json["email"]
        password = request.json["password"]

        user_exists = Users.query.filter_by(email=email).first() is not None

        if user_exists:
            return jsonify({"error": "User already exists"}), 409

        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
        new_user = Users(firstName=firstName, lastName=lastName, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        session["user_Id"] = new_user.user_Id
        return jsonify({'message': 'user created!',"id": new_user.user_Id, "firstName": new_user.firstName, "lastName": new_user.lastName,"email": new_user.email})
    except:
        return jsonify({'error': 'error creating user'}), 500    
   

# register a user for a course 
@app.route("/course_enrollment", methods=["POST"])
def register_user_course():
   
    try:       
        email = request.json["email"]
        course_Id = request.json["course_Id"]

        user = Users.query.filter_by(email=email).first()
        course = Courses.query.filter_by(course_Id=course_Id).first()

        if not user and not course:
           return jsonify({"error": "user or course not found"}), 401    
        
        course_exists = Enrollments.query.filter_by(email=email, course_Id=course_Id).first() is not None

        if course_exists:
            return jsonify({"error": "User already registered for this course"}), 409

        new_enrollment = Enrollments(course_Id=course_Id, email=email, course_Name=course.course_Name, firstName=user.firstName, lastName=user.lastName)
        db.session.add(new_enrollment)
        db.session.commit()
        session["enrollment_Id"] = new_enrollment.enrollment_Id
        return jsonify({'message': 'user created!',"id": new_enrollment.enrollment_Id, "firstName": new_enrollment.firstName, "lastName": new_enrollment.lastName})
    except:
        return jsonify({'error': 'error creating user'}), 500    
   

# get current user
@app.route("/current")
def get_current_user():
    user_Id = session.get("user_Id")

    if not user_Id:
        return jsonify({"error": "Unauthorized"}), 401

    user = Users.query.filter_by(user_Id=user_Id).first()
    return jsonify({"id": user.user_Id, "email": user.email})

# get all users
@app.route("/users", methods=["GET"])
def get_users():
    return jsonify(
        [
            {
                "id": user.id,
                "email": user.email,
            }
            for user in Users.query.all()
        ]
    )

# get a user by id
@app.route('/users/<int:user_Id>', methods=['GET'])
def get_user(user_Id):
  try:
    user = Users.query.filter_by(user_Id=user_Id).first()
    if user:
      return jsonify({"id": user.user_Id, "email": user.email}), 200
    return jsonify({'message': 'user not found'}), 404
  except:
    return jsonify({'message': 'error getting user'}), 500


# create a course
@app.route("/course", methods=["POST"])
def register_course():    
   
    try:      
        course_Name = request.json["course_Name"]
        department_Name = request.json["department_Name"]
        #verifies if Id provided exists in Users table         

        course_exists = Courses.query.filter_by(course_Name=course_Name).first() is not None

        if course_exists:
            return jsonify({"error": "A course with the name provided already exists"}), 409

        new_course = Courses(course_Name=course_Name, department_Name=department_Name)
        db.session.add(new_course)
        db.session.commit()
        session["course_Id"] = new_course.course_Id
        return jsonify({'message': 'course created!',"course_Id": new_course.course_Id, "Course_Name": new_course.course_Name, "Department": new_course.department_Name})
    except:
        return jsonify({'error': 'error creating user'}), 500   

#delete a course
@app.route('/course/<int:id>', methods=['DELETE'])
def delete_course(id):
   try:
     course = Courses.query.filter_by(course_Id=id).first()
     if course:
       db.session.delete(course)
       db.session.commit()      
       return jsonify({'message': 'user deleted'}), 200
     return jsonify({'message': 'user not found'}), 404
   except:
     return jsonify({'message': 'error getting user'}), 500

# create a resource document
@app.route("/document", methods=["POST"])
def create_document(): 

    try:   
        course_Id = request.json["course_Id"]   
        course_Name= request.json["course_Name"]
        document_Url = request.json["document_Url"]

        #verifies if course name provided exists in courses table
        course = Courses.query.filter_by(course_Id=course_Id, course_Name=course_Name).first()
        if not course:
           return jsonify({"error": "Course name does not exist in database"}), 401
        
        # verifies if a course name with the same url already exists in Documents table
        document_exists = Documents.query.filter_by(document_Name=course.course_Name, document_Url=document_Url).first() is not None

        if document_exists:
            return jsonify({"error": "An url document associated with course already exists"}), 409

        new_document = Documents(course_Id=course_Id, document_Name=course_Name, document_Url=document_Url)
        db.session.add(new_document)
        db.session.commit()
        session["course_Id"] = new_document.document_Id
        return jsonify({'message': 'document created!',  "document_Id": new_document.document_Id, "document_Name": new_document.document_Name})
    except:
        return jsonify({'error': 'error creating user'}), 500   
    
#delete a document
@app.route('/document/<int:id>', methods=['DELETE'])
def delete_document(id):
   try:
     document = Documents.query.filter_by(document_Id=id).first()
     if document:
       db.session.delete(document)
       db.session.commit()      
       return jsonify({'message': 'document deleted'}), 200
     return jsonify({'message': 'document not found'}), 404
   except:
     return jsonify({'message': 'error getting document'}), 500

# Create a  video
@app.route("/video", methods=["POST"])
def create_video(): 
    try:   
        course_Id = request.json["course_Id"]   
        course_Name= request.json["course_Name"]
        video_Url = request.json["video_Url"]

        #verifies if course name provided exists in courses table
        course = Courses.query.filter_by(course_Id=course_Id, course_Name=course_Name).first()
        if not course:
           return jsonify({"error": "Course name does not exist in database"}), 401
        
        # verifies if a course name with the same url already exists in Videos table
        video_exists = Videos.query.filter_by(video_Name=course.course_Name, video_Url=video_Url).first() is not None

        if video_exists:
            return jsonify({"error": "An url document associated with course already exists"}), 409

        new_video = Videos(course_Id=course_Id, video_Name=course_Name, video_Url=video_Url)
        db.session.add(new_video)
        db.session.commit()
        session["course_Id"] = new_video.video_Id
        return jsonify({'message': 'video created!',  "video_Id": new_video.video_Id, "video_Name": new_video.video_Name})
    except:
        return jsonify({'error': 'error creating user'}), 500   
    

#delete a video
@app.route('/video/<int:id>', methods=['DELETE'])
def delete_video(id):
   try:
     video = Videos.query.filter_by(video_Id=id).first()
     if video:
       db.session.delete(video)
       db.session.commit()      
       return jsonify({'message': 'video deleted'}), 200
     return jsonify({'message': 'video not found'}), 404
   except:
     return jsonify({'message': 'error getting video'}), 500


# # updating a user by id
# @app.route("/users/<int:id>", methods=["PUT"])
# def update_user(id):

#     if not id:
#         return jsonify({"error": "Unauthorized"}), 401
    
#     try:
#         user = User.query.filter_by(id=id).first()

#         if user:
#             user.email = request.json["email"]
#             db.session.commit()
#             return jsonify({'message': 'user updated',"id": user.id, "email": user.email}), 200
#     except:
#         return jsonify({'message': 'error getting user'}), 500


# # add a new student

# # delete a user
# @app.route('/users/<int:id>', methods=['DELETE'])
# def delete_user(id):
#   try:
#     user = User.query.filter_by(id=id).first()
#     if user:
#       db.session.delete(user)
#       db.session.commit()      
#       return jsonify({'message': 'user deleted'}), 200
#     return jsonify({'message': 'user not found'}), 404
#   except:
#     return jsonify({'message': 'error getting user'}), 500


# #********************STUDENTS************************#

# @app.route("/registerstudent", methods=["POST"])
# def register_student():

#     try:
#         firstname = request.json["firstname"]
#         lastname = request.json["lastname"]
#         email = request.json["email"]
#         age = request.json["age"]

#         student_exists = Student.query.filter_by(email=email).first() is not None

#     except student_exists:
#         return jsonify({"error": "Student already exists"}), 409

#         new_student = Student(
#             firstname=firstname, lastname=lastname, email=email, age=age
#         )
#         db.session.add(new_student)
#         db.session.commit()

#         session["student_id"] = new_student.id

#         return jsonify(
#             {
#                 "id": new_student.id,
#                 "firstname": new_student.firstname,
#                 "lastname": new_student.lastname,
#                 "email": new_student.email,
#                 "age": new_student.age,
#             }
#         )

# # Get current student
# @app.route("/currentStudent")
# def get_current_student():
#     student_id = session.get("student_id")

#     if not student_id:
#         return jsonify({"error": "Unauthorized"}), 401
#     student = Student.query.filter_by(id=student_id).first()
#     return jsonify({"id": student.id, "email": student.email})

# # get all students
# @app.route("/students", methods=["GET"])
# def get_students():

#     return jsonify(
#         [
#             {
#                 "id": student.id,
#                 "firstname": student.firstname,
#                 "lastname": student.lastname,
#                 "email": student.email,
#                 "age": student.age,
#             }
#             for student in Student.query.all()])

# # Login
# @app.route("/login", methods=["POST"])
# def login_user():
#     email = request.json["email"]
#     password = request.json["password"]

#     user = User.query.filter_by(email=email).first()

#     if user is None:
#         return jsonify({"error": "Unauthorized"}), 401

#     if not bcrypt.check_password_hash(user.password, password):
#         return jsonify({"error": "Unauthorized"}), 401

#     session["user_id"] = user.id

#     return jsonify({"id": user.id, "email": user.email})

# # Logout
# @app.route("/logout", methods=["POST"])
# def logout_user():
#     session.pop("user_id")
#     return "200"

if __name__ == "__main__":
    app.run(debug=True)
