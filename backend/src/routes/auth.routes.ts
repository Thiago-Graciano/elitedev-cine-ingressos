import { Router } from 'express';
import { cadastrar, login } from '../controllers/auth.controller';

const router = Router();

router.post('/cadastro', cadastrar);
router.post('/login', login);

export default router;