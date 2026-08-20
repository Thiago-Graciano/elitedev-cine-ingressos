import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  papel: 'ORGANIZADOR' | 'CLIENTE' | 'PORTARIA';
}

declare global {
  namespace Express {
    interface Request {
      usuario?: TokenPayload;
    }
  }
}

export function autenticar(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ erro: 'Token não informado' });

  const token = header.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    req.usuario = payload;
    next();
  } catch {
    return res.status(401).json({ erro: 'Token inválido' });
  }
}

export function autorizar(...papeis: TokenPayload['papel'][]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.usuario || !papeis.includes(req.usuario.papel)) {
      return res.status(403).json({ erro: 'Sem permissão para essa ação' });
    }
    next();
  };
}