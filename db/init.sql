CREATE TABLE Courses (
    CRN INT PRIMARY KEY,
    course_name VARCHAR(255),
    course_description TEXT,
    credits INT
);

CREATE TABLE Users (
    userid INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);

-- TODO: still need outfitID FK to a rewards table
CREATE TABLE Pets (
    PetID INT PRIMARY KEY AUTO_INCREMENT,
    userid INT NOT NULL,
    pet_name VARCHAR(255) NOT NULL,
    love INT DEFAULT 0,
    recreation INT DEFAULT 0,
    FOREIGN KEY (userid) REFERENCES Users(userid)
);

CREATE TABLE PetInteractions (
    PetInteractionsID INT AUTO_INCREMENT PRIMARY KEY,
    PetID INT NOT NULL,
    userid INT NOT NULL,
    InteractionType ENUM('pet', 'play') NOT NULL,
    InteractionTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (PetID) REFERENCES Pets(PetID),
    FOREIGN KEY (userid) REFERENCES Users(userid)
);

CREATE TABLE Majors (
    majorid INT PRIMARY KEY AUTO_INCREMENT,
    majorName VARCHAR(255),
    majorDescription TEXT,
    careerProspects VARCHAR(255),
);

CREATE TABLE MajorInformation (
    majorid INT,
    majorName VARCHAR(255),
    topProfessors VARCHAR(255),
    studentQuotes TEXT,
    careers VARCHAR(255),
    minors VARCHAR(255),
    skills VARCHAR(255),
    interests VARCHAR(255),
    FOREIGN KEY (majorid) REFERENCES Majors(majorid)
);

-- Insert test data
INSERT INTO Courses (CRN, course_name, course_description, credits)
VALUES
    (12345, 'Introduction to Computer Science', 'An introductory course on computer science', 3),
    (23456, 'Database Management Systems', 'A course on managing relational databases', 4),
    (34567, 'Software Engineering', 'A course on software development methodologies', 3);

INSERT INTO Users (userid, username, email, password)
VALUES 
    (1, 'username', 'fake_email@gmail.com', 'password'),
    (2, 'john', 'john@gmail.com', 'password'),
    (3, 'jane', 'jane@yahoo.com', 'password');

INSERT INTO Pets (PetID, userid, pet_name, love, recreation)
VALUES
    (1, 3, 'O''malley', 50, 0),
    (2, 1, 'Charlie', 0, 0),
    (3, 2, 'Zoe', 100, 0);

INSERT INTO Majors (majorName, majorDescription, careerProspects)
VALUES
    ('Architectural Engineering', 'As an architectural engineering student at Oregon State, you will learn to design and construct buildings and other structures that are safe, sustainable, and aesthetically pleasing.', 'Architectural Engineer, Structural Engineer, Construction Manager'),
    ('Bioengineering', 'As a bioengineering student at Oregon State, you will learn to apply engineering principles to biological systems and develop new technologies to improve human health.', 'Biomedical Engineer, Medical Device Engineer, Research Scientist'),
    ('Chemical Engineering', 'As a chemical engineering student at Oregon State, you will learn to design and optimize processes for the production of chemicals, fuels, and materials.', 'Chemical Engineer, Process Engineer, Environmental Engineer'),
    ('Civil Engineering', 'As a civil engineering student at Oregon State, you will learn to design and maintain infrastructure that is essential to modern society, including roads, bridges, and water systems.', 'Civil Engineer, Structural Engineer, Transportation Engineer'),
    ('Computer Science', 'As a computer science student at Oregon State, you will learn to use algorithms to develop software and design solutions to real-world problems.', 'Software Engineer, Data Scientist, Web Developer'),
    ('Construction Engineering Management', 'As a construction engineering management student at Oregon State, ...', 'career 1, career 2, career 3'),
    ('Ecological Engineering', 'As an ecological engineering student at Oregon State, you will learn to design and manage ecosystems that are sustainable and resilient to environmental change.', 'Ecological Engineer, Environmental Consultant, Water Resources Engineer'),
    ('Electrical and Computer Engineering', 'As an electrical and computer engineering student at Oregon State, you will learn to design, build, and support new technologies while refining existing systems, processes, and products.', 'Electrical Engineer, Systems Engineer, Hardware Design Engineer'),
    ('Energy Systems Engineering', 'As an energy systems engineering student at Oregon State, you will learn to design and optimize energy systems that are sustainable, efficient, and resilient to environmental change.', 'Energy Engineer, Renewable Energy Engineer, Energy Analyst'),
    ('Engineering Science', 'As an engineering science student at Oregon State, you will learn to... ', 'career 1, career 2, career 3'),
    ('Environmental Engineering', 'As an environmental engineering student at Oregon State, you will learn to design and implement solutions to environmental problems, such as pollution, waste management, and water quality.', 'Environmental Engineer, Water Resources Engineer, Environmental Consultant'),
    ('Industrial Engineering', 'As an industrial engineering student at Oregon State, you will learn to optimize complex systems and processes to improve efficiency, productivity, and quality.', 'Industrial Engineer, Quality Engineer, Operations Research Analyst'),
    ('Manufacturing Engineering', 'As a manufacturing engineering student at Oregon State, you will learn to design and optimize manufacturing processes and systems to produce high-quality products.', 'Manufacturing Engineer, Process Engineer, Quality Engineer'),
    ('Mechanical Engineering', 'As a mechanical engineering student at Oregon State, you will learn to design and build machines and systems that are essential to modern society, from cars to power plants.', 'Mechanical Engineer, Aerospace Engineer, Robotics Engineer'),
    ('Nuclear Engineering', 'As a nuclear engineering student at Oregon State, you will learn to design and operate nuclear systems that are safe, efficient, and sustainable.', 'Nuclear Engineer, Radiation Protection Engineer, Nuclear Safety Engineer'),
    ('Outdoor Products', 'As an outdoor products student at Oregon State, you will learn to design and manufacture outdoor products that are innovative, sustainable, and functional.', 'Product Designer, Product Developer, Product Manager'),
    ('Radiation Health Physics', 'As a radiation health physics student at Oregon State, you will learn to...', 'career 1, career 2, career 3');

