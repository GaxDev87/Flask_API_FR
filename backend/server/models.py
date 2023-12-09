from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from sqlalchemy.sql import func


db = SQLAlchemy()

# def get_uuid():
#     return uuid4().hex

class Users(db.Model):
    __tablename__ = "Users"
    user_Id = db.Column(db.Integer, primary_key=True, index=True)
    firstName = db.Column(db.String(100), nullable=False)
    lastName = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    is_Admin = db.Column(db.Boolean, default=False)
    password = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),
                             server_default=func.now())
    
class Courses(db.Model):
    __tablename__ = "Courses"
    course_Id = db.Column(db.Integer, primary_key=True, index=True)
    user_Id = db.Column(db.Integer, db.ForeignKey("Users.user_Id"), nullable=False)
    course_Name = db.Column(db.String(100), nullable=False)
    is_course_Completed = db.Column(db.Boolean, default=False)
    course_comp_Date = db.Column(db.DateTime(timezone=False),
                             server_default=func.now())
    
    
class Roles(db.Model):
    __tablename__ = "Roles"
    role_Id = db.Column(db.Integer, primary_key=True, index=True)
    user_Id = db.Column(db.Integer, db.ForeignKey("Users.user_Id"), nullable=False)
    role_Type = db.Column(db.String(50), nullable=False)
 
class Permissions(db.Model):
    __tablename__ = "Permissions"
    permission_Id = db.Column(db.Integer, primary_key=True, index=True)
    role_Id = db.Column(db.Integer, db.ForeignKey("Roles.role_Id"), nullable=False)
    description = db.Column(db.String(50), nullable=False)
    value = db.Column(db.Integer, nullable=False)


    


# class Student(db.Model):
#     __tablename__ = "students"
#     user_id = db.Column(db.Integer, primary_key=True)
#     firstname = db.Column(db.String(100), nullable=False)
#     lastname = db.Column(db.String(100), nullable=False)
#     email = db.Column(db.String(80), unique=True, nullable=False)
#     age = db.Column(db.Integer)
#     created_at = db.Column(db.DateTime(timezone=True),
#                             server_default=func.now())
