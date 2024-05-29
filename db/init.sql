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

CREATE TABLE Majors (
    majorid INT PRIMARY KEY AUTO_INCREMENT,
    majorName VARCHAR(255),
    majorDescription TEXT,
    careerProspects VARCHAR(255)
);

CREATE TABLE Rewards (
    rewardID INT PRIMARY KEY AUTO_INCREMENT,
    majorID INT,
    rewardName VARCHAR(255),
    rewardDescription TEXT,
    rewardType ENUM('outfit', 'cosmetic', 'mechanic'),
    FOREIGN KEY (majorID) REFERENCES Majors(majorid)
);

CREATE TABLE Pets (
    petID INT PRIMARY KEY AUTO_INCREMENT,
    userid INT NOT NULL,
    outfitID INT DEFAULT NULL,
    pet_name VARCHAR(255) NOT NULL,
    mood ENUM('happy', 'sad', 'angry', 'neutral', 'excited', 'tired', 'curious') DEFAULT 'neutral',
    love INT DEFAULT 50,
    recreation INT DEFAULT 30,
    hunger INT DEFAULT 30,
    cleanliness INT DEFAULT 100,
    FOREIGN KEY (userid) REFERENCES Users(userid),
    FOREIGN KEY (outfitID) REFERENCES Rewards(rewardID)
);

CREATE TABLE PetInteractions (
    PetInteractionsID INT AUTO_INCREMENT PRIMARY KEY,
    petID INT NOT NULL,
    userid INT NOT NULL,
    InteractionType ENUM('pet', 'play', 'feed', 'wash') NOT NULL,
    InteractionTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (petID) REFERENCES Pets(petID),
    FOREIGN KEY (userid) REFERENCES Users(userid)
);

CREATE TABLE PetRewards (
    PetRewardID INT PRIMARY KEY AUTO_INCREMENT,
    petID INT,
    rewardID INT,
    isActive BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (petID) REFERENCES Pets(petID),
    FOREIGN KEY (rewardID) REFERENCES Rewards(rewardID),
    CONSTRAINT unique_reward UNIQUE (petID, rewardID)
);

CREATE TABLE MajorInformation (
    majorInfoID INT PRIMARY KEY AUTO_INCREMENT,
    majorid INT,
    topProfessor1 VARCHAR(255),
    topProfessor2 VARCHAR(255),
    topProfessor3 VARCHAR(255),
    studentQuote1 TEXT,
    studentQuote2 TEXT,
    careers VARCHAR(255),
    minors VARCHAR(255),
    skills VARCHAR(255),
    interests VARCHAR(255),
    FOREIGN KEY (majorid) REFERENCES Majors(majorid)
);

CREATE TABLE StudentQuotes (
    quoteID INT PRIMARY KEY AUTO_INCREMENT,
    majorid INT,
    quote TEXT,
    FOREIGN KEY (majorid) REFERENCES Majors(majorid)
);

CREATE TABLE Skills (
    skillID INT PRIMARY KEY AUTO_INCREMENT,
    majorid INT NOT NULL,
    skill VARCHAR(255) NOT NULL,
    FOREIGN KEY (majorid) REFERENCES Majors(majorid)
);


CREATE TABLE Interests (
    interestID INT PRIMARY KEY AUTO_INCREMENT,
    majorid INT NOT NULL,
    interest VARCHAR(255) NOT NULL,
    FOREIGN KEY (majorid) REFERENCES Majors(majorid)
);

CREATE TABLE TopProfessors (
    professorID INT PRIMARY KEY AUTO_INCREMENT,
    majorid INT,
    professorName VARCHAR(255),
    professorURL VARCHAR(255),
    FOREIGN KEY (majorid) REFERENCES Majors(majorid)
);

