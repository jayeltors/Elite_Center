	-- Insert more student data to have a larger dataset
	INSERT INTO tna_responses (
	  timestamp_val, 
	  email, 
	  consent, 
	  campus, 	
	  surname, 
	  given_name, 
	  middle_name, 
	  gender, 
	  age_bracket,
	  department, 
	  lms_understanding
	) VALUES 
	('2024-04-15 17:01:17', 'student10@example.com', 'Yes', 'Antipolo', 'Johnson', 'Emily', 'J', 'FEMALE', '20 - 30', 'College of Nursing', 'Average'),
	('2024-04-15 17:02:17', 'student11@example.com', 'Yes', 'Valenzuela', 'Williams', 'Daniel', 'K', 'MALE', '20 - 30', 'College of Nursing', 'Beginner'),
	('2024-04-15 17:03:17', 'student12@example.com', 'Yes', 'Antipolo', 'Martinez', 'Sophia', 'L', 'FEMALE', '31 - 40', 'College of Nursing', 'Proficient'),
	('2024-04-15 17:04:17', 'student13@example.com', 'Yes', 'Quezon City', 'Anderson', 'Matthew', 'M', 'MALE', '20 - 30', 'College of Medical and Laboratory Science', 'Expert'),
	('2024-04-15 17:05:17', 'student14@example.com', 'Yes', 'Valenzuela', 'Thomas', 'Olivia', 'N', 'FEMALE', '31 - 40', 'College of Medical and Laboratory Science', 'Average'),
	('2024-04-15 17:06:17', 'student15@example.com', 'Yes', 'Antipolo', 'Jackson', 'Ethan', 'O', 'MALE', '41 - 50', 'College of Nursing', 'Proficient'),
	('2024-04-15 17:07:17', 'student16@example.com', 'Yes', 'Quezon City', 'White', 'Ava', 'P', 'FEMALE', '41 - 50', 'College of Medical and Laboratory Science', 'Expert'),
	('2024-04-15 17:08:17', 'student17@example.com', 'Yes', 'Antipolo', 'Harris', 'Noah', 'Q', 'MALE', '31 - 40', 'Administration', 'Average'),
	('2024-04-15 17:09:17', 'student18@example.com', 'Yes', 'Valenzuela', 'Martin', 'Isabella', 'R', 'FEMALE', '41 - 50', 'IT Department', 'Proficient'),
	('2024-04-15 17:10:17', 'student19@example.com', 'Yes', 'Quezon City', 'Thompson', 'William', 'S', 'MALE', '20 - 30', 'College of Nursing', 'Beginner'),
	('2024-04-15 17:11:17', 'student20@example.com', 'Yes', 'Antipolo', 'Garcia', 'Mia', 'T', 'FEMALE', '31 - 40', 'College of Medical and Laboratory Science', 'Average'),
	('2024-04-15 17:12:17', 'student21@example.com', 'Yes', 'Valenzuela', 'Martinez', 'James', 'U', 'MALE', '41 - 50', 'College of Nursing', 'Expert'),
	('2024-04-15 17:13:17', 'student22@example.com', 'Yes', 'Quezon City', 'Robinson', 'Charlotte', 'V', 'FEMALE', '20 - 30', 'IT Department', 'Proficient'),
	('2024-04-15 17:14:17', 'student23@example.com', 'Yes', 'Antipolo', 'Clark', 'Benjamin', 'W', 'MALE', '31 - 40', 'College of Medical and Laboratory Science', 'Beginner'),
	('2024-04-15 17:15:17', 'student24@example.com', 'Yes', 'Valenzuela', 'Rodriguez', 'Amelia', 'X', 'FEMALE', '41 - 50', 'College of Nursing', 'Average'),
	('2024-04-15 17:16:17', 'student25@example.com', 'Yes', 'Quezon City', 'Lewis', 'Henry', 'Y', 'MALE', '20 - 30', 'Administration', 'Expert'),
	('2024-04-15 17:17:17', 'student26@example.com', 'Yes', 'Antipolo', 'Lee', 'Evelyn', 'Z', 'FEMALE', '31 - 40', 'College of Medical and Laboratory Science', 'Proficient');

	-- Insert more teacher data
	INSERT INTO tna_responses (
	  timestamp_val, 
	  email, 
	  consent, 
	  campus, 
	  surname, 
	  given_name, 
	  middle_name, 
	  gender, 
	  age_bracket,
	  department, 
	  lms_understanding
	) VALUES 
	('2024-04-15 18:01:17', 'teacher3@example.com', 'Yes', 'Antipolo', 'Walker', 'Alexander', 'AA', 'MALE', '41 - 50', 'College of Nursing', 'Expert'),
	('2024-04-15 18:02:17', 'teacher4@example.com', 'Yes', 'Valenzuela', 'Hall', 'Victoria', 'BB', 'FEMALE', '31 - 40', 'College of Medical and Laboratory Science', 'Proficient'),
	('2024-04-15 18:03:17', 'teacher5@example.com', 'Yes', 'Quezon City', 'Allen', 'Joseph', 'CC', 'MALE', '41 - 50', 'IT Department', 'Average'),
	('2024-04-15 18:04:17', 'teacher6@example.com', 'Yes', 'Antipolo', 'Young', 'Elizabeth', 'DD', 'FEMALE', '31 - 40', 'College of Nursing', 'Beginner'),
	('2024-04-15 18:05:17', 'teacher7@example.com', 'Yes', 'Valenzuela', 'Hernandez', 'David', 'EE', 'MALE', '41 - 50', 'College of Medical and Laboratory Science', 'Expert');

	-- Insert more staff data
	INSERT INTO tna_responses (
	  timestamp_val, 
	  email, 
	  consent, 
	  campus, 
	  surname, 
	  given_name, 
	  middle_name, 
	  gender, 
	  age_bracket,
	  department, 
	  lms_understanding
	) VALUES 
	('2024-04-15 19:01:17', 'staff3@example.com', 'Yes', 'Antipolo', 'King', 'Sophia', 'FF', 'FEMALE', '31 - 40', 'Administration', 'Proficient'),
	('2024-04-15 19:02:17', 'staff4@example.com', 'Yes', 'Valenzuela', 'Wright', 'Michael', 'GG', 'MALE', '41 - 50', 'IT Department', 'Expert'),
	('2024-04-15 19:03:17', 'staff5@example.com', 'Yes', 'Quezon City', 'Lopez', 'Olivia', 'HH', 'FEMALE', '31 - 40', 'Administration', 'Average'),
	('2024-04-15 19:04:17', 'staff6@example.com', 'Yes', 'Antipolo', 'Hill', 'William', 'II', 'MALE', '41 - 50', 'IT Department', 'Beginner'),
	('2024-04-15 19:05:17', 'staff7@example.com', 'Yes', 'Valenzuela', 'Scott', 'Emma', 'JJ', 'FEMALE', '31 - 40', 'Administration', 'Proficient');

	-- Update roles for teachers and staff
	UPDATE tna_responses SET role = 'Teacher' WHERE email LIKE 'teacher%';
	UPDATE tna_responses SET role = 'Staff' WHERE email LIKE 'staff%';

	-- Add usage frequency data for all records
	UPDATE tna_responses SET 
	  usage_frequency = CASE id % 7
		WHEN 0 THEN 'None at all'
		WHEN 1 THEN 'Once a week'
		WHEN 2 THEN 'Twice a week'
		WHEN 3 THEN '3 times a week'
		WHEN 4 THEN '4 times a week'
		WHEN 5 THEN '5 times a week'
		WHEN 6 THEN 'Everyday'
	  END;

	-- Add years of experience data for all records
	UPDATE tna_responses SET 
	  years_experience = CASE id % 4
		WHEN 0 THEN 'Less than 1 year'
		WHEN 1 THEN 'more than 1 year to 3 years'
		WHEN 2 THEN 'More than 3 years'
		WHEN 3 THEN 'Less than 1 year'
	  END;

	-- Add device usage data for all records
	UPDATE tna_responses SET 
	  device_usage = CASE id % 4
		WHEN 0 THEN 'Laptop'
		WHEN 1 THEN 'Laptop, Smart Phone'
		WHEN 2 THEN 'Laptop, Desktop, Smart Phone'
		WHEN 3 THEN 'Laptop, Smart Phone, Tablet'
	  END;

	-- Verify the data
	SELECT COUNT(*) AS total_records FROM tna_responses;
	SELECT role, COUNT(*) AS count FROM tna_responses GROUP BY role;
	SELECT campus, COUNT(*) AS count FROM tna_responses GROUP BY campus ORDER BY count DESC;
	SELECT lms_understanding, COUNT(*) AS count FROM tna_responses GROUP BY lms_understanding;