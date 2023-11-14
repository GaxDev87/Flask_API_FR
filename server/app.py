from flask import Flask, request, json, jsonify, session, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from config import ApplicationConfig
from models import db, User, Student
import os

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World From Flask!'
app.config.from_object(ApplicationConfig)
app.config['SESSION_TYPE'] =  "redis"

bcrypt = Bcrypt(app)
server_session = Session(app)
CORS(app, supports_credentials=True)
db.init_app(app)


with app.app_context():
    db.create_all()

#Get current user
@app.route("/current")
def get_current_user():
    user_id = session.get("user_id")


    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id, 
        "email": user.email
        
    }) 

#Get current student

@app.route("/currentStudent")
def get_current_student():
    student_id = session.get("student_id")
 
    if not student_id:
        return jsonify({"error": "Unauthorized"}), 401
    student = Student.query.filter_by(id=student_id).first()
    return jsonify({
        "id": student.id,
        "email": student.email
       
    })

# get all users
@app.route('/users', methods=['GET'])
def get_users():  
  return jsonify([
        {
        "id": user.id,  
        "email": user.email,
      
        } for user in User.query.all()
     ])

#updating a user
@app.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    
     if not id:
        return jsonify({"error": "Unauthorized"}), 401
    
     user = User.query.filter_by(id=id).first()
     
     if user:
       user.email = request.json["email"]
       db.session.commit()
     return jsonify({"message": "user updated correctly"}), 200
    
#add a new student
@app.route("/registerstudent", methods=["POST"])
def register_student():
    firstname = request.json["firstname"]
    lastname =  request.json["lastname"]
    email = request.json["email"]
    age = request.json["age"]

    student_exists = Student.query.filter_by(email=email).first() is not None

    if student_exists:
        return jsonify({"error": "Student already exists"}), 409

    new_student= Student(firstname=firstname, lastname=lastname,email=email, age=age)
    db.session.add(new_student)
    db.session.commit()
    
    session["student_id"] = new_student.id

    return jsonify({
        "id": new_student.id,
        "firstname": new_student.firstname,
        "lastname": new_student.lastname,
        "email": new_student.email,
        "age": new_student.age,
    })

# get all students
@app.route('/students', methods=['GET'])
def get_students():
  
 return jsonify([
        {
        "id": student.id,
        "firstname": student.firstname,
        "lastname": student.lastname,
        "email": student.email,
        "age": student.age,
        } for student in Student.query.all()
     ])

@app.route("/register", methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })

@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
    
    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email
    })

@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"

if __name__ == "__main__":
    app.run(debug=True)