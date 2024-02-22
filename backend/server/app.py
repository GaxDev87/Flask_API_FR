from flask import Flask, request, json, jsonify, session, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from config import ApplicationConfig
from models import db, Users, User_courses, Courses, Documents, Videos, User_courses, Survey
import os
from sqlalchemy import distinct
from itsdangerous.url_safe import URLSafeTimedSerializer as Serializer

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

# ##********************USERS SEARCH*********************#
    
@app.route('/searchId/<int:id>', methods=['GET'])
def search_id(id):
   try:
    print(id)     
     
    if id:
        search_results_id= Users.query.filter_by(user_Id = id).all()

        return jsonify(        [ 
            {                   
                "user_Id": user.user_Id,
                "firstName":user.firstName,
                "lastName": user.lastName,
                "email": user.email,
                "user_Type": user.user_Type
            }            
            for user in search_results_id
        ]
    )
    search_results_id = []   
   except:
     return jsonify({'message': 'error getting search'}), 500
 

@app.route('/searchfirst/<string:query>', methods=['GET'])
def searchfirst(query):
   
  try:
    print(query)     
     
    if query:
        search_results= Users.query.filter(Users.firstName.icontains(query))                                 

        return jsonify(  
        [ 
            {   "user_Id": user.user_Id,              
                "firstName": user.firstName,
                "lastName": user.lastName,
                "group_Type": user.group_Type,                
                "email": user.email,
                "user_Type": user.user_Type,               
            }            
            for user in search_results
        ]
        
    )
    search_results = []   
  except:
     return jsonify({'message': 'error getting search'}), 500
  
@app.route('/searchlast/<string:query>', methods=['GET'])
def searchlast(query):
   
  try:
    print(query)     
     
    if query:
        search_results= Users.query.filter(Users.lastName.icontains(query))                                      

        return jsonify(  
        [ 
            {   "user_Id": user.user_Id,             
                "firstName": user.firstName,
                "lastName": user.lastName,
                "email": user.email,
                "user_Type":user.user_Type                
            }            
            for user in search_results
        ]
        
    )
    search_results = []   
  except:
     return jsonify({'message': 'error getting search'}), 500
  

@app.route('/searchemail/<string:query>', methods=['GET'])
def searchemail(query):
   
  try:
    print(query)     
     
    if query:
        search_results= Users.query.filter(Users.email.icontains(query))                                      

        return jsonify(  
        [ 
            {  "user_Id": user.user_Id,             
                "firstName": user.firstName,
                "lastName": user.lastName,
                "email": user.email,
                "user_Type":user.user_Type                
            }            
            for user in search_results
        ]
        
    )
    search_results = []   
  except:
     return jsonify({'message': 'error getting search'}), 500
  

  
@app.route('/searchusertype/<string:query>', methods=['GET'])
def searchusertype(query):
   
  try:
    print(query)     
     
    if query:
        search_results= Users.query.filter(Users.user_Type.icontains(query))                                      

        return jsonify(  
        [ 
            {  "user_Id": user.user_Id,             
                "firstName": user.firstName,
                "lastName": user.lastName,
                "email": user.email,
                "user_Type":user.user_Type                
            }            
            for user in search_results
        ]
        
    )
    search_results = []   
  except:
     return jsonify({'message': 'error getting search'}), 500
    
# ##********************USERS*********************#


# ##********************COURSES SEARCH*********************#
      
@app.route('/search_courseId/<int:id>', methods=['GET'])
def search_courseId(id):
   try:
    print(id)     
     
    if id:
        search_results_id= Courses.query.filter_by(course_Id = id).all()

        return jsonify(        [ 
            {                   
               
            "course_Id": course.course_Id,
            "course_Name": course.course_Name,
            "department_Name": course.department_Name,
            }            
            for course in search_results_id
        ]
    )
    search_results_id = []   
   except:
     return jsonify({'message': 'error getting search'}), 500

@app.route('/search_courseName/<string:query>', methods=['GET'])
def search_courseName(query):
   try:
    print(query)     
     
    if query:
        search_results= Courses.query.filter(Courses.course_Name.icontains(query))                                      

        return jsonify(        [ 
            {                   
               
            "course_Id": course.course_Id,
            "course_Name": course.course_Name,
            "department_Name": course.department_Name,
            }            
            for course in search_results
        ]
    )
    search_results = []   
   except:
     return jsonify({'message': 'error getting search'}), 500
   


