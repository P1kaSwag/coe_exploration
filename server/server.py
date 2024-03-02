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
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # silence the deprecation warning and to save resources
 
 # Create the SQLAlchemy db instance
db = SQLAlchemy(app)


#TODO: Remove/Change the course stuff later
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


class Users(db.Model):
    __tablename__ = 'Users'
    userID = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
    username = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def set_password(self, password):
        self.password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))

    def to_dict(self):
        return {
            'userID': self.userID,
            'username': self.username,
            'email': self.email,
        }


class Majors(db.Model):
    __tablename__ = 'Majors'
    majorID = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
    majorName = db.Column(db.String(255), unique=True, nullable=False)
    majorDescription = db.Column(db.Text, nullable=False)
    careerProspects = db.Column(db.String(255), nullable=False)
    def to_dict(self):
        return {
            'majorID': self.majorID,
            'majorName': self.majorName,
            'majorDescription': self.majorDescription,
            'careerProspects': self.careerProspects
        }


class Pets(db.Model):
    __tablename__ = 'Pets'
    PetID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    userID = db.Column(db.Integer, db.ForeignKey('Users.userID'), nullable=False)
    pet_name = db.Column(db.String(255), nullable=False)
    love = db.Column(db.Integer, default=0)
    recreation = db.Column(db.Integer, default=0)


class PetInteractions(db.Model):
    __tablename__ = 'PetInteractions'
    PetInteractionsID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    PetID = db.Column(db.Integer, db.ForeignKey('Pets.PetID'), nullable=False)
    userID = db.Column(db.Integer, db.ForeignKey('Users.userID'), nullable=False)
    interactionType = db.Column(db.Enum('pet', 'play'), nullable=False)
    interactionTime = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())


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

@app.route('/api/users/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password') #FIXME: Hash the password then use that hash to compare to the hash in the database

    if not username or not email or not password:
        return jsonify({'message': 'All fields are required'})

    existing_user = Users.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({'message': 'Username already exists'})

    new_user = Users(username=username, email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'})

@app.route('/api/users/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required'})

    user = Users.query.filter_by(username=username).first()
    if user and user.check_password(password):
        return jsonify({'message': 'Login successful'})

    return jsonify({'message': 'Invalid username or password'})

@app.route('/api/majors', methods=['GET'])
def get_majors():
    majors = Majors.query.all()
    return jsonify([major.to_dict() for major in majors])


# Running app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)