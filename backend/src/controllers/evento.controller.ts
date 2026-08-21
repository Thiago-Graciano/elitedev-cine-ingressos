import { Request, Response } from 'express';
import { buscarFilmes, buscarFilmePorId } from '../services/tmdb.service';
import { prisma } from '../lib/prisma';

export async function buscarCatalogo(req: Request, res: Response) {
  const termo = req.query.busca as string;
  if (!termo) return res.status(400).json({ erro: 'Informe um termo de busca' });

  try {
    const filmes = await buscarFilmes(termo);
    res.json(filmes);
  } catch (erro) {
    res.status(502).json({ erro: (erro as Error).message });
  }
}

export async function criarEvento(req: Request, res: Response) {
  const { tmdbId, dataHora, local, capacidade, preco } = req.body;

  const filme = await buscarFilmePorId(tmdbId);

  const evento = await prisma.evento.upsert({
    where: { tmdbId },
    update: {},
    create: {
      titulo: filme.title,
      sinopse: filme.overview,
      posterUrl: `https://image.tmdb.org/t/p/w500${filme.poster_path}`,
      tmdbId,
    },
  });

  const sessao = await prisma.sessao.create({
    data: { eventoId: evento.id, dataHora, local, capacidade, preco },
  });

  res.status(201).json({ evento, sessao });
}