CREATE TABLE Words (
    id INT PRIMARY KEY AUTO_INCREMENT,
    major_id INT,
    word VARCHAR(255),
    FOREIGN KEY (major_id) REFERENCES Majors(majorid)
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
    ('Construction Engineering Management', 'As a construction engineering management student at Oregon State, you''ll bring building projects to life, from homes to commercial buildings, roads to bridges and more. You''ll be a versatile problem-solver, ensuring that projects are completed safely, on time, and within budget.', 'Construction Manager, Project Engineer, Field Engineer'),
    ('Ecological Engineering', 'As an ecological engineering student at Oregon State, you will learn to design and manage ecosystems that are sustainable and resilient to environmental change.', 'Ecological Engineer, Environmental Consultant, Water Resources Engineer'),
    ('Electrical and Computer Engineering', 'As an electrical and computer engineering student at Oregon State, you will learn to design, build, and support new technologies while refining existing systems, processes, and products.', 'Electrical Engineer, Systems Engineer, Hardware Design Engineer'),
    ('Energy Systems Engineering', 'As an energy systems engineering student at Oregon State, you will learn to design and optimize energy systems that are sustainable, efficient, and resilient to environmental change.', 'Energy Engineer, Renewable Energy Engineer, Energy Analyst'),
    ('Engineering Science', 'As an engineering science student at Oregon State, you will learn to get a strong foundation of engineering fundamentals. You can pick different courses from several different engineering disciplines.', 'Engineering Scientist, Research Scientist, Engineering Consultant'),
    ('Environmental Engineering', 'As an environmental engineering student at Oregon State, you will learn to design and implement solutions to environmental problems, such as pollution, waste management, and water quality.', 'Environmental Engineer, Water Resources Engineer, Environmental Consultant'),
    ('Industrial Engineering', 'As an industrial engineering student at Oregon State, you will learn to optimize complex systems and processes to improve efficiency, productivity, and quality.', 'Industrial Engineer, Quality Engineer, Operations Research Analyst'),
    ('Mechanical Engineering', 'As a mechanical engineering student at Oregon State, you will learn to design and build machines and systems that are essential to modern society, from cars to power plants.', 'Mechanical Engineer, Aerospace Engineer, Robotics Engineer'),
    ('Nuclear Engineering', 'As a nuclear engineering student at Oregon State, you will learn to design and operate nuclear systems that are safe, efficient, and sustainable.', 'Nuclear Engineer, Radiation Protection Engineer, Nuclear Safety Engineer'),
    ('Outdoor Products', 'As an outdoor products student at Oregon State, you will learn to design and manufacture outdoor products that are innovative, sustainable, and functional.', 'Product Designer, Product Developer, Product Manager'),
    ('Radiation Health Physics', 'As a radiation health physics student at Oregon State, you will learn to protect from potential dangers of exposure to radiation.', 'Physisist, Health Physicist, Radiation Safety Officer');

INSERT INTO MajorInformation (majorid, topProfessor1, topProfessor2, topProfessor3, studentQuote1, studentQuote2, careers, minors, skills, interests) 
VALUES 
    (1, 'Kenny Martin', 'Judy Liu', 'Chris Higgins', 'Quote 1', 'Quote 2', 'Drafter, Building Engineer, Architectural Designer', 'Minor 1, Minor 2', 'Creativity, open-mindedness, communication', 'Building design, structures, integrated design, physics, technical mindset'),
    (2, 'Professor 1', 'Professor 2', 'Professor3', 'Quote 1', 'Quote 2', 'Career 1, Career 2', 'Minor 1, Minor 2', 'Skill 1, Skill 2', 'Interest 1, Interest 2'),
    (3, 'Jeff Nason', 'Patrick Geoghegan', 'Adam Lambert', 'There is not as much chemistry in the actual chemical engineering portion of this major. For example, you need to understand the chemistry when designing processes and reactors, but overall, a lot of the actual chemistry will be done by chemists. Your job as a chemical engineer is to take that broad understanding to design systems that are used to produce desired results, such as obtaining a high yield of product or minimizing the size of the reactor needed to achieve a complete reaction.', "It is very hard, so be warned. Don't feel bad about taking it easy at times or taking a couple extra terms to graduate.",'Chemical Technician, Chemical Plant Operator, Analytic Chemist, Chemical Engineer', 'Chemistry, Computer Science, Nuclear Engineering', 'Basic Chemistry, Team Work, Communication, Time Management, Good Math Skills, Time Management, Technical Writing, Work Ethic ', 'Chemistry, Consumer Products, Petroleum, Plastics, Math, Problem Solving, Lab Work'),
    (4, 'David Trejo', 'Andre Barbosa', 'Kenny Martin', "Finish your math classes as early as possible but make sure you grasp all of the concepts because they sneak back up in unexpected ways. Year 3 is most likely your hardest year because that's when subjects get hyper-focused and due to the specific nature of the material there is little to no help from the youtube videos you've likely been using to help yourself grasp concepts. Communication with professors is extremely important, showing up to office hours shows that you care, even if you don't have too many questions.", "Be ready to work hard and use effective time management. As long as you stay on top of everything, you'll do fine", 'Surveyor, CAD Technician, Building Engineer', 'Minor 1, Minor 2', 'Communication, Problem Solving, Excel, Statics, Hydraulics, Curiosity, Collaboration, Deductive Reasoning ', 'Design work, Structural Knowledge, Interest in Building Materials, Construction'),
    (5, 'Rob Hess', 'Benjamin Brewster', 'Yipeng (Roger) Song', 'Computer science is definitely a field that has various opportunities for innovation and exploration. This field is for those who enjoy learning and discovering new perspectives in technology.', 'Try coding on your own to see how you like it before committing to it.', 'Software Engineer, Game Developer, Web Developer', 'Math, UX Research, Psychology, Business', 'Problem Solving, Patience, Willingness to Learn, Ability to adapt, Management (interpersonal and time), Communication, Team Work, Genuine Interest in Programming, Perseverance, Detail Oriented ', 'Game development, Artificial Intelligence, Mathematics, Computers, Creativity, Problem Solving, Continual Learning, Data and Statistics, Ability to Create Something, Coding'),
    (6, 'Joe Fradella', 'Tracy Arras', 'Catarina Pestana', 'Quote 1', 'Quote 2', 'Construction Management, Project Engineer, Field Engineer', 'Minor 1, Minor 2', 'Communication, Organization, Determination ', 'Working with People, Building Things'),
    (7, 'Desirée Tullos', 'John Bolte', 'Frank Chaplen', 'I would say that Ecological Engineering is certainly not the most universally applicable major, but it could be appropriate for someone with a strong interest in working on issues that impact the environment. It also feels like faculty in this major care about helping develop skills that may be used in the work force.', "If you're passionate about working with natural systems and using natural processes to sustainably engineer solutions to critical, global issues, this major is for you.", 'Water Treatment Plant Operator, Land Surveyor, Geotechnical Engineer', 'Comparative International Agriculture, Chemistry', 'Strong Math Skills, Basic Chemistry Knowledge, Human and Ecosystems Relationships, People Skills, Passion, Logical Reasoning, Communication, Problem Solving', 'Passion about the environment, math, curiosity about ecosystem and biome function, Natural sciences, environmental restoration, ecology, renewable energy, green development, urban agriculture/forestry'),
    (8, 'Professor 1', 'Professor 2', 'Professor 3', "Stay calm and focus because everything is gonna try to weigh you down like most majors. If you preserve and break through all those struggles then... trust me you'll have some insight into the future that you want to make for yourself. I'm sure of it. It will take time like as how a sapling grows into a grand fir tree.", 'Quote 2', 'Electrical Engineer, Electrical Designer, Systems Engineer', 'Computer Science, Education ', 'Math, Physics, Team work, Communication, Programming, Perseverance, Time management',  '3D Modeling, Circuits, Electrical Devices, Robotics, Creating Something with Electronics Knowledge'),
    (9, 'Professor 1', 'Professor 2', 'Professor 3', "This is not a study on the micro level of things, it is a study of energy in the macro scope. So keep that in mind. Also, you have to develop your engineering intuition starting year 1. Once you reach that state, and keep the hard work and dedication, you’re good to go!", 'Quote 2', 'Career 1, Career 2', 'Sustainability, Computer Science', 'Coding, Communication, Teamwork, Math, Science, Problem solving, Attention to Detail, Determination', 'Math, Sustainability, Clean Energy, A sense of wonder for how things are created, a desire to solve complex problems, Computers, construction, vehicles, and the science behind them '),
    (10, 'Professor 1', 'Professor 2', 'Professor 3', "If you don't know kind of specific engineering you'd like, if you want a mix of mechanical/electrical/computer science, or if you want to be marketable to companies that span multiple disciplines, then I'd highly recommend looking into the Engineering Science degree.", 'Quote 2', 'Career 1, Career 2', 'Outdoor Products, Art, Sustainability', 'Engineering, Problem solving, Collaboration, Communication, Work ethic, Unit Conversion, Math, Basic Programming skills, Time Management', 'Building, Creating, CAD Programs, Making things, 3D Modeling, Hands on work, Science'),
    (11, 'Professor 1', 'Professor 2', 'Professor 3', 'Quote 1', 'Quote 2', 'Career 1, Career 2', 'Minor 1, Minor 2', 'Skill 1, Skill 2', 'Interest 1, Interest 2'),
    (12, 'Professor 1', 'Professor 2', 'Professor 3', 'Quote 1', 'Quote 2', 'Career 1, Career 2', 'Minor 1, Minor 2', 'Communication, technical ,organizational, self discipline', 'Interest 1, Interest 2'),
    (13, 'Mark McGuire', 'Deborah Pence', 'Anthony Nix', 'Join a club, they will give you hands on experience and applicable scenarios for the skills and knowledge you may learn in classes. They also can lead to very beneficial networking relationships.', 'Quote 2', 'Mechanical Engineer, Aerospace Engineer', 'Aerospace', 'Problem solving, Organization, Communication, Math, Time management, Physics, Team skills', 'Math, Designing, Curiosity on how things work, Physics, Cars'),
    (14, 'Professor 1', 'Professor 2', 'Professor 3', 'Brush up on your calculus frequently and finish assignments as soon as you can, they always take longer than you think.', 'Quote 2', 'Nuclear Engineer, Reactor Engineer, Core Designer, Fuel Engineer', 'Minor 1, Minor 2', 'Communication, Data processing, Perseverance, Time management, Critical Thinking', 'Radioactivity, Physics, History, Warfare, Atomic/subatomic particles, Radiation, Math, How things work '),
    (15, 'Professor 1', 'Professor 2', 'Professor 3', 'Quote 1', 'Quote 2', 'Career 1, Career 2', 'Minor 1, Minor 2', 'Skill 1, Skill 2', 'Interest 1, Interest 2'),
    (16, 'Professor 1', 'Professor 2', 'Professor 3', 'Quote 1', 'Quote 2', 'Career 1, Career 2', 'Minor 1, Minor 2', 'Skill 1, Skill 2', 'Interest 1, Interest 2');

INSERT INTO TopProfessors (majorid, professorName, professorURL)
VALUES 
    (1, 'Kenny Martin', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/2023-01/profile-kenny-g-martin.jpg?itok=R7KVRZM6'),
    (1, 'Judy Liu', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/2022-12/profile-juddy-liu.jpg?itok=MW8nTVZ9'),
    (1, 'Chris Higgins', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/default_images/profile_preview.png?itok=5RN_oJyY'),
    (2, 'Professor 1', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/default_images/profile_preview.png?itok=5RN_oJyY'),
    (2, 'Professor 2', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/default_images/profile_preview.png?itok=5RN_oJyY'),
    (2, 'Professor 3', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/default_images/profile_preview.png?itok=5RN_oJyY'),
    (3, 'Jeff Nason', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/2022-12/profile-Jeffrey-Nason.jpg?itok=yNwEN0zx'),
    (3, 'Patrick Geoghegan', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/2022-12/profile-Patrick-Geoghegan.jpg?itok=5qOwOtJm'),
    (3, 'Adam Lambert', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/2022-10/profile-Adam-Lambert.jpg?itok=rvMsaDZq'),
    (4, 'David Trejo', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/2024-02/profile_David_Trejo.jpg?itok=2it5Ppvo'),
    (4, 'Andre Barbosa', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/2022-12/profile-andre-barbosa.jpg?itok=5RN_oJyY'),
    (4, 'Kenny Martin', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/2023-01/profile-kenny-g-martin.jpg?itok=R7KVRZM6'),
    (5, 'Rob Hess', 'https://web.engr.oregonstate.edu/~hessro/static/media/rob.8587b6b0e1fefd5dcca5.jpg'),
    (5, 'Benjamin', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/2022-12/profile-Brewster-Benjamin.jpg?itok=UeAtfHnk'),
    (5, 'Yipen (Rogger) Song', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/2023-04/profile-yipeng-song.jpg?itok=u0cLg8TD'),
    (6, 'Joe Fradella', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/2023-02/Profile-Joseph-Fradella.jpg?itok=msI8zFE3'),
    (6, 'Tracy Arras', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/2023-02/Profile-Tracy-Arras.jpg?itok=wVQ6erJx'),
    (6, 'Catarina Pestana', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/2023-02/profile-Catarina-Pestana.jpeg?itok=Lp_ZKqzz'),
    (7, 'Desirée Tullos', 'https://bee.oregonstate.edu/sites/agscid7/files/styles/osu_person_image/public/desireetullos2205.jpg?itok=-E3A4uIC'),
    (7, 'John Bolte', 'https://bee.oregonstate.edu/sites/agscid7/files/styles/osu_person_image/public/johnbolte2312.jpg?itok=UsbNSkrU'),
    (7, 'Frank Chaplen', 'https://agsci.oregonstate.edu/sites/agscid7/files/styles/osu_person_image/public/chaplen_frank.jpg?itok=XEvxtD7M'),
    (8, 'Professor 1', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/default_images/profile_preview.png?itok=5RN_oJyY'),
    (8, 'Professor 2', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/default_images/profile_preview.png?itok=5RN_oJyY'),
    (8, 'Professor 3', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/default_images/profile_preview.png?itok=5RN_oJyY'),
    (9, 'Professor 1', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/default_images/profile_preview.png?itok=5RN_oJyY'),
    (9, 'Professor 2', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/default_images/profile_preview.png?itok=5RN_oJyY'),
    (9, 'Professor 3', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/default_images/profile_preview.png?itok=5RN_oJyY'),
    (10, 'Professor 1', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/default_images/profile_preview.png?itok=5RN_oJyY'),
    (10, 'Professor 2', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/default_images/profile_preview.png?itok=5RN_oJyY'),
    (10, 'Professor 3', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/default_images/profile_preview.png?itok=5RN_oJyY'),
    (11, 'Professor 1', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/default_images/profile_preview.png?itok=5RN_oJyY'),
    (11, 'Professor 2', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/default_images/profile_preview.png?itok=5RN_oJyY'),
    (11, 'Professor 3', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/default_images/profile_preview.png?itok=5RN_oJyY'),
    (12, 'Professor 1', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/default_images/profile_preview.png?itok=5RN_oJyY'),
    (12, 'Professor 2', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/default_images/profile_preview.png?itok=5RN_oJyY'),
    (12, 'Professor 3', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/default_images/profile_preview.png?itok=5RN_oJyY'), 
    (13, 'Mark McGuire', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/2023-03/Mark2-Samantha-Shaver.png?itok=pHJeEzH7'),
    (13, 'Deborah Pence', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/2023-02/profile-Deb-Pence.jpg?itok=tRP7Twjh'),
    (13, 'Anthony Nix', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/default_images/profile_preview.png?itok=5RN_oJyY'),
    (14, 'Professor 1', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/default_images/profile_preview.png?itok=5RN_oJyY'),
    (14, 'Professor 2', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/default_images/profile_preview.png?itok=5RN_oJyY'),
    (14, 'Professor 3', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/default_images/profile_preview.png?itok=5RN_oJyY'),
    (15, 'Professor 1', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/default_images/profile_preview.png?itok=5RN_oJyY'),
    (15, 'Professor 2', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/default_images/profile_preview.png?itok=5RN_oJyY'),
    (15, 'Professor 3', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/default_images/profile_preview.png?itok=5RN_oJyY'),
    (16, 'Professor 1', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/default_images/profile_preview.png?itok=5RN_oJyY'),
    (16, 'Professor 2', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/default_images/profile_preview.png?itok=5RN_oJyY'),
    (16, 'Professor 3', 'https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/default_images/profile_preview.png?itok=5RN_oJyY');


INSERT INTO Words (major_id, word) VALUES
    -- Bioengineering
    (2, 'Bioinformatics'), (2, 'Prosthetics'), (2, 'Implants'), (2, 'Bioreactors'),
    (2, 'Cellular'), (2, 'Molecular'), (2, 'Biochemical'), (2, 'Nanotechnology'),
    -- Chemical Engineering
    (3, 'Chemical'), (3, 'Reactor'), (3, 'Thermodynamics'), (3, 'Kinetics'),
    (3, 'Polymer'), (3, 'Process'), (3, 'Separation'), (3, 'Catalyst'),
    -- Civil Engineering
    (4, 'Structures'), (4, 'Roads'), (4, 'Bridges'), (4, 'Hydraulics'),
    (4, 'Geotechnics'), (4, 'Construction'), (4, 'Urban'), (4, 'Environmental'),
    -- Construction Engineering Management
    (6, 'Project'), (6, 'Management'), (6, 'Cost'), (6, 'Schedule'),
    (6, 'Contract'), (6, 'Quality'), (6, 'Safety'), (6, 'Risk'),
    -- Ecological Engineering
    (7, 'Ecosystem'), (7, 'Biodiversity'), (7, 'Sustainability'), (7, 'Restoration'),
    (7, 'Climate'), (7, 'Conservation'), (7, 'Natural'), (7, 'Ecology'),
    -- Electrical and Computer Engineering
    (8, 'Circuits'), (8, 'Signals'), (8, 'Electronics'), (8, 'Control'),
    (8, 'Power'), (8, 'Digital'), (8, 'Embedded'), (8, 'Communications'),
    -- Energy Systems Engineering
    (9, 'Renewable'), (9, 'Solar'), (9, 'Wind'), (9, 'Biofuel'),
    (9, 'Grid'), (9, 'Storage'), (9, 'Efficiency'), (9, 'Sustainability'),
    -- Engineering Science
    (10, 'Interdisciplinary'), (10, 'Research'), (10, 'Analysis'), (10, 'Modeling'),
    (10, 'Simulation'), (10, 'Optimization'), (10, 'Theory'), (10, 'Experimentation'),
    -- Environmental Engineering
    (11, 'Pollution'), (11, 'Waste'), (11, 'Remediation'), (11, 'Air'),
    (11, 'Water'), (11, 'Environmental'), (11, 'Regulation'), (11, 'Health'),
    -- Industrial Engineering
    (12, 'Optimization'), (12, 'Productivity'), (12, 'Lean'), (12, 'Six'),
    (12, 'Supply'), (12, 'Logistics'), (12, 'Process'), (12, 'Quality'),
    -- Manufacturing Engineering
    -- Mechanical Engineering
    (13, 'Thermodynamics'), (13, 'Fluid'), (13, 'Heat transfer'), (13, 'Mechanics'),
    (13, 'Dynamics'), (13, 'Design'), (13, 'Materials'), (13, 'Robotics'),
    -- Nuclear Engineering
    (14, 'Nuclear'), (14, 'Reactors'), (14, 'Radiation'), (14, 'Safety'),
    (14, 'Security'), (14, 'Waste'), (14, 'Fusion'), (14, 'Fission'),
    -- Outdoor Products
    (15, 'Gear'), (15, 'Apparel'), (15, 'Equipment'), (15, 'Textiles'),
    (15, 'Materials'), (15, 'Design'), (15, 'Functionality'), (15, 'Sustainability'),
    -- Radiation Health Physics
    (16, 'Radiation'), (16, 'Health'), (16, 'Dosimetry'), (16, 'Protection'),
    (16, 'Radiobiology'), (16, 'Medical imaging'), (16, 'Nuclear medicine'), (16, 'Regulation');

INSERT INTO Rewards (majorID, rewardName, rewardDescription, rewardType)
VALUES
    (1, 'Dog House',  'A sturdy and stylish dog house, symbolizing the principles of design and construction that are key to Architectural Engineering.', 'cosmetic'),
    (2, 'Bioengineering', 'Ability to check pet''s stats and mood: Bioengineering principles applied to monitor and analyze your pet''s health and emotions.', 'mechanic'),
    (3, 'Chemical Engineering', 'Equip your pet with protective eye gear, representing the safety measures essential in Chemical Engineering laboratories.', 'outfit'),
    (4, 'Civil Engineering',  'A sturdy hard hat to keep your pet safe on all construction sites, symbolizing civil engineering safety standards.', 'outfit'),
    (5, 'Computer Science', 'A cutting-edge VR headset, representing the advancements in virtual reality technology driven by computer science.', 'outfit'),
    (6, 'Construction Engineering Management', 'A fun traffic cone hat, highlighting the role of construction management in ensuring site safety and organization.', 'outfit'),
    (7, 'Flower Bush', 'Beautiful flowers that emphasize the focus on environmental harmony in ecological engineering.', 'cosmetic'),
    (8, 'Lights', 'Illuminate the surroundings with lights and control the night setting, representing the innovative electrical solutions in Electrical and Computer Engineering.', 'cosmetic'),
    (9, 'Wind Turbines', 'Small wind turbines in the background, illustrating the sustainable energy solutions developed in energy systems engineering.', 'cosmetic'),
    (10, 'Bell', 'A bell for your pet. Ring it to bring them front and center', 'mechanic'),
    (11, 'Environmental Engineering', 'A paper bag mask for your pet, highlighting the efforts to address environmental issues and pollution in Environmental Engineering.', 'outfit'),
    (12, 'Industrial Engineering', 'Stylish nerdy glasses that symbolize the analytical and optimization skills crucial in industrial engineering.', 'outfit'),
    (13, 'Mechanical Engineering', 'Protective earmuffs to safeguard your pet from loud noises.', 'outfit'),
    (14, 'Nuclear Engineering', 'A superhero mask! Please do not expose yourself to large amounts of nuclear radiation', 'outfit'),
    (15, 'Frisbee', 'A fun and durable frisbee designed for outdoor play, showcasing the innovation in outdoor product engineering.', 'mechanic'),
    (16, 'Radiation Health Physics', 'Dress your pet in a lab coat, representing the research and safety practices in Radiation Health Physics.', 'outfit');



INSERT INTO Skills (majorid, skill)
VALUES
    (1, 'Creativity'),
    (1, 'open-mindedness'),
    (1, 'communication'),
    (1, 'Good analytical skills'),
    (1, 'physical intuition'),
    (1, 'an eye for aesthetics'),
    (2, 'problem-solving'),
    (2, 'communication'),
    (2, 'collaboration'),
    (3, 'Problem solving'),
    (3, 'critical thinking'),
    (3, 'communication'),
    (4, 'Understanding structural integrity'),
    (4, 'project management'),
    (4, 'communication'),
    (5, 'Understanding code'),
    (5, 'debugging'),
    (5, 'algorithmic thinking'),
    (5, 'Logic'),
    (5, 'Time management'),
    (5, 'Quick learning'),
    (5, 'Troubleshooting'),
    (5, 'Time management'),
    (5, 'organization'),
    (5, 'basic computer skills'),
    (5, 'Mathematics'),
    (5, 'logical reasoning'),
    (5, 'abstract thinking'),
    (5, 'computer literacy'),
    (5, 'mathematical understanding'),
    (5, 'linguistics'),
    (5, 'creative mindset'),
    (5, 'Problem solving'),
    (5, 'Practical thinking'),
    (5, 'communication'),
    (5, 'Statistics comprehension'),
    (5, 'higher level math skills'),
    (5, 'discrete mathematics'),
    (5, 'software skills'),
    (5, 'programming language skills'),
    (5, 'Resourcefulness'),
    (5, 'willingness to learn'),
    (6, 'project management'),
    (6, 'construction management'),
    (6, 'communication'),
    (6, 'teamwork'),
    (6, 'leadership'),
    (6, 'time management'),
    (7, 'Environmental awareness'),
    (7, 'sustainability'),
    (7, 'ecosystem understanding'),
    (8, 'circuit design'),
    (8, 'programming'),
    (8, 'troubleshooting'),
    (8, 'hardware knowledge'),
    (8, 'software knowledge'),
    (9, 'renewable energy systems'),
    (9, 'energy efficiency'),
    (9, 'sustainability'),
    (10, 'interdisciplinary knowledge'),
    (10, 'broad engineering skills'),
    (10, 'flexibility'),
    (11, 'environmental regulation knowledge'),
    (11, 'pollution control'),
    (11, 'sustainability'),
    (12, 'process optimization'),
    (12, 'efficiency improvement'),
    (12, 'quality control'),
    (13, 'mechanical design'),
    (13, 'thermodynamics'),
    (13, 'materials science'),
    (14, 'nuclear physics'),
    (14, 'radiation safety'),
    (14, 'reactor design'),
    (15, 'product design'),
    (15, 'manufacturing'),
    (15, 'sustainability'),
    (16, 'radiation protection'),
    (16, 'health physics'),
    (16, 'safety protocols'),
    (3, 'Diligence'),
    (3, 'patience'),
    (3, 'ability to understand concepts and learn'),
    (16, 'Diligence'),
    (16, 'patience'),
    (16, 'ability to understand concepts and learn');

INSERT INTO Interests (majorid, interest) 
VALUES
    (1, 'Architecture'),
    (1, 'Building design'),
    (1, 'Sustainability'),
    (2, 'Biotechnology'),
    (2, 'Healthcare'),
    (2, 'Medical research'),
    (3, 'Chemistry'),
    (3, 'Chemical processes'),
    (3, 'Sustainability'),
    (4, 'Construction'),
    (4, 'Building design'),
    (4, 'Infrastructure'),
    (5, 'Software development'),
    (5, 'Coding'),
    (5, 'Problem solving'),
    (5, 'Flexibility'),
    (5, 'Video games'),
    (5, 'Web development'),
    (5, 'Graphic design'),
    (5, 'Home-job or on-the-go opportunities'),
    (5, 'Math'),
    (5, 'Design'),
    (5, 'Apps I wanted to design to make things easier'),
    (5, 'Computers'),
    (5, 'Operating systems'),
    (5, 'Cryptography'),
    (5, 'I enjoy coding and write algorithms to solve problems'),
    (5, 'Love for technology'),
    (5, 'Self-sufficiency'),
    (5, 'Comfort with using the Internet'),
    (5, 'Very interested in computers'),
    (5, 'Creativity'),
    (5, 'Logic base'),
    (5, 'Job opportunities'),
    (5, 'Passion'),
    (5, 'Teamwork'),
    (6, 'Construction management'),
    (6, 'Project management'),
    (6, 'Leadership'),
    (7, 'Environmental sustainability'),
    (7, 'Ecosystem restoration'),
    (7, 'Water resources'),
    (8, 'Electronics'),
    (8, 'Robotics'),
    (8, 'Circuit design'),
    (9, 'Renewable energy'),
    (9, 'Energy efficiency'),
    (9, 'Sustainability'),
    (10, 'Interdisciplinary studies'),
    (10, 'Engineering fundamentals'),
    (10, 'Research'),
    (11, 'Environmental protection'),
    (11, 'Pollution control'),
    (11, 'Sustainability'),
    (12, 'Process improvement'),
    (12, 'Efficiency'),
    (12, 'Quality control'),
    (13, 'Mechanical systems'),
    (13, 'Robotics'),
    (13, 'Automotive'),
    (13, 'Aeronautics'),
    (13, 'Basically anything that moves'),
    (14, 'Math'),
    (14, 'Physics'),
    (14, 'Curiosity to understand how things work'),
    (14, 'Radioactivity'),
    (14, 'History'),
    (14, 'Warfare'),
    (14, 'Atomic/subatomic particles'),
    (14, 'Radiation'),
    (14, 'To know how things work'),
    (14, 'I really loved physics'),
    (14, 'Nuclear is very much concentrated in the real world still'),
    (15, 'Product design'),
    (15, 'Outdoor products'),
    (15, 'Sustainability'),
    (16, 'Radiation protection'),
    (16, 'Health physics'),
    (16, 'Nuclear safety'),
    (16, 'Interest in nuclear accidents/history'),
    (16, 'I wanted to learn about nuclear science'),
    (16, 'Specifically radiation due to the major nuclear accidents'),
    (16, 'Healthcare'),
    (16, 'Radiation'),
    (16, 'Interest in historic events'),
    (16, 'Interest in historic events');

INSERT INTO StudentQuotes (majorid, quote) 
VALUES
    (1, 'Creativity is key to success in this major'),
    (1, 'Make sure to have an open mind'),
    (1, 'Communication is essential'),
    (1, 'Good analytical skills, physical intuition and an eye for aesthetics are important'),
    (2, 'must be willing to accept that it is HARD'),
    (2, 'if you do not have the passion to work hard, think of something else'),
    (3, 'There is not as much chemistry in the actual chemical engineering portion of this major'),
    (3, 'For example, you need to understand the chemistry when designing processes and reactors'),
    (3, 'Overall, a lot of the actual chemistry will be done by chemists'),
    (3, 'Your job as a chemical engineer is to take that broad understanding to design systems that are used to produce desired results'),
    (3, 'such as obtaining a high yield of product or minimizing the size of the reactor needed to achieve a complete reaction'),
    (3, 'Chemical engineering is difficult but rewarding'),
    (3, 'It requires a lot of hard work and dedication, but the end result is worth it'),
    (4, 'Focus on understanding structural integrity and project management'),
    (4, 'Communication is also crucial'),
    (5, 'Understanding code, debugging, and algorithmic thinking are essential'),
    (5, 'Problem solving and creating programs'),
    (5, 'Time management is key to being successful in this major while attending an online program'),
    (5, 'Variety of projects and opportunities to add to my portfolio for applying to internships and full-time positions'),
    (5, 'Choose what you feel interested and passionate about'),
    (5, 'Satisfaction that comes with solving problems'),
    (5, 'Learning to make things'),
    (5, 'Take Software engineering online'),
    (5, 'The material is great, but the professors are terrible'),
    (5, 'Data structures is a hard course if you have a bad prof'),
    (5, 'There are some classes that you will be self-taught'),
    (5, 'YouTube is very useful for understanding concepts'),
    (6, 'The people I get to meet are wonderful'),
    (7, 'Environmental sustainability is a major focus'),
    (8, 'Interest in electronics and robotics'),
    (8, 'Circuit design is challenging but rewarding'),
    (9, 'Renewable energy and sustainability are key areas of study'),
    (10, 'Interdisciplinary studies provide a broad understanding of engineering fundamentals'),
    (11, 'Focus on environmental protection and pollution control'),
    (12, 'Process improvement and efficiency are critical skills'),
    (13, 'Mechanical systems and robotics are fascinating'),
    (13, 'Automotive and aeronautics are exciting fields'),
    (13, 'Basically anything that moves is interesting'),
    (14, 'Math and physics are essential'),
    (14, 'Curiosity to understand how things work'),
    (14, 'Radioactivity and radiation are key interests'),
    (14, 'Knowing how things work is very satisfying'),
    (14, 'I really love the small class sizes mixed with the difficult courses'),
    (14, 'It forces you to work with your class and get to know those around you if you really want to succeed'),
    (15, 'Product design and sustainability are core areas'),
    (16, 'Radiation protection and health physics are vital'),
    (16, 'Interest in nuclear accidents and history'),
    (16, 'Learning about applications of radiation biology/ecology'),
    (16, 'The nuclear science program here heavily focuses on reactor physics, for both engineers and RHP'),
    (16, 'It will be tough as RHP and NukE are different and it will feel like NukE people will be more successful, but its just the reactor physics focus'),
    (16, 'Learning about nuclear physics, radiation biology, and radioecology'),
    (16, 'It is a fairly niche major, so know that you want a specific career out of it');