/*
  Warnings:

  - A unique constraint covering the columns `[tmdbId]` on the table `Evento` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Evento_tmdbId_key" ON "Evento"("tmdbId");
