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
    mood ENUM('happy', 'sad', 'angry', 'neutral', 'excited', 'tired', 'curious') DEFAULT 'neutral',
    love INT DEFAULT 50,
    recreation INT DEFAULT 30,
    hunger INT DEFAULT 30,
    cleanliness INT DEFAULT 100,
    FOREIGN KEY (userid) REFERENCES Users(userid)
);

CREATE TABLE PetInteractions (
    PetInteractionsID INT AUTO_INCREMENT PRIMARY KEY,
    PetID INT NOT NULL,
    userid INT NOT NULL,
    InteractionType ENUM('pet', 'play', 'feed', 'wash') NOT NULL,
    InteractionTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (PetID) REFERENCES Pets(PetID),
    FOREIGN KEY (userid) REFERENCES Users(userid)
);

CREATE TABLE Majors (
    majorid INT PRIMARY KEY AUTO_INCREMENT,
    majorName VARCHAR(255),
    majorDescription TEXT,
    careerProspects VARCHAR(255)
);

CREATE TABLE MajorInformation (
    majorInfoID INT PRIMARY KEY AUTO_INCREMENT,
    majorid INT,
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

INSERT INTO MajorInformation (majorid, topProfessors, studentQuotes, careers, minors, skills, interests) 
VALUES 
    (1, 'Kenny Martin, Judy Liu, Chris Higgins', 'Quote 1, Quote 2, Quote 3', 'Drafter, Building Engineer, Architectural Designer', 'Minor 1, Minor 2', 'Creativity, open-mindedness, communication', 'Building design, structures, integrated design, physics, technical mindset'),
    (2, 'Professor 1, Professor 2', 'Quote 1, Quote 2, Quote 3', 'Career 1, Career 2', 'Minor 1, Minor 2', 'Skill 1, Skill 2', 'Interest 1, Interest 2'),
    (3, 'Jeff Nason', 'There is not as much chemistry in the actual chemical engineering portion of this major. For example, you need to understand the chemistry when designing processes and reactors, but overall, a lot of the actual chemistry will be done by chemists. Your job as a chemical engineer is to take that broad understanding to design systems that are used to produce desired results, such as obtaining a high yield of product or minimizing the size of the reactor needed to achieve a complete reaction.', 'Chemical Technician, Chemical Plant Operator, Analytic Chemist, Chemical Engineer', 'Chemistry, Computer Science, Nuclear Engineering', 'Basic Chemistry, Team Work, Communication, Time Management, Good Math Skills, Time Management, Technical Writing, Work Ethic ', 'Chemistry, Consumer Products, Petroleum, Plastics, Math, Problem Solving, Lab Work'),
    (4, 'Professor 1, Professor 2', "Finish your math classes as early as possible but make sure you grasp all of the concepts because they sneak back up in unexpected ways. Year 3 is most likely your hardest year because that's when subjects get hyper-focused and due to the specific nature of the material there is little to no help from the youtube videos you've likely been using to help yourself grasp concepts. Communication with professors is extremely important, showing up to office hours shows that you care, even if you don't have too many questions.", 'Surveyor, CAD Technician, Building Engineer', 'Minor 1, Minor 2', 'Communication, Problem Solving, Excel, Statics, Hydraulics, Curiosity, Collaboration, Deductive Reasoning ', 'Design work, Structural Knowledge, Interest in Building Materials, Construction'),
    (5, 'Rob Hess, Benjamin Brewster, Yipeng (Roger) Song', 'Computer science is definitely a field that has various opportunities for innovation and exploration. This field is for those who enjoy learning and discovering new perspectives in technology.', 'Software Engineer, Game Developer, Web Developer', 'Math, UX Research, Psychology, Business', 'Problem Solving, Patience, Willingness to Learn, Ability to adapt, Management (interpersonal and time), Communication, Team Work, Genuine Interest in Programming, Perseverance, Detail Oriented ', 'Game development, Artificial Intelligence, Mathematics, Computers, Creativity, Problem Solving, Continual Learning, Data and Statistics, Ability to Create Something, Coding'),
    (6, 'Joe Fradella, Tracy Aras, Catarina Pestana', 'Quote 1, Quote 2, Quote 3', 'Construction Management, Project Engineer, Field Engineer', 'Minor 1, Minor 2', 'Communication, Organization, Determination ', 'Working with People, Building Things'),
    (7, 'Desirée Tullos, John Bolte, Frank Chaplen', 'I would say that Ecological Engineering is certainly not the most universally applicable major, but it could be appropriate for someone with a strong interest in working on issues that impact the environment. It also feels like faculty in this major care about helping develop skills that may be used in the work force.', 'Water Treatment Plant Operator, Land Surveyor, Geotechnical Engineer', 'Comparative International Agriculture, Chemistry', 'Strong Math Skills, Basic Chemistry Knowledge, Human and Ecosystems Relationships, People Skills, Passion, Logical Reasoning, Communication, Problem Solving', 'Passion about the environment, math, curiosity about ecosystem and biome function, Natural sciences, environmental restoration, ecology, renewable energy, green development, urban agriculture/forestry'),
    (8, 'Professor 1, Professor 2', "Stay calm and focus because everything is gonna try to weigh you down like most majors. If you preserve and break through all those struggles then... trust me you'll have some insight into the future that you want to make for yourself. I'm sure of it. It will take time like as how a sapling grows into a grand fir tree.", 'Electrical Engineer, Electrical Designer, Systems Engineer', 'Computer Science, Education ', 'Math, Physics, Team work, Communication, Programming, Perseverance, Time management',  '3D Modeling, Circuits, Electrical Devices, Robotics, Creating Something with Electronics Knowledge'),
    (9, 'Professor 1, Professor 2', "This is not a study on the micro level of things, it is a study of energy in the macro scope. So keep that in mind. Also, you have to develop your engineering intuition starting year 1. Once you reach that state, and keep the hard work and dedication, you’re good to go!", 'Career 1, Career 2', 'Sustainability, Computer Science', 'Coding, Communication, Teamwork, Math, Science, Problem solving, Attention to Detail, Determination', 'Math, Sustainability, Clean Energy, A sense of wonder for how things are created, a desire to solve complex problems, Computers, construction, vehicles, and the science behind them '),
    (10, 'Professor 1, Professor 2', "If you don't know kind of specific engineering you'd like, if you want a mix of mechanical/electrical/computer science, or if you want to be marketable to companies that span multiple disciplines, then I'd highly recommend looking into the Engineering Science degree.", 'Career 1, Career 2', 'Outdoor Products, Art, Sustainability', 'Engineering, Problem solving, Collaboration, Communication, Work ethic, Unit Conversion, Math, Basic Programming skills, Time Management', 'Building, Creating, CAD Programs, Making things, 3D Modeling, Hands on work, Science'),
    (11, 'Professor 1, Professor 2', 'Quote 1, Quote 2, Quote 3', 'Career 1, Career 2', 'Minor 1, Minor 2', 'Skill 1, Skill 2', 'Interest 1, Interest 2'),
    (12, 'Professor 1, Professor 2', 'Quote 1, Quote 2, Quote 3', 'Career 1, Career 2', 'Minor 1, Minor 2', 'Communication, technical ,organizational, self discipline', 'Interest 1, Interest 2'),
    (13, 'Professor 1, Professor 2', 'Quote 1, Quote 2, Quote 3', 'Career 1, Career 2', 'Minor 1, Minor 2', 'Skill 1, Skill 2', 'Interest 1, Interest 2'),
    (14, 'Mark McGuire, Deborah Pence, Anthony Nix', 'Join a club, they will give you hands on experience and applicable scenarios for the skills and knowledge you may learn in classes. They also can lead to very beneficial networking relationships.', 'Mechanical Engineer, Aerospace Engineer', 'Aerospace', 'Problem solving, Organization, Communication, Math, Time management, Physics, Team skills', 'Math, Designing, Curiosity on how things work, Physics, Cars'),
    (15, 'Professor 1, Professor 2', 'Brush up on your calculus frequently and finish assignments as soon as you can, they always take longer than you think.', 'Nuclear Engineer, Reactor Engineer, Core Designer, Fuel Engineer', 'Minor 1, Minor 2', 'Communication, Data processing, Perseverance, Time management, Critical Thinking', 'Radioactivity, Physics, History, Warfare, Atomic/subatomic particles, Radiation, Math, How things work '),
    (16, 'Professor 1, Professor 2', 'Quote 1, Quote 2, Quote 3', 'Career 1, Career 2', 'Minor 1, Minor 2', 'Skill 1, Skill 2', 'Interest 1, Interest 2'),
    (17, 'Professor 1, Professor 2', 'Quote 1, Quote 2, Quote 3', 'Career 1, Career 2', 'Minor 1, Minor 2', 'Skill 1, Skill 2', 'Interest 1, Interest 2');