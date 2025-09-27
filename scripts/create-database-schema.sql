-- Database schema for Richards IT Consultancy student management system
-- Run this script to create the necessary tables

-- Students table
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    parish VARCHAR(50),
    course VARCHAR(200) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'expelled')),
    start_date DATE,
    end_date DATE,
    weeks_total INTEGER DEFAULT 0,
    weeks_completed INTEGER DEFAULT 0,
    days_attended INTEGER DEFAULT 0,
    total_days INTEGER DEFAULT 0,
    payment_status VARCHAR(20) DEFAULT 'unpaid' CHECK (payment_status IN ('paid', 'partial', 'unpaid')),
    notes TEXT,
    is_temp BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Applications table
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    age INTEGER,
    parish VARCHAR(50),
    course VARCHAR(200) NOT NULL,
    schedule VARCHAR(100),
    education VARCHAR(100),
    experience VARCHAR(100),
    employment VARCHAR(100),
    goals TEXT,
    challenges TEXT,
    payment VARCHAR(100),
    student_discount BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    rejection_reason TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP
);

-- Courses table
CREATE TABLE courses (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    default_weeks INTEGER NOT NULL,
    price DECIMAL(10,2),
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student progress tracking table
CREATE TABLE student_progress (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    week_number INTEGER NOT NULL,
    days_attended INTEGER DEFAULT 0,
    notes TEXT,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments table
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50),
    payment_date DATE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default courses
INSERT INTO courses (id, name, default_weeks, price, description) VALUES
('basic-computer', 'Basic Computer Skills', 4, 8000.00, 'Essential computer skills for beginners and seniors'),
('microsoft-office', 'Microsoft Office Mastery', 6, 12000.00, 'Advanced Word, Excel, and PowerPoint skills for professionals'),
('web-development', 'Web Development Basics', 8, 18000.00, 'Learn to build websites with HTML, CSS, and JavaScript'),
('python-programming', 'Python Programming', 8, 15000.00, 'Learn programming fundamentals with Python'),
('digital-marketing', 'Digital Marketing Basics', 5, 10000.00, 'Social media marketing and online business fundamentals'),
('smartphone-tablet', 'Smartphone & Tablet Mastery', 3, 6000.00, 'Get the most out of your mobile devices');

-- Create indexes for better performance
CREATE INDEX idx_students_status ON students(status);
CREATE INDEX idx_students_email ON students(email);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_email ON applications(email);
CREATE INDEX idx_student_progress_student_id ON student_progress(student_id);

-- Create function to automatically update student status when course ends
CREATE OR REPLACE FUNCTION update_expired_students()
RETURNS void AS $$
BEGIN
    UPDATE students 
    SET status = 'completed', updated_at = CURRENT_TIMESTAMP
    WHERE status = 'active' 
    AND end_date < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_students_updated_at 
    BEFORE UPDATE ON students 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- You can set up a cron job to run this daily:
-- SELECT update_expired_students();
