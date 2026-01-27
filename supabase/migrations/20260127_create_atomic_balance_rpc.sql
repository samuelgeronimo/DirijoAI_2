-- Create atomic balance increment function
-- Fixes: Race condition in instructor balance updates (Issue #1)

CREATE OR REPLACE FUNCTION increment_instructor_balance(
    instructor_uuid UUID,
    amount_cents BIGINT
) RETURNS BIGINT AS $$
DECLARE
    new_balance BIGINT;
BEGIN
    UPDATE instructors 
    SET balance_cents = balance_cents + amount_cents,
        updated_at = NOW()
    WHERE id = instructor_uuid
    RETURNING balance_cents INTO new_balance;
    
    IF new_balance IS NULL THEN
        RAISE EXCEPTION 'Instructor not found: %', instructor_uuid;
    END IF;
    
    RETURN new_balance;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION increment_instructor_balance(UUID, BIGINT) TO authenticated;

-- Add comment
COMMENT ON FUNCTION increment_instructor_balance IS 'Atomically increments instructor balance to prevent race conditions';
