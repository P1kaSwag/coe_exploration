from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import bcrypt
import datetime
 
x = datetime.datetime.now()
 
# Initializing flask app
app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:bowleg.historic.TORI@database:3306/exploration'
 
 # Create the SQLAlchemy db instance
db = SQLAlchemy(app)

# All this course stuff was just to test out the database connection to the server
# so anybody can change/repurpose it if they want
class Course(db.Model):
    __tablename__ = 'Courses'
    CRN = db.Column(db.Integer, primary_key=True)
    course_name = db.Column(db.String(255), nullable=False)
    course_description = db.Column(db.Text, nullable=False)
    credits = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'CRN': self.CRN,
            'course_name': self.course_name,
            'course_description': self.course_description,
            'credits': self.credits
        }
    
class Logins(db.Model):
    __tablename__ = 'Logins'
    username = db.Column(db.String(255), primary_key=True, unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    def to_dict(self):
        return {
            'username': self.username,
            'password': self.password
        }

# Create a route to query Courses and return the data (navigate to localhost:8000/courses)
@app.route('/courses', methods=['GET'])
def get_courses():
    courses = Course.query.all()
    return jsonify([course.to_dict() for course in courses])
 
# Route for seeing a data
@app.route('/api/data')
def get_time():
 
    # Returning an api for showing in  reactjs
    return {
        'Name':"Gizmo", 
        "Age":"1 minute",
        "Date":x, 
        }

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required'})

    existing_user = Logins.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({'message': 'Username already exists'})

    new_user = Logins(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required'})

    user = Logins.query.filter_by(username=username).first()
    if user and user.password == password:
        return jsonify({'message': 'Login successful'})

    return jsonify({'message': 'Invalid username or password'})

# Running app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)