from flask import Flask, request, json, jsonify, session, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from config import ApplicationConfig
from models import db, Users, User_courses, Courses, Documents, Videos, User_courses
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

# create a user
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
        return jsonify({'message': 'user created!',"id": new_user.user_Id, "firstName": new_user.firstName, "lastName": new_user.lastName, "group_Type": new_user.group_Type,"email": new_user.email})
    except:
        return jsonify({'error': 'error creating user'}), 500   
    
# # update a user by id
@app.route("/update/<int:id>", methods=["PUT"])
def update_user(id):
 try:
    user = Users.query.filter_by(user_Id=id).first()
    if user:
        user.firstName = request.json["firstName"]
        user.lastName = request.json["lastName"]
        user.email = request.json["email"]
        user.user_Type = request.json["user_Type"]
        db.session.commit()
             
        return jsonify({'message': 'User updated!',"id": user.user_Id, "firstName": user.firstName, "lastName": user.lastName,  "Email": user.email, "user_Type": user.user_Type}), 200
 except:
        return jsonify({'message': 'error updating user'}), 500

# # delete a user
    
@app.route('/delete/<int:id>', methods=['DELETE'])
def delete_user(id):
   try:
     user = Users.query.filter_by(user_Id=id).first()
     if user:
       db.session.delete(user)
       db.session.commit()      
       return jsonify({'message': 'user deleted'}), 200
     return jsonify({'message': 'user not found'}), 404
   except:
     return jsonify({'message': 'error getting user'}), 500
   

# register a user for a course 
@app.route("/course_enrollment", methods=["POST"])
def register_user_course():
   
    try:       
        email = request.json["email"]
        course_Id = request.json["course_Id"]

        user = Users.query.filter_by(email=email).first()
        course = Courses.query.filter_by(course_Id=course_Id).first()

        if not user and not course:
           return jsonify({"error": "User or course not found"}), 401    
        
        course_and_user_exists = User_courses.query.filter_by(course_Id=course_Id, user_Id=user.user_Id).first() is not None

        if course_and_user_exists:
            return jsonify({"error": "User already registered for this course"}), 409

        new_enrollment = User_courses( user_Id=user.user_Id, course_Id=course_Id, course_Name=course.course_Name)
        db.session.add(new_enrollment)
        db.session.commit()
        session["user_course_Id"] = new_enrollment.user_course_Id
        return jsonify({'message': 'User created!', "user id": new_enrollment.user_Id, "id": new_enrollment.user_course_Id, "Course Name": new_enrollment.course_Name})
    except:
        return jsonify({'error': 'Error creating user'}), 500    
    

    # get # of enrolled courses by user id
@app.route('/user_courses/<id>', methods=['GET'])
def get_user_courses(id):

  try:
    id_exists=User_courses.query.filter_by(user_Id=id).first()

    if not id_exists:
      return jsonify({"error": "User not enrolled for any course"}), 401       

    return jsonify(
    [
        {
            "user_Id": user.user_Id,              
            "course_Id": user.course_Id,
            "course_Name": user.course_Name,
            
        }
        for user in User_courses.query.filter_by(user_Id=id)
    ]
)
  
  except:
      return jsonify({'message': 'error getting enrollments'}), 500
    

# get current user
@app.route("/current")
def get_current_user():
    user_Id = session.get("user_Id")

    if not id:
        return jsonify({"error": "Unauthorized"}), 401

    user = Users.query.filter_by(user_Id=user_Id).first()
    return jsonify({ "id": user.user_Id,              
                "firstName": user.firstName,
                "lastName": user.lastName,
                "email": user.email,})

# get all users,
@app.route("/users", methods=["GET"])
def get_users():
    return jsonify(
        [
            {
                "id": user.user_Id,              
                "firstName": user.firstName,
                "lastName": user.lastName,
                "group_Type": user.group_Type,                
                "email": user.email,
                "user_Type": user.user_Type,
            }
            for user in Users.query.all()
        ]
    )

# get a user by id
@app.route('/users/<id>', methods=['GET'])
def get_user(id):
  
  try:
    
    user = Users.query.filter_by(user_Id=id).first()
    if user:
     

      return jsonify({ "user_Id": user.user_Id,              
                "firstName": user.firstName,
                "lastName": user.lastName,
                "user_Type": user.user_Type,
                "group_Type": user.group_Type, 
                "email": user.email,}), 200
    
    session["user_id"] = user.user_Id
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
    


