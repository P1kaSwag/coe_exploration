CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE Pets (
    pet_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    love_stat INT DEFAULT 0,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE PetInteractions (
    pet_interaction_id INT AUTO_INCREMENT PRIMARY KEY,
    pet_id INT,
    user_id INT,
    interaction_time DATETIME NOT NULL,
    FOREIGN KEY (pet_id) REFERENCES Pets(pet_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Courses (
    CRN INT PRIMARY KEY,
    course_name VARCHAR(255),
    course_description TEXT,
    credits INT
);

-- Insert test data
INSERT INTO Courses (CRN, course_name, course_description, credits)
VALUES
    (12345, 'Introduction to Computer Science', 'An introductory course on computer science', 3),
    (23456, 'Database Management Systems', 'A course on managing relational databases', 4),
    (34567, 'Software Engineering', 'A course on software development methodologies', 3);

INSERT INTO Users (username, password, email)
VALUES
    ('testuser', 'test@test.com', 'plain-text-password'),  -- Example for testing only
    ('johndoe', 'john@test.com', 'example-password'),      -- Replace with hashed passwords in production
    ('janedoe', 'jane@test.com', 'another-password');

INSERT INTO Pets (name, love_stat, user_id)
VALUES
    ('O''malley', 100, 1),
    ('Charlie', 0, 2),
    ('Zoe', 50, 3);