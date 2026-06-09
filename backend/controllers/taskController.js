const supabase = require('../config/supabase');

exports.getAllTasks = async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .order('createdAt', { ascending: false });
            
        if (error) throw error;
        res.json(data);
    } catch (err) {
        next(err);
    }
};

exports.createTask = async (req, res, next) => {
    try {
        const { desc, observacao, urgency, category, requester, status } = req.body;
        
        const { data, error } = await supabase.from('tasks').insert([
            { 
                desc, 
                observacao, 
                urgency, 
                category, 
                requester, 
                status: status || 'todo',
                createdAt: new Date().toISOString()
            }
        ]).select();
        
        if (error) throw error;
        res.status(201).json({ message: 'Atividade criada com sucesso!', task: data[0] });
    } catch (err) {
        next(err);
    }
};

exports.updateTaskStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status, completedAt } = req.body;
        
        const { data, error } = await supabase.from('tasks')
            .update({ status, completedAt })
            .eq('id', id)
            .select();
            
        if (error) throw error;
        
        if (data.length === 0) {
            return res.status(404).json({ error: 'Atividade não encontrada.' });
        }
        
        res.json({ message: 'Status atualizado com sucesso!', task: data[0] });
    } catch (err) {
        next(err);
    }
};

exports.updateTaskDetails = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { desc, observacao } = req.body;
        
        const { data, error } = await supabase.from('tasks')
            .update({ desc, observacao })
            .eq('id', id)
            .select();
            
        if (error) throw error;
        
        if (data.length === 0) {
            return res.status(404).json({ error: 'Atividade não encontrada.' });
        }
        
        res.json({ message: 'Atividade atualizada com sucesso!', task: data[0] });
    } catch (err) {
        next(err);
    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { error } = await supabase.from('tasks').delete().eq('id', id);
        
        if (error) throw error;
        res.json({ message: 'Atividade excluída com sucesso!' });
    } catch (err) {
        next(err);
    }
};
