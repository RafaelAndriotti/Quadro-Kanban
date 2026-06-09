-- Rode este SQL no SQL Editor do seu projeto Supabase para criar a tabela.
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "desc" TEXT NOT NULL,
    observacao TEXT,
    urgency TEXT NOT NULL,
    category TEXT NOT NULL,
    requester TEXT,
    status TEXT NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completedAt TIMESTAMP WITH TIME ZONE
);