@app.route('/search_courseThematic/<string:query>', methods=['GET'])
def search_courseThematic(query):
   
   try:
    print(query)     
     
    if query:
        search_results= Courses.query.filter(Courses.department_Name.icontains(query))                                      

        return jsonify(        [ 
            {                   
               
            "course_Id": course.course_Id,
            "course_Name": course.course_Name,
            "department_Name": course.department_Name,
            }            
            for course in search_results
        ]
    )
    search_results = []   
   except:
     return jsonify({'message': 'error getting search'}), 500


@app.route('/search_registeredCourseName/<string:query>', methods=['POST'])
def search_registerCourseName(query):
   
 try:

    userid = request.json["user_Id"]
    id_exists=User_courses.query.filter_by(user_Id=userid) 

    if not id_exists:   
        return jsonify({"error": "User not enrolled for any course"}), 401 
    

    print(query)   
        
    if query:
        search_results= User_courses.query.filter(User_courses.course_Name.icontains(query))

        return jsonify([ 
            {                   
            
            "course_Name": course.course_Name,
            "department_Name": course.department_Name,
            }   

            for course in search_results.filter_by(user_Id=userid)           
 
        ]
    )    

    search_results = []    

 except:
     return jsonify({'message': 'error getting search'}), 500

   

@app.route('/search_registeredcourseThematic/<string:query>', methods=['POST'])
def search_registeredcourseThematic(query):
   try:
    userid = request.json["user_Id"]
    id_exists=User_courses.query.filter_by(user_Id=userid)

    if not id_exists:   
        return jsonify({"error": "User not enrolled for any course"}), 401 
    

    print(query)      
     
    if query:
       search_results= User_courses.query.filter(User_courses.department_Name.icontains(query))                                        

       return jsonify([ 
            {                   
               
            "course_Name": course.course_Name,
            "department_Name": course.department_Name,
            }            
            for course in search_results.filter_by(user_Id=userid)  
        ]
    )
    search_results = []   
   except:
     return jsonify({'message': 'error getting search'}), 500

##

@app.route('/search_documentId/<int:id>', methods=['POST'])
def search_documentId(id):
   try:
    course_id = request.json["course_Id"]
    results_document_id=Documents.query.filter_by(document_Id=id)

    print(id)     
     
    if id and course_id:     


        return jsonify(        [ 
            {                   
            "document_Id": course.document_Id,
            "document_Name": course.document_Name,
             "document_Module": course.document_Module,           
             "document_Url": course.document_Url,
            
            }            
            for course in results_document_id.filter_by(course_Id=course_id) 
        ]
    )
    search_results = []   
   except:
     return jsonify({'message': 'error getting search'}), 500
 
   

@app.route('/search_documentName/<string:query>', methods=['POST'])
def search_documentName(query):
   try:
    course_id = request.json["course_Id"]
    search_results= Documents.query.filter(Documents.document_Name.icontains(query))                                      

    print(query)     
     
    if query and course_id:

        return jsonify(        [ 
            {                   
               
        
            "document_Id": course.document_Id,
            "document_Name": course.document_Name,
            "document_Module": course.document_Module,        
            "document_Url": course.document_Url,

            }            
            for course in search_results.filter_by(course_Id=course_id) 
        ]
    )
    search_results = []   
   except:
     return jsonify({'message': 'error getting search'}), 500
   
@app.route('/search_document_module/<string:id>', methods=['POST'])
def search_document_module(id):
   try:
    course_id = request.json["course_Id"]
    search_results= Documents.query.filter(Documents.document_Module.icontains(id))                                      

    print(id)     
     
    if id and course_id:

        return jsonify(        [ 
            {                   
               
        
            "document_Id": course.document_Id,
            "document_Name": course.document_Name,
            "document_Module": course.document_Module,            
            "document_Url": course.document_Url,

            }            
            for course in search_results.filter_by(course_Id=course_id) 
        ]
    )
    search_results = []   
   except:
     return jsonify({'message': 'error getting search'}), 500
   

