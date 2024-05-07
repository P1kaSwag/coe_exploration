from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_apscheduler import APScheduler
from datetime import datetime
import bcrypt
  
# Initializing flask app
app = Flask(__name__)
CORS(app)
jwt = JWTManager(app)

# Set up the APScheduler to run in the background
scheduler = APScheduler()
scheduler.init_app(app)
scheduler.start()

# Configure the app for the database connection
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:bowleg.historic.TORI@database:3306/exploration'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # silence the deprecation warning and to save resources
app.config['SECRET_KEY'] = 'super_secret_key'  # TODO: Shouldn't be hardcoded in the final version so move to an environment variable
 
 # Create the SQLAlchemy db instance
db = SQLAlchemy(app)

# Define the maximum number of interactions per day for each type
MAX_INTERACTIONS_PER_DAY = {'pet': 100, 'play': 50, 'feed': 30, 'wash': 10} # TODO: Change these values to lower numbers later

# TODO: Remove/Change the course stuff later
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


class MajorInformation(db.Model):
    __tablename__ = 'MajorInformation'
    majorInfoID = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True, nullable=False)
    majorID = db.Column(db.Integer, db.ForeignKey('Majors.majorID'), nullable=False)
    #majorName = db.Column(db.String(255), nullable=False)
    topProfessor1 = db.Column(db.String(255), nullable=False)
    topProfessor2 = db.Column(db.String(255), nullable=False)
    topProfessor3 = db.Column(db.String(255), nullable=False)
    studentQuote1 = db.Column(db.Text, nullable=False)
    studentQuote2 = db.Column(db.Text, nullable=False)
    careers = db.Column(db.String(255), nullable=False)
    minors = db.Column(db.String(255), nullable=False)
    skills = db.Column(db.String(255), nullable=False)
    interests = db.Column(db.String(255), nullable=False)
    def to_dict(self):
         return {
            'majorID': self.majorID,
            #'majorName': self.majorName,
            'topProfessor1': self.topProfessor1,
            'topProfessor2': self.topProfessor2,
            'topProfessor3': self.topProfessor3,
            'studentQuote1': self.studentQuote1,
            'studentQuote2': self.studentQuote2,
            'careers': self.careers,
            'minors': self.minors,
            'skills': self.skills,
            'interests': self.interests
       }
    
class Pets(db.Model):
    __tablename__ = 'Pets'
    PetID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    userID = db.Column(db.Integer, db.ForeignKey('Users.userID'), nullable=False)
    pet_name = db.Column(db.String(255), nullable=False)
    mood = db.Column(db.Enum('happy', 'sad', 'angry', 'neutral', 'excited', 'tired', 'curious'), default='neutral', nullable=False)
    love = db.Column(db.Integer, default=50)
    recreation = db.Column(db.Integer, default=30)
    hunger = db.Column(db.Integer, default=30)
    cleanliness = db.Column(db.Integer, default=100)

    def to_dict(self):
        return {
            'pet_name': self.pet_name,
            'mood': self.mood,
            'love': self.love,
            'recreation': self.recreation,
            'hunger': self.hunger,
            'cleanliness': self.cleanliness
        }


class PetInteractions(db.Model):
    __tablename__ = 'PetInteractions'
    PetInteractionsID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    PetID = db.Column(db.Integer, db.ForeignKey('Pets.PetID'), nullable=False)
    userID = db.Column(db.Integer, db.ForeignKey('Users.userID'), nullable=False)
    interactionType = db.Column(db.Enum('pet', 'play', 'feed', 'wash'), nullable=False)
    interactionTime = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())

class Words(db.Model):
    __tablename__ = 'Words'
    id = db.Column(db.Integer, primary_key=True)
    major_id = db.Column(db.Integer, db.ForeignKey('Majors.majorid'), nullable=False)
    word = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f"<Words(id={self.id}, major_id={self.major_id}, word='{self.word}')>"

    def to_dict(self):
        return {
            'id': self.id,
            'major_id': self.major_id,
            'word': self.word
        }


# Create a route to query Courses and return the data (navigate to localhost:8000/courses)
@app.route('/courses', methods=['GET'])
def get_courses():
    courses = Course.query.all()
    return jsonify([course.to_dict() for course in courses])
 
 
