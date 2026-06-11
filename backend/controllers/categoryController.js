const supabase = require('../config/supabase');

exports.getAllCategories = async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('createdAt', { ascending: true });
            
        if (error) throw error;
        res.json(data);
    } catch (err) {
        next(err);
    }
};

exports.createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        
        if (!name) {
            return res.status(400).json({ error: 'O nome da categoria é obrigatório.' });
        }
        
        const { data, error } = await supabase.from('categories').insert([
            { name }
        ]).select();
        
        if (error) {
            if (error.code === '23505') { // Unique constraint violation in Postgres
                return res.status(400).json({ error: 'Categoria já existe.' });
            }
            throw error;
        }
        
        res.status(201).json({ message: 'Categoria criada com sucesso!', category: data[0] });
    } catch (err) {
        next(err);
    }
};