INSERT INTO MajorInformation (majorid, majorName, topProfessors, studentQuotes, careers, minors, skills, interests) 
VALUES 
    (1, 'Architectual Engineering', 'Professor 1, Professor 2', 'Quote 1, Quote 2, Quote 3', 'Career 1, Career 2', 'Minor 1, Minor 2', 'Skill 1, Skill 2', 'Interest 1, Interest 2'),
    (2, 'Bioengineering', 'Professor 1, Professor 2', 'Quote 1, Quote 2, Quote 3', 'Career 1, Career 2', 'Minor 1, Minor 2', 'Skill 1, Skill 2', 'Interest 1, Interest 2'),
    (3, 'Chemical Engineering', 'Professor 1, Professor 2', 'Quote 1, Quote 2, Quote 3', 'Career 1, Career 2', 'Minor 1, Minor 2', 'Skill 1, Skill 2', 'Interest 1, Interest 2'),
    (4, 'Civil Engineering', 'Professor 1, Professor 2', 'Quote 1, Quote 2, Quote 3', 'Career 1, Career 2', 'Minor 1, Minor 2', 'Skill 1, Skill 2', 'Interest 1, Interest 2'),
    (5, 'Computer Science', 'Professor 1, Professor 2', 'Quote 1, Quote 2, Quote 3', 'Career 1, Career 2', 'Minor 1, Minor 2', 'Skill 1, Skill 2', 'Interest 1, Interest 2'),
    (6, 'Construction Engineering Management', 'Professor 1, Professor 2', 'Quote 1, Quote 2, Quote 3', 'Career 1, Career 2', 'Minor 1, Minor 2', 'Skill 1, Skill 2', 'Interest 1, Interest 2'),
    (7, 'Ecological Engineering', 'Professor 1, Professor 2', 'Quote 1, Quote 2, Quote 3', 'Career 1, Career 2', 'Minor 1, Minor 2', 'Skill 1, Skill 2', 'Interest 1, Interest 2'),
    (8, 'Electrical and Computer Engineering', 'Professor 1, Professor 2', 'Quote 1, Quote 2, Quote 3', 'Career 1, Career 2', 'Minor 1, Minor 2', 'Skill 1, Skill 2', 'Interest 1, Interest 2'),
    (9, 'Energy Systems Engineering', 'Professor 1, Professor 2', 'Quote 1, Quote 2, Quote 3', 'Career 1, Career 2', 'Minor 1, Minor 2', 'Skill 1, Skill 2', 'Interest 1, Interest 2'),
    (10, 'Engineering Science', 'Professor 1, Professor 2', 'Quote 1, Quote 2, Quote 3', 'Career 1, Career 2', 'Minor 1, Minor 2', 'Skill 1, Skill 2', 'Interest 1, Interest 2'),
    (11, 'Environmental Engineering', 'Professor 1, Professor 2', 'Quote 1, Quote 2, Quote 3', 'Career 1, Career 2', 'Minor 1, Minor 2', 'Skill 1, Skill 2', 'Interest 1, Interest 2'),
    (12, 'Industrial Engineering', 'Professor 1, Professor 2', 'Quote 1, Quote 2, Quote 3', 'Career 1, Career 2', 'Minor 1, Minor 2', 'Skill 1, Skill 2', 'Interest 1, Interest 2'),
    (13, 'Manufacturing Engineering', 'Professor 1, Professor 2', 'Quote 1, Quote 2, Quote 3', 'Career 1, Career 2', 'Minor 1, Minor 2', 'Skill 1, Skill 2', 'Interest 1, Interest 2'),
    (14, 'Mechanical Engineering', 'Professor 1, Professor 2', 'Quote 1, Quote 2, Quote 3', 'Career 1, Career 2', 'Minor 1, Minor 2', 'Skill 1, Skill 2', 'Interest 1, Interest 2'),
    (15, 'Nuclear Engineering', 'Professor 1, Professor 2', 'Quote 1, Quote 2, Quote 3', 'Career 1, Career 2', 'Minor 1, Minor 2', 'Skill 1, Skill 2', 'Interest 1, Interest 2'),
    (16, 'Outdoor Products', 'Professor 1, Professor 2', 'Quote 1, Quote 2, Quote 3', 'Career 1, Career 2', 'Minor 1, Minor 2', 'Skill 1, Skill 2', 'Interest 1, Interest 2'),
    (17, 'Radiation Health Physics', 'Professor 1, Professor 2', 'Quote 1, Quote 2, Quote 3', 'Career 1, Career 2', 'Minor 1, Minor 2', 'Skill 1, Skill 2', 'Interest 1, Interest 2');