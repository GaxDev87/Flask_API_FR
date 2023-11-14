from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from sqlalchemy.sql import func


db = SQLAlchemy()

def get_uuid():
    return uuid4().hex



class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text, nullable=False)

class Student(db.Model):
    __tablename__ = "students"
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(100), nullable=False)
    lastname = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    age = db.Column(db.Integer)
    created_at = db.Column(db.DateTime(timezone=True),
                            server_default=func.now())
