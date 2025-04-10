-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS elite_center;

-- Use the database
USE elite_center;

-- Drop the table if it exists to start fresh
DROP TABLE IF EXISTS tna_responses;

-- Create the tna_responses table
CREATE TABLE tna_responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  timestamp_val VARCHAR(255),
  email VARCHAR(255),
  consent VARCHAR(10),
  campus VARCHAR(100),
  surname VARCHAR(100),
  given_name VARCHAR(100),
  middle_name VARCHAR(100),
  gender VARCHAR(20),
  age_bracket VARCHAR(50),
  department VARCHAR(255),
  lms_understanding VARCHAR(100),
  usage_frequency VARCHAR(100),
  years_experience VARCHAR(100),
  device_usage TEXT,
  role VARCHAR(50) DEFAULT 'Student'
);

-- Check that table is created properly
SHOW COLUMNS FROM tna_responses;

-- Optional: Insert sample data here

-- Disable safe update mode temporarily
SET SQL_SAFE_UPDATES = 0;

-- Update roles for teachers
UPDATE tna_responses
SET role = 'Teacher'
WHERE email LIKE 'teacher%';

-- Update roles for staff
UPDATE tna_responses
SET role = 'Staff'
WHERE email LIKE 'staff%';

-- Show confirmation
SELECT id, email, role FROM tna_responses;

