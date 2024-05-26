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
