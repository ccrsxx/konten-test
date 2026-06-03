-- Create enum type
CREATE TYPE debt_type AS ENUM ('owed_to_me', 'i_owe');

-- Create debts table
CREATE TABLE debts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    type debt_type NOT NULL,
    counterpart_name TEXT NOT NULL,
    amount BIGINT NOT NULL CHECK (amount > 0),
    note TEXT,
    due_date DATE,
    settled_at TIMESTAMPTZ,
    -- NULL = belum lunas
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
