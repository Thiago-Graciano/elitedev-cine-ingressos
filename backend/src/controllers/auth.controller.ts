import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

export async function cadastrar(req: Request, res: Response) {
  const { nome, email, senha, papel } = req.body;

  const senhaHash = await bcrypt.hash(senha, 10);

  const usuario = await prisma.usuario.create({
    data: { nome, email, senhaHash, papel },
  });

  res.status(201).json({ id: usuario.id, nome: usuario.nome, papel: usuario.papel });
}

export async function login(req: Request, res: Response) {
  const { email, senha } = req.body;

  const usuario = await prisma.usuario.findUnique({ where: { email } });
  if (!usuario) return res.status(401).json({ erro: 'Credenciais inválidas' });

  const senhaCorreta = await bcrypt.compare(senha, usuario.senhaHash);
  if (!senhaCorreta) return res.status(401).json({ erro: 'Credenciais inválidas' });

  const token = jwt.sign(
    { id: usuario.id, papel: usuario.papel },
    process.env.JWT_SECRET!,
    { expiresIn: '24h' }
  );

  res.json({ token, papel: usuario.papel, nome: usuario.nome });
}