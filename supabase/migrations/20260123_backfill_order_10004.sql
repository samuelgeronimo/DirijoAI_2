DO $$
DECLARE
    v_student_id UUID;
    v_instructor_id UUID;
    v_price_cents BIGINT;
    v_target_date TIMESTAMPTZ := '2026-01-26 12:00:00+00'; -- 9:00 Brasilia (GMT-3)
BEGIN
    -- Get order details
    SELECT student_id, instructor_id, amount_cents 
    INTO v_student_id, v_instructor_id, v_price_cents
    FROM public.orders 
    WHERE order_number = 10004;

    IF v_student_id IS NOT NULL THEN
        -- Check if already exists to avoid dupes
        IF NOT EXISTS (SELECT 1 FROM public.lessons WHERE student_id = v_student_id AND scheduled_at = v_target_date) THEN
             INSERT INTO public.lessons (student_id, instructor_id, scheduled_at, duration_minutes, status, price_cents)
             VALUES (v_student_id, v_instructor_id, v_target_date, 50, 'scheduled', v_price_cents);
             RAISE NOTICE 'Lesson inserted for order 10004';
        ELSE
             RAISE NOTICE 'Lesson already exists for this slot';
        END IF;
    ELSE
        RAISE WARNING 'Order 10004 not found';
    END IF;
END $$;
