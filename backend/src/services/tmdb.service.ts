const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export async function buscarFilmes(termo: string) {
  const url = `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(termo)}&language=pt-BR`;
  const resposta = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(`Erro na TMDb: ${dados.status_message || 'falha desconhecida'}`);
  }

  return dados.results;
}

export async function buscarFilmePorId(tmdbId: number) {
  const url = `${TMDB_BASE_URL}/movie/${tmdbId}?language=pt-BR`;
  const resposta = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(`Filme não encontrado na TMDb: ${dados.status_message || 'erro desconhecido'}`);
  }

  return dados;
}