-- CreateEnum
CREATE TYPE "Papel" AS ENUM ('ORGANIZADOR', 'CLIENTE', 'PORTARIA');

-- CreateEnum
CREATE TYPE "StatusAssento" AS ENUM ('DISPONIVEL', 'RESERVADO', 'VENDIDO');

-- CreateEnum
CREATE TYPE "StatusIngresso" AS ENUM ('VALIDO', 'USADO');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "papel" "Papel" NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evento" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "sinopse" TEXT,
    "posterUrl" TEXT,
    "tmdbId" INTEGER,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sessao" (
    "id" TEXT NOT NULL,
    "eventoId" TEXT NOT NULL,
    "dataHora" TIMESTAMP(3) NOT NULL,
    "local" TEXT NOT NULL,
    "capacidade" INTEGER NOT NULL,
    "preco" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Sessao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assento" (
    "id" TEXT NOT NULL,
    "sessaoId" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "status" "StatusAssento" NOT NULL DEFAULT 'DISPONIVEL',

    CONSTRAINT "Assento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reserva" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "sessaoId" TEXT NOT NULL,
    "assentoId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingresso" (
    "id" TEXT NOT NULL,
    "reservaId" TEXT NOT NULL,
    "qrToken" TEXT NOT NULL,
    "shareToken" TEXT NOT NULL,
    "status" "StatusIngresso" NOT NULL DEFAULT 'VALIDO',
    "usadoEm" TIMESTAMP(3),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ingresso_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Assento_sessaoId_codigo_key" ON "Assento"("sessaoId", "codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Reserva_assentoId_key" ON "Reserva"("assentoId");

-- CreateIndex
CREATE UNIQUE INDEX "Ingresso_reservaId_key" ON "Ingresso"("reservaId");

-- CreateIndex
CREATE UNIQUE INDEX "Ingresso_qrToken_key" ON "Ingresso"("qrToken");

-- CreateIndex
CREATE UNIQUE INDEX "Ingresso_shareToken_key" ON "Ingresso"("shareToken");

-- AddForeignKey
ALTER TABLE "Sessao" ADD CONSTRAINT "Sessao_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assento" ADD CONSTRAINT "Assento_sessaoId_fkey" FOREIGN KEY ("sessaoId") REFERENCES "Sessao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_assentoId_fkey" FOREIGN KEY ("assentoId") REFERENCES "Assento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingresso" ADD CONSTRAINT "Ingresso_reservaId_fkey" FOREIGN KEY ("reservaId") REFERENCES "Reserva"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
