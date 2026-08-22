export function gerarAssentos(sessaoId: string, capacidade: number) {
  const colunasPorFileira = 10;
  const assentos = [];
  let contador = 0;
  let fileira = 0;

  while (contador < capacidade) {
    const letra = String.fromCharCode(65 + fileira); 
    for (let coluna = 1; coluna <= colunasPorFileira && contador < capacidade; coluna++) {
      assentos.push({ sessaoId, codigo: `${letra}${coluna}` });
      contador++;
    }
    fileira++;
  }

  return assentos;
}