@app.route('/api/pet/interact', methods=['POST'])
@jwt_required() # This will require a valid access token to be present in the request to access this route
def interact_with_pet():
    current_user_id = get_jwt_identity()
    data = request.json
    interaction_type = data.get('interactionType')
    
    # Get the pet of the current user
    pet = Pets.query.filter_by(userID=current_user_id).first()
    if not pet:
        return jsonify({'message': 'Pet not found'}), 404
    
    # Check to make sure number of interactions per day is not exceeded for the interaction type
    today = datetime.now().date()
    interaction_count = PetInteractions.query.filter(PetInteractions.PetID == pet.PetID, PetInteractions.interactionType == interaction_type, db.func.date(PetInteractions.interactionTime) == today).count()
    print(f"There's been {interaction_count + 1} {interaction_type} interactions on {today} so far")

    if interaction_count >= MAX_INTERACTIONS_PER_DAY[interaction_type]:
        return jsonify({'message': 'Maximum daily interactions exceeded'}), 429

    # Execute the interaction
    # TODO: Add some logic to update the pet's mood based on the interactions
    match interaction_type:
        case 'pet':
            pet.love = min(pet.love + 1, 100)   # Clamp the values between 0 and 100
        case 'play':
            pet.recreation = min(pet.recreation + 10, 100)
            pet.love = min(pet.love + 15, 100)
            pet.cleanliness = max(pet.cleanliness - 10, 100)
        case 'feed':
            pet.hunger = max(pet.hunger - 1, 0)
            pet.cleanliness = max(pet.cleanliness - 5, 100)
        case 'wash':
            pet.cleanliness = min(pet.cleanliness + 70, 100)
        case _: # Check if the interaction type is valid
            return jsonify({'message': 'Invalid interaction type'}), 404
    
    # Update the pet's mood based on the new stats
    pet.mood = update_pet_mood(pet)
    
    # Create a new interaction record
    new_interaction = PetInteractions(PetID=pet.PetID, userID=current_user_id, interactionType=interaction_type)
    
    # Save the changes to the database (don't need to add the pet to the session since it's already there)
    db.session.add(new_interaction)
    db.session.commit()

    return jsonify({'message': f'Successfully recorded {interaction_type} interaction with pet', 'pet': pet.to_dict()}), 200


def update_pet_mood(pet: Pets):
    """Updates the mood of the pet based on its stats and events (last exploration time, etc.)."""
    if pet.love > 80 and pet.recreation > 80 and pet.hunger < 20 and pet.cleanliness > 80:
        return 'happy'
    if pet.love < 20 and pet.recreation < 20 and pet.hunger > 80 and pet.cleanliness < 20: # TODO: Could also add a condition for if the pet hasn't been interacted with in a while
        return 'sad'
    # TODO: Need conditions for angry, excited, tired, and curious moods

    # Some ideas:
    # Angry mood is triggered when a user hasn't interacted with their pet in a while and their pet's stats are low
    # Excited is triggered when a user unlocks a reward from a major
    # Tired mood is triggered when a user has explored a major a lot in a short period of time and their pet's stats are low
    # Curious mood is triggered when a user hasn't explored a major in a while and they haven't already explored all the majors
    # Frustated mood is triggered when a user has tried to interact with their pet too many times in a day or they fail to complete a minigame

    # If none of the above conditions are met, return neutral mood
    return 'neutral'


@app.route('/api/pet/stats', methods=['GET'])
@jwt_required()
def get_pet_stats():
    """Get the stats of the current user's pet."""
    current_user_id = get_jwt_identity()
    pet = Pets.query.filter_by(userID=current_user_id).first()

    if not pet:
        return jsonify({'message': 'Pet not found'}), 404
    
    pet_stats = pet.to_dict()
    print(pet_stats)
    
    return jsonify({'message': 'Pet stats retrieved successfully', 'petStats': pet_stats}), 200


def degrade_pet_stats():
    """Periodically degrades the stats of all pets in the database."""
    with app.app_context(): # Need to create a new app context to access the database outside of a request from the frontend
        pets = Pets.query.all()
        for pet in pets:
            print(pet.to_dict())
            pet.love = max(pet.love - 1, 0)
            pet.recreation = max(pet.recreation - 1, 0)
            pet.hunger = min(pet.hunger + 1, 100)
            pet.cleanliness = max(pet.cleanliness - 1, 0)
            print(pet.to_dict())

        db.session.commit()


@app.route('/api/users/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

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
        return jsonify({'message': 'Username and password are required'})   # TODO: Change this to or add a 400 status code

    user = Users.query.filter_by(username=username).first()
    if user and user.check_password(password):
        # Create a new access token for the user
        access_token = create_access_token(identity=user.userID)

        # Check if the user has a pet, if not, create one
        pet = Pets.query.filter_by(userID=user.userID).first()
        if not pet:
            new_pet = Pets(userID=user.userID, pet_name='O\'Malley')    # Default pet name, can be changed later
            db.session.add(new_pet)
            db.session.commit()

        return jsonify({'message': 'Login successful', 'access_token': access_token, 'user': user.to_dict()})   # TODO: Change this to or add a 200 status code

    return jsonify({'message': 'Invalid username or password'}) # TODO: Change this to or add a 401 status code


@app.route('/api/majors', methods=['GET'])
def get_majors():
    majors = Majors.query.all()
    return jsonify([major.to_dict() for major in majors])


@app.route('/api/majors/majorinformation/<int:majorID>', methods=['GET'])
def get_majorInfo(majorID):
    majorInfo = MajorInformation.query.filter_by(majorID=majorID).first()

    if not majorInfo:
        return jsonify({'message': 'Major not found'}), 404
    
    majorInfo = majorInfo.to_dict()

    return jsonify({'message': 'Major information received successfully', 'majorInfo': majorInfo}), 200

@app.route('/api/majors/<int:major_id>/words', methods=['GET'])
def get_major_words(major_id):
    # Query the words associated with the specified major_id
    words = Words.query.filter_by(major_id=major_id).all()
    word_dicts = [word.to_dict() for word in words]
    return jsonify(word_dicts)

# Degrade the pet's stats every hour
scheduler.add_job(id='degrade_pet_stats', func=degrade_pet_stats, trigger='interval', hours=1)

# Running app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)