require('dotenv').config();
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares Globais
app.use(cors()); // Permite o front-end conectar neste back-end
app.use(express.json()); // Permite lidar com requisições JSON

// Rotas
app.use('/api/tasks', taskRoutes);

// Middleware de Erro Global
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Servidor Back-end rodando na porta ${PORT}`);
});
