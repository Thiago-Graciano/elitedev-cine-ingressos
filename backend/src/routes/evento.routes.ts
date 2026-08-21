import { Router } from 'express';
import { buscarCatalogo, criarEvento } from '../controllers/evento.controller';
import { autenticar, autorizar } from '../middlewares/auth.middleware';

const router = Router();

router.get('/catalogo', autenticar, autorizar('ORGANIZADOR'), buscarCatalogo);
router.post('/', autenticar, autorizar('ORGANIZADOR'), criarEvento);

export default router;