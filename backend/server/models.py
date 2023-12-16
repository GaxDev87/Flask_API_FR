from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from sqlalchemy.sql import func
from sqlalchemy.orm import sessionmaker, relationship 



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
    course_Name = db.Column(db.String(100), nullable=False)
    department_Name = db.Column(db.String(100), nullable=False)
    Enrollments = relationship('Enrollments', backref='course', cascade='all, delete') 
    Documents = relationship('Documents', backref='document', cascade='all, delete') 
    Videos = relationship('Videos', backref='video', cascade='all, delete') 
  

class Enrollments(db.Model):
    __tablename__ = "Enrollments"
    enrollment_Id = db.Column(db.Integer, primary_key=True, index=True)
    course_Id = db.Column(db.Integer, db.ForeignKey("Courses.course_Id"), nullable=False)
    course_Name = db.Column(db.String(100), nullable=False)
    firstName =  db.Column(db.String(100), nullable=False)
    lastName =  db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=False, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),
                             server_default=func.now())
    is_course_Completed = db.Column(db.Boolean, default=False)
    course_comp_Date = db.Column(db.DateTime(timezone=False),
                             server_default=func.now())  
    

class Documents(db.Model):
    __tablename__ = "Documents"
    document_Id = db.Column(db.Integer, primary_key=True, index=True)
    course_Id = db.Column(db.Integer, db.ForeignKey("Courses.course_Id"), nullable=False)
    document_Name =  db.Column(db.String(100), nullable=False)
    document_Url =  db.Column(db.String(800), nullable=False)



class Videos(db.Model):
    __tablename__ = "Videos"
    video_Id = db.Column(db.Integer, primary_key=True, index=True)
    course_Id = db.Column(db.Integer, db.ForeignKey("Courses.course_Id"), nullable=False)
    video_Name =  db.Column(db.String(100), nullable=False)
    video_Url =  db.Column(db.String(800), nullable=False)


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
