module.exports = (err, req, res, next) => {
    console.error('Erro na API:', err);
    res.status(500).json({ 
        error: 'Erro interno do servidor', 
        details: err.message 
    });
};
