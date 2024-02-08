from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import datetime
 
x = datetime.datetime.now()
 
# Initializing flask app
app = Flask(__name__)

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
 
     
# Running app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)