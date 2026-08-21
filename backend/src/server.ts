import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import eventoRoutes from './routes/evento.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/eventos', eventoRoutes);
const PORTA = process.env.PORTA || 3333;
app.listen(PORTA, () => console.log(`Servidor rodando na porta ${PORTA}`));