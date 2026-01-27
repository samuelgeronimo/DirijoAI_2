-- Add critical database indexes
-- Fixes: Missing indexes causing full table scans (Issue #2)

-- Lessons table (most queried)
CREATE INDEX IF NOT EXISTS idx_lessons_instructor_status 
    ON lessons(instructor_id, status);

CREATE INDEX IF NOT EXISTS idx_lessons_student_status 
    ON lessons(student_id, status);

CREATE INDEX IF NOT EXISTS idx_lessons_scheduled_at 
    ON lessons(scheduled_at DESC);

-- Reviews table (for instructor ratings and profiles)
CREATE INDEX IF NOT EXISTS idx_reviews_instructor_rating 
    ON reviews(instructor_id, rating);

CREATE INDEX IF NOT EXISTS idx_reviews_student 
    ON reviews(student_id);

-- Ledger entries (financial queries)
CREATE INDEX IF NOT EXISTS idx_ledger_profile_created 
    ON ledger_entries(profile_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_ledger_category 
    ON ledger_entries(category, created_at DESC);

-- Orders table (student purchase history)
CREATE INDEX IF NOT EXISTS idx_orders_student_created 
    ON orders(student_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_orders_status 
    ON orders(status);

-- Instructor availability (scheduling queries)
CREATE INDEX IF NOT EXISTS idx_availability_instructor_day 
    ON instructor_availability(instructor_id, day_of_week);

-- Documents (admin approval workflow)
CREATE INDEX IF NOT EXISTS idx_documents_status 
    ON documents(status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_documents_owner 
    ON documents(owner_id, type);

-- Vehicles (instructor profiles)
CREATE INDEX IF NOT EXISTS idx_vehicles_instructor_active 
    ON vehicles(instructor_id, is_active);

-- Add comments
COMMENT ON INDEX idx_lessons_instructor_status IS 'Optimizes instructor dashboard queries';
COMMENT ON INDEX idx_lessons_student_status IS 'Optimizes student dashboard queries';
COMMENT ON INDEX idx_reviews_instructor_rating IS 'Optimizes instructor profile rating calculations';
COMMENT ON INDEX idx_ledger_profile_created IS 'Optimizes financial history queries';
COMMENT ON INDEX idx_orders_student_created IS 'Optimizes student purchase history';
