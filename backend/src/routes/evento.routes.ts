import { Router } from 'express';
import {
  buscarCatalogo,
  criarEvento,
  listarEventos,
  detalharEvento,
  editarSessao,
} from '../controllers/evento.controller';
import { autenticar, autorizar } from '../middlewares/auth.middleware';

const router = Router();

router.get('/catalogo', autenticar, autorizar('ORGANIZADOR'), buscarCatalogo);
router.get('/', listarEventos);
router.get('/:id', detalharEvento);
router.post('/', autenticar, autorizar('ORGANIZADOR'), criarEvento);
router.put('/sessoes/:sessaoId', autenticar, autorizar('ORGANIZADOR'), editarSessao);

export default router;