@app.route('/search_videoId/<int:id>', methods=['POST'])
def search_videoId(id):
   try:
    course_id = request.json["course_Id"]
    results_video_id=Videos.query.filter_by(video_Id=id)

    print(id)     
     
    if id and course_id:     


        return jsonify(        [ 
            {                   
            "video_Id": course.video_Id,
            "video_Name": course.video_Name,
             "video_Module": course.video_Module,           
             "video_Url": course.video_Url,
            
            }            
            for course in results_video_id.filter_by(course_Id=course_id) 
        ]
    )
    search_results = []   
   except:
     return jsonify({'message': 'error getting search'}), 500

@app.route('/search_videoName/<string:query>', methods=['POST'])
def search_videoName(query):
   try:
    course_id = request.json["course_Id"]
    search_results= Videos.query.filter(Videos.video_Name.icontains(query))                                      

    print(query)     
     
    if query and course_id:

        return jsonify(        [ 
            {                   
               
        
            "video_Id": course.video_Id,
            "video_Name": course.video_Name,
             "video_Module": course.video_Module,           
             "video_Url": course.video_Url,

            }            
            for course in search_results.filter_by(course_Id=course_id) 
        ]
    )
    search_results = []   
   except:
     return jsonify({'message': 'error getting search'}), 500
   
@app.route('/search_video_module/<string:query>', methods=['POST'])
def search_video_module(query):
   try:
    course_id = request.json["course_Id"]
    search_results= Videos.query.filter(Videos.video_Module.icontains(query))                                      

    print(query)     
     
    if query and course_id:

        return jsonify(   [ 
            {                   
               
        
            "video_Id": course.video_Id,
            "video_Name": course.video_Name,
             "video_Module": course.video_Module,           
             "video_Url": course.video_Url,

            }            
            for course in search_results.filter_by(course_Id=course_id) 
        ]
    )
    search_results = []   
   except:
     return jsonify({'message': 'error getting search'}), 500
  
# ##********************COURSES SEARCH*********************#


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
    
@app.route("/forgotpassword", methods=["POST"])
def forgotpassword():    
   
    try:
       
        email = request.json["email"]

        email_exists = Users.query.filter_by(email=email).first() is not None
        if not email_exists:
            return jsonify({"error": "An error has ocurred"}), 409
        
        user = Users.query.filter_by(email=email).first()
        # print(user.user_Id)         
      
        s = Serializer(app.config['SECRET_KEY'])
        token = s.dumps({'user_id': user.user_Id})  
        # print(token)     
        
        return jsonify({'message': 'token created!',"token": token, "user":  user.user_Id})

    except:
        return jsonify({'error': 'error sending email'}), 500  


@app.route("/verify_reset_token", methods=["POST"])
def verify_reset_token():
        
        token = request.json["user_token"]
        user_id = request.json["user_Id"]


        s = Serializer(app.config['SECRET_KEY'])
        try:
            user_id = s.loads(token)['user_id']
        except:
            return None
        return Users.query.get(user_id)
        # s = Serializer(app.config['SECRET_KEY'])
        # try:
        #     user_id = s.loads(token)['user_Id']
        # except:
        #     return None
        # return Users.query.get(user_id)
     



    # def verify_reset_token(token):
    #     s = Serializer(app.config['SECRET_KEY'])
    #     try:
    #         user_id = s.loads(token)['user_id']
    #     except:
    #         return None
    #     return User.query.get(user_id)

        # hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
        # new_user = Users(firstName=firstName, lastName=lastName, email=email, password=hashed_password)
        # db.session.add(new_user)
        # db.session.commit()
        # session["user_Id"] = new_user.user_Id
        return jsonify({'message': 'email sent!'})
    # except:
    #     return jsonify({'error': 'error sending email'}), 500   
    


# # update a user account by id
@app.route("/update_user_account/<int:id>", methods=["PUT"])
def update_user_account(id):
 try:
    user = Users.query.filter_by(user_Id=id).first()
    if user:
        user.firstName = request.json["firstName"]
        user.lastName = request.json["lastName"]
        user.email = request.json["email"]
        db.session.commit()
             
        return jsonify({'message': 'User updated!',"id": user.user_Id, "firstName": user.firstName, "lastName": user.lastName,  "Email": user.email}), 200
 except:
        return jsonify({'message': 'error updating user'}), 500
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

        new_enrollment = User_courses( user_Id=user.user_Id, course_Id=course_Id, course_Name=course.course_Name, department_Name = course.department_Name )
        db.session.add(new_enrollment)
        db.session.commit()
        session["user_course_Id"] = new_enrollment.user_course_Id
        return jsonify({'message': 'Course registered!', "user id": new_enrollment.user_Id, "id": new_enrollment.user_course_Id, "Course Name": new_enrollment.course_Name, "department_Name": new_enrollment.department_Name})
    except:
        return jsonify({'error': 'Error creating course registration'}), 500    
    

