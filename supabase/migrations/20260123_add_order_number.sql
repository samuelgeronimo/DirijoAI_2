-- Add order_number column
-- We use a sequence starting at 10000 for a professional look
CREATE SEQUENCE IF NOT EXISTS public.orders_order_number_seq START 10000;

ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS order_number BIGINT DEFAULT nextval('public.orders_order_number_seq');

-- Make it unique just in case
ALTER TABLE public.orders 
ADD CONSTRAINT orders_order_number_key UNIQUE (order_number);
