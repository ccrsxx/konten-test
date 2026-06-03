-- Composite index on (user_id, created_at DESC)
-- Alasan: Query utama di dashboard selalu filter by user_id lalu ORDER BY created_at DESC.
CREATE INDEX idx_debts_user_id_created_at ON debts (user_id, created_at DESC);

-- Composite index on (user_id, amount DESC)
-- Alasan: Fitur "Sort by Jumlah" pakai ORDER BY amount DESC/ASC.
CREATE INDEX idx_debts_user_id_amount ON debts (user_id, amount DESC);

-- Composite Index on (user_id, settled_at)
-- Alasan: Filter status "belum lunas" (settled_at IS NULL) dan "lunas" (settled_at IS NOT NULL)
CREATE INDEX idx_debts_user_id_settled_at ON debts (user_id, settled_at);