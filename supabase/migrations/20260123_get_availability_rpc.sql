-- Secure function to get busy slots without exposing student data
CREATE OR REPLACE FUNCTION get_instructor_busy_slots(
  p_instructor_id UUID,
  p_start_date TIMESTAMPTZ,
  p_end_date TIMESTAMPTZ
)
RETURNS TABLE (scheduled_at TIMESTAMPTZ)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT l.scheduled_at
  FROM lessons l
  WHERE l.instructor_id = p_instructor_id
    AND l.status IN ('scheduled', 'in_progress')
    AND l.scheduled_at >= p_start_date
    AND l.scheduled_at <= p_end_date;
END;
$$;

-- Grant execute permission to public/anon/authenticated
GRANT EXECUTE ON FUNCTION get_instructor_busy_slots(UUID, TIMESTAMPTZ, TIMESTAMPTZ) TO anon, authenticated, service_role;
