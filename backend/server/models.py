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
    group_Type = db.Column(db.String(100), default="General", nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    user_Type = db.Column(db.String(100), default="Alumno")
    password = db.Column(db.Text, nullable=False)
    User_courses = relationship('User_courses', backref='user_courses', cascade='all, save-update, delete') 
    # Roles = relationship('Roles', backref='roles', cascade='all, save-update, delete') 
    created_at = db.Column(db.DateTime(timezone=True),
                             server_default=func.now()) 
    


    
class Courses(db.Model):
    __tablename__ = "Courses"
    course_Id = db.Column(db.Integer, primary_key=True, index=True)
    course_Name = db.Column(db.String(100), nullable=False)
    department_Name = db.Column(db.String(100), nullable=False)
    course_Picture = db.Column(db.String(300), nullable=True)
    course_Description = db.Column(db.String(1500), default="Descripcion")
    User_courses = relationship('User_courses', backref='user_course', cascade='all, save-update, delete') 
    Documents = relationship('Documents', backref='document', cascade='all, save-update, delete') 
    Videos = relationship('Videos', backref='video', cascade='all, save-update, delete') 
  

class User_courses(db.Model):
    __tablename__ = "User_courses"
    user_course_Id = db.Column(db.Integer, primary_key=True, index=True)
    user_Id = db.Column(db.Integer, db.ForeignKey("Users.user_Id"), nullable=False)
    course_Id = db.Column(db.Integer, db.ForeignKey("Courses.course_Id"), nullable=False)   
    course_Name = db.Column(db.String(100), nullable=False)
    department_Name = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),
                             server_default=func.now())
    is_course_Completed = db.Column(db.Boolean, default=False)
    course_comp_Date = db.Column(db.DateTime(timezone=False),
                             server_default=func.now())  
    

class Documents(db.Model):
    __tablename__ = "Documents"
    document_Id = db.Column(db.Integer, primary_key=True, index=True)
    course_Id = db.Column(db.Integer, db.ForeignKey("Courses.course_Id"), nullable=False)
    document_Module =  db.Column(db.String(100), nullable=True)
    document_Name =  db.Column(db.String(100), nullable=False)
    document_Url =  db.Column(db.String(800), nullable=False)



class Videos(db.Model):
    __tablename__ = "Videos"
    video_Id = db.Column(db.Integer, primary_key=True, index=True)
    course_Id = db.Column(db.Integer, db.ForeignKey("Courses.course_Id"), nullable=False)
    video_Module =  db.Column(db.String(100), nullable=True)
    video_Name =  db.Column(db.String(100), nullable=False)
    video_Url =  db.Column(db.String(800), nullable=False)


class Survey(db.Model):
    __tablename__ = "Survey"
    survey_Id = db.Column(db.Integer, primary_key=True, index=True)
    user_Id = db.Column(db.Integer, db.ForeignKey("Users.user_Id"), nullable=False)
    course_Id = db.Column(db.Integer, db.ForeignKey("Courses.course_Id"), nullable=False)
    course_Name = db.Column(db.String(100), nullable=False)
    course_Rank =  db.Column(db.Integer, nullable=False)
    course_Comment =  db.Column(db.String(800), nullable=True)




    

