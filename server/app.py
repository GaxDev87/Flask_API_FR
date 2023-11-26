from flask import Flask, request, json, jsonify, session, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from config import ApplicationConfig
from models import db, Users, Roles, Courses
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

# Register a user
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
   
# Get current user
@app.route("/current")
def get_current_user():
    user_Id = session.get("user_Id")

    if not user_Id:
        return jsonify({"error": "Unauthorized"}), 401

    user = Users.query.filter_by(user_Id=user_Id).first()
    return jsonify({"id": user.user_Id, "email": user.email})

# Create a course
@app.route("/course", methods=["POST"])
def register_course():    
   
    try:      
        user_Id = session.get("user_Id")
        course_Name = request.json["course_Name"]
        #verifies if Id provided exists in the Users table
        user = Users.query.filter_by(user_Id=user_Id).first()
        if not user:
           return jsonify({"error": "User does not exist in database"}), 401
        

        course_exists = Courses.query.filter_by(course_Name=course_Name, user_Id=user.user_Id).first() is not None

        if course_exists:
            return jsonify({"error": "A course associated with current user already exists"}), 409

        new_course = Courses(course_Name=course_Name, user_Id=user.user_Id)
        db.session.add(new_course)
        db.session.commit()
        session["course_Id"] = new_course.course_Id
        return jsonify({'message': 'course created!',  "user_Id": new_course.user_Id, "FirstName": user.firstName, 
                        "lastName": user.lastName,"course_Id": new_course.course_Id, "Course_Name": new_course.course_Name})
    except:
        return jsonify({'error': 'error creating user'}), 500   

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
