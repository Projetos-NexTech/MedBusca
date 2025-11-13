const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/usuarios', require('./src/routes/usuarioRoutes'));
app.use('/api/remedios', require('./src/routes/remedioRoutes'));
app.use('/api/farmacias', require('./src/routes/farmaciaRoutes'));
app.use('/api/favoritos', require('./src/routes/favoritoRoutes'));
app.use('/api/notificacao', require('./src/routes/notificacaoRoutes'));
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API medbusca está funcionando!',
    timestamp: new Date().toISOString()
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
});