# get all courses
@app.route('/get_courses', methods=["GET"])
def get_courses():
    
    return jsonify(
        [ 
            {   
                "course_Id": course.course_Id,              
                "course_Name": course.course_Name,
                "department_Name": course.department_Name,
              
            }
            for course in Courses.query.all()
        ]
    )

    
    # # update a course by course id
@app.route("/course/<int:id>", methods=["PUT"])
def update_course(id):

     if not id:
         return jsonify({"error": "course id not found"}), 401
    
     try:
         course = Courses.query.filter_by(course_Id=id).first()
         enrollment = User_courses.query.filter_by(course_Id=id).first()

         if course:
             course.course_Name = request.json["course_Name"]
             course.department_Name = request.json["department_Name"] 
             enrollment.course_Name = course.course_Name 
             db.session.commit()
             return jsonify({'message': 'Course updated!',"id": course.course_Id, "Name": course.course_Name, "Department": course.department_Name}), 200
     except:
         return jsonify({'message': 'error updating course'}), 500

#delete a course
@app.route('/delete_course/<int:id>', methods=['DELETE'])
def delete_course(id):
   try:
     course = Courses.query.filter_by(course_Id=id).first()
     if course:
       db.session.delete(course)
       db.session.commit()      
       return jsonify({'message': 'course deleted'}), 200
     return jsonify({'message': 'course not found'}), 404
   except:
     return jsonify({'message': 'error getting course'}), 500
   

   
# get # of resources by course id
@app.route('/course_resources/<id>', methods=['GET'])
def get_resources(id):

  try:
    id_document_exists=Documents.query.filter_by(course_Id=id).first()
    id_video_exists=Videos.query.filter_by(course_Id=id).first()

    if not id_document_exists or not id_video_exists:
      return jsonify({"error": "No resources found for the selected course"}), 401       

    return jsonify(
    [
        {
            "document_Id": document.document_Id,              
            "document_Name": document.document_Name,
            "document_Url": document.document_Url,
            "video_Id": video.video_Id,              
            "video_Name": video.video_Name,
            "video_Url": video.video_Url,
            
        }
        for document in Documents.query.filter_by(course_Id=id)
        for video in Videos.query.filter_by(course_Id=id)

    ])  
  
  except:
      return jsonify({'message': 'error getting recourses'}), 500

# create a resource document
@app.route("/document", methods=["POST"])
def create_document(): 

    try:   
        course_Id = request.json["course_Id"]   
        course_Name= request.json["course_Name"]
        document_Url = request.json["document_Url"]

        #verifies if course name and course id correspond with a record in the table
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
        return jsonify({'error': 'error creating document'}), 500  


# # update a document by course id
@app.route("/document/<int:id>", methods=["PUT"])
def update_document(id):

     if not id:
         return jsonify({"error": "document id not found"}), 401
    
     try:
         document = Documents.query.filter_by(document_Id=id).first()
       

         if document:
             document.document_Url = request.json["document_Url"]
           
             db.session.commit()
             return jsonify({'message': 'document updated!',"id": document.document_Id, "Url": document.document_Url}), 200
     except:
         return jsonify({'message': 'error updating document_Url'}), 500 
    
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

        #verifies if course name and course id correspond with a record in the table
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
        return jsonify({'error': 'error creating video'}), 500   
    

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


 # Login
 
@app.route("/login", methods=["POST"])
def login_user():
     email = request.json["email"]
     password = request.json["password"]

     user = Users.query.filter_by(email=email).first()

     if user is None:
         return jsonify({"error": "Unauthorized"}), 401

     if not bcrypt.check_password_hash(user.password, password):
         return jsonify({"error": "Unauthorized"}), 401

     session["user_id"] = user.user_Id
     session["user_Type"] = user.user_Type
     session["firstName"] = user.firstName


     return jsonify({'message': 'login sucessful!!', "id": user.user_Id, "Name": user.firstName, "user_Type": user.user_Type}), 200
 
  

 # Logout
@app.route("/logout", methods=["POST"])
def logout_user():
     session.pop("user_Id")
     return "200"

if __name__ == "__main__":
    app.run(debug=True)