# get all enrolled courses by user id
@app.route('/user_courses/<id>', methods=['GET'])
def get_user_courses(id):

  try:


    id_exists=User_courses.query.filter_by(user_Id=id).first()


    if not id_exists:
      return jsonify({"error": "User not enrolled for any course"}), 401   
  

    return jsonify(
    [
        {   "user_course_Id":user.user_course_Id,
            "user_Id": user.user_Id,              
            "course_Id": user.course_Id,
            "course_Name": user.course_Name,
            "department_Name": user.department_Name,
            
            
        }
        for user in User_courses.query.filter_by(user_Id=id)

    ]
)
  
  except:
      return jsonify({'message': 'error getting enrollments'}), 500

# get # of enrolled courses by user id
@app.route('/delete_usercourse/<id>', methods=['DELETE'])
def delete_usercourse(id):

   try:
     course = User_courses.query.filter_by(user_course_Id=id).first()
     if course:
       db.session.delete(course)
       db.session.commit()      
       return jsonify({'message': 'course deleted'}), 200
     return jsonify({'message': 'course not found'}), 404
   except:
     return jsonify({'message': 'error getting course'}), 500

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
@app.route("/get_users", methods=["GET"])
def get_users():
    return jsonify(
        [
            {
                "user_Id": user.user_Id,              
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
        course_Description = request.json["course_Description"]
        course_Picture = request.json["course_Picture"]

        #verifies if course name provided exists in course table         

        course_exists = Courses.query.filter_by(course_Name=course_Name).first() is not None

        if course_exists:
            return jsonify({"error": "A course with the name provided already exists"}), 409

        new_course = Courses(course_Name=course_Name, department_Name=department_Name,course_Description=course_Description,course_Picture=course_Picture)
        db.session.add(new_course)
        db.session.commit()
        session["course_Id"] = new_course.course_Id
        return jsonify({'message': 'course created!',"course_Id": new_course.course_Id, "Course_Name": new_course.course_Name, "Department": new_course.department_Name, "Description": new_course.course_Description, "course_Picture": new_course.course_Picture})
    except:
        return jsonify({'error': 'error creating user'}), 500   
    
# get thematic
@app.route('/get_thematic', methods=["GET"])
def get_thematic():    
    unique_courses =  Courses.query.distinct(Courses.department_Name)    
    return jsonify(        [ 
            {                   
                "department_Name": course.department_Name              
            }            
            for course in unique_courses
        ]
    )

# get course names
@app.route('/get_coursenames', methods=["GET"])
def get_coursenames():    
    return jsonify(
        [ 
            {   
                       
                "course_Name": course.course_Name               

              
            }
            for course in Courses.query.all()
        ]
    )

# get distinct thematic for registered courses
@app.route('/get_distinct_thematic/<id>', methods=["GET"])
def get_distinct_thematic(id):
 try:
   id_exists=User_courses.query.filter_by(user_Id=id).first()
   if not id_exists:   
      return jsonify({"error": "User not enrolled for any course"}), 401 
   return jsonify(        [ 
            {                   
                "department_Name": user.department_Name              
            }            

            for user in User_courses.query.filter_by(user_Id=id).distinct(User_courses.department_Name)
        ]

    )
 except:
      return jsonify({'message': 'error getting thematic'}), 500



# get all courses
@app.route('/get_courses', methods=["GET"])
def get_courses():
    
    return jsonify(
        [ 
            {   
                "course_Id": course.course_Id,              
                "course_Name": course.course_Name,
                "department_Name": course.department_Name,
                "course_Description": course.course_Description,
                "course_Picture": course.course_Picture                

              
            }
            for course in Courses.query.all()
        ]
    )

   
# # update a course by course id
@app.route("/update_course/<int:course_id>", methods=["PUT"])
def update_course(course_id):
    
    try:
        course = Courses.query.filter_by(course_Id=course_id).first()

        if course:
        #    course_exists = Courses.query.filter_by(course_Name=request.json["course_Name"]).first() is not None

        # if course_exists:
            #     return jsonify({"error": "A course with the name provided already exists"}), 409 
            course.course_Name = request.json["course_Name"]
            course.department_Name = request.json["department_Name"]
            course.course_Description = request.json["course_Description"]
            course.course_Picture = request.json["course_Picture"]


        db.session.commit()        

    

        return jsonify({'message': 'Course updated!',"id": course.course_Id, "Name": course.course_Name, "Department": course.department_Name}), 200
    except:
         return jsonify({'message': 'error updating course'}), 500
# # update a course by course id
@app.route("/update_user_course/<int:course_id>", methods=["PUT"])
def update_usercourse(course_id):
    
    try:
        user_course = User_courses.query.filter_by(course_Id=course_id)
            
        if user_course:

            for user_course in User_courses.query.filter_by(course_Id=course_id):
                user_course.course_Name = request.json["course_Name"]
                user_course.department_Name = request.json["department_Name"]
            db.session.commit()
    

        return jsonify({'message': 'Course updated!',"1": user_course.course_Name, "2": user_course.department_Name}), 200
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
   
 # create a resource document
@app.route("/document", methods=["POST"])
def create_document(): 

    try:   
        course_Id = request.json["course_Id"]   
        document_Name= request.json["document_Name"]
        document_Url = request.json["document_Url"]
        document_Module = request.json["document_Module"]

        

        #verifies if course name and course id correspond with a record in the table
        course = Courses.query.filter_by(course_Id=course_Id).first()
        if not course:
           return jsonify({"error": "Course name does not exist in database"}), 401
        
        # verifies if a document name and the same url already exist in Documents table
        document_exists = Documents.query.filter_by(document_Name=document_Name, document_Url=document_Url).first() is not None

        if document_exists:
            return jsonify({"error": "An url document associated to the document name already exists"}), 409

        new_document = Documents(course_Id=course_Id, document_Name=document_Name, document_Module = document_Module, document_Url=document_Url)
        db.session.add(new_document)
        db.session.commit()
        session["course_Id"] = new_document.document_Id
        return jsonify({'message': 'document created!',  "document_Id": new_document.document_Id,"document_Module": new_document.document_Module,"document_Name": new_document.document_Name, "document_Url": new_document.document_Url })
    except:
        return jsonify({'error': 'error creating document'}), 500  


# # update a document by document id
@app.route("/update_document/<int:id>", methods=["PUT"])
def update_document(id):

     if not id:
         return jsonify({"error": "document id not found"}), 401
    
     try:
         document = Documents.query.filter_by(document_Id=id).first()
       

         if document:
             document.document_Url = request.json["document_Url"]
             document.document_Name = request.json["document_Name"]
             document.document_Module = request.json["document_Module"]

             
           
             db.session.commit()
             return jsonify({'message': 'document updated!',"document_Id": document.document_Id, "Url": document.document_Url, "document_Module": document.document_Module}), 200
     except:
         return jsonify({'message': 'error updating document_Url'}), 500 
     
# get document by course id
@app.route('/course_document/<id>', methods=['GET'])
def course_document(id):

  try:
    id_document_exists=Documents.query.filter_by(course_Id=id).first()

    if not id_document_exists:
      return jsonify({"error": "No document found for the selected course"}), 401       

    return jsonify(
    [
        {
           
            "document_Id": document.document_Id,
            "document_Name": document.document_Name,
            "document_Module": document.document_Module,
            "document_Url": document.document_Url,
          
            
        }
        for document in Documents.query.filter_by(course_Id=id)

    ])  
  
  except:
      return jsonify({'message': 'error getting recourses'}), 500

# get documents by module
@app.route('/get_course_module_document/<id>', methods=['POST'])
def get_course_module_document(id):

  try:
    documentModule = request.json["document_Module"]
    document_Module=Documents.query.filter_by(course_Id=id)

    if not document_Module:
      return jsonify({"error": "No document found for the selected course"}), 401       

    return jsonify(
       [
    
        {
            "document_Name": document.document_Name,
            "document_Url": document.document_Url,    
            
        }
                for document in document_Module.filter_by(document_Module=documentModule)


        ])   

  except:
      return jsonify({'message': 'error getting recourses'}), 500
    
#delete a document
@app.route('/delete_document/<int:id>', methods=['DELETE'])
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
        video_Name= request.json["video_Name"]
        video_Url = request.json["video_Url"]
        video_Module = request.json["video_Module"]

        

        #verifies if course id correspond with a record in the table
        course = Courses.query.filter_by(course_Id=course_Id).first()
        if not course:
           return jsonify({"error": "Course id does not exist in database"}), 401
        
        # verifies if a video name and the same url already exist in Videos table
        video_exists = Videos.query.filter_by(video_Name=video_Name, video_Url=video_Url).first() is not None

        if video_exists:
            return jsonify({"error": "A video URL associated with course already exists"}), 409

        new_video = Videos(course_Id=course_Id, video_Name=video_Name, video_Module = video_Module, video_Url=video_Url)
        db.session.add(new_video)
        db.session.commit()
        session["course_Id"] = new_video.video_Id
        return jsonify({'message': 'video created!',  "video_Id": new_video.video_Id, "video_Name": new_video.video_Name,"video_Module": new_video.video_Module,"video_Url": new_video.video_Url })
    except:
        return jsonify({'error': 'error creating video'}), 500   
    

# # update a video by video id
@app.route("/update_video/<int:id>", methods=["PUT"])
def update_video(id):

     if not id:
         return jsonify({"error": "video id not found"}), 401
    
     try:
         video = Videos.query.filter_by(video_Id=id).first()
       

         if video:
             video.video_Name = request.json["video_Name"]
             video.video_Url = request.json["video_Url"]
             video.video_Module = request.json["video_Module"]

             
           
             db.session.commit()
             return jsonify({'message': 'video updated!',"video_Id": video.video_Id, "video_Name": video.video_Name, "video_Module": video.video_Module, "video_Url": video.video_Url}), 200
     except:
         return jsonify({'message': 'error updating video'}), 500 
     
      
  
  # get video by course id
@app.route('/course_video/<id>', methods=['GET'])
def course_video(id):

  try:
    id_video_exists=Videos.query.filter_by(course_Id=id).first()

    if not id_video_exists:
      return jsonify({"error": "No video found for the selected course"}), 401       

    return jsonify(
    [
        {
          
            "video_Id": video.video_Id,              
            "video_Name": video.video_Name,
            "video_Module": video.video_Module,
            "video_Url": video.video_Url,
            
        }
        for video in Videos.query.filter_by(course_Id=id)

    ])  
  
  except:
      return jsonify({'message': 'error getting recourses'}), 500


# get videos by module
@app.route('/get_course_module_video/<id>', methods=['POST'])
def get_course_module_video(id):

  try:
    videoModule = request.json["video_Module"]
    video_Module=Videos.query.filter_by(course_Id=id)

    if not video_Module:
      return jsonify({"error": "No video found for the selected course"}), 401       

    return jsonify(
       [
    
        {
              "video_Name": video.video_Name,
              "video_Url": video.video_Url,        
            
        }
                for video in video_Module.filter_by(video_Module=videoModule)


        ]

    )  
  
  except:
      return jsonify({'message': 'error getting recourses'}), 500
    
#delete a video
@app.route('/delete_video/<int:id>', methods=['DELETE'])
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
 
  # create a survey rank
@app.route("/course_survey_rank", methods=["POST"])
def course_survey_rank():    
   
    # try:     
        user_Id = request.json["user_Id"] 
        course_Id = request.json["course_Id"]
        course_Name = request.json["course_Name"]
        course_Rank = request.json["course_Rank"]
        course_Comment = request.json["course_Comment"]

        #verifies if course id provided exists in course table         

        user_and_course_exist = Survey.query.filter_by(course_Id=course_Id, user_Id=user_Id).first() 

        if  user_and_course_exist :
            return jsonify({"error": "Ya has enviado una valoración para este curso"}), 409

        new_course_rank = Survey(user_Id=user_Id, course_Id=course_Id, course_Name=course_Name,course_Rank=course_Rank,course_Comment=course_Comment)
        db.session.add(new_course_rank)
        db.session.commit()
        session["survey_Id"] = new_course_rank.survey_Id
        return jsonify({'message': 'course rank created!',"survey_Id": new_course_rank.survey_Id, "Course_Name": new_course_rank.course_Name, "course_Rank": new_course_rank.course_Rank, "course_Comment": new_course_rank.course_Comment})
    # except:
    #     return jsonify({'error': 'error creating course rank'}), 500   

 # Logout
@app.route("/logout", methods=["POST"])
def logout_user():
     session.pop("user_Id")
     return "200"

if __name__ == "__main__":
    app.run(debug=True)
