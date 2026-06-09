const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn("⚠️ Variáveis de ambiente SUPABASE_URL ou SUPABASE_KEY não encontradas. Verifique seu arquivo .env no backend.");
}

// Cria a conexão (usa placeholder caso as chaves não estejam presentes para evitar crash imediato na importação)
const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseKey || 'placeholder'
);

module.exports = supabase;
