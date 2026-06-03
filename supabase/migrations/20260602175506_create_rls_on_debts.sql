ALTER TABLE debts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own debts" ON debts FOR
SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own debts" ON debts FOR
INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own debts" ON debts FOR
UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own debts" ON debts FOR DELETE USING (auth.uid() = user_id);