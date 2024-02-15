CREATE TABLE Courses (
    CRN INT PRIMARY KEY,
    course_name VARCHAR(255),
    course_description TEXT,
    credits INT
);

CREATE TABLE Login (
    user VARCHAR(255) PRIMARY KEY,
    pass VARCHAR(255)
);

-- Insert test data
INSERT INTO Courses (CRN, course_name, course_description, credits)
VALUES
    (12345, 'Introduction to Computer Science', 'An introductory course on computer science', 3),
    (23456, 'Database Management Systems', 'A course on managing relational databases', 4),
    (34567, 'Software Engineering', 'A course on software development methodologies', 3);

INSERT INTO Logins (user, pass)
VALUES 
    ('username', 'password');
