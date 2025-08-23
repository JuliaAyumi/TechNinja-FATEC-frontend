export const formatarTexto = (texto) => {
  if (!texto || typeof texto !== 'string') {
    return '';
  }

  const mapCorrecoes = {
    funcao: "Função",
    funcoes: "Funções",
    logicos: "Lógicos",
    condicionais: "Condicionais",
    facil: "Fácil",
    medio: "Médio",
    dificil: "Difícil",
    "operadores-logicos": "Operadores Lógicos",
    "estrutura-controle": "Estrutura de Controle",
    "lacos-de-repeticao": "Laços de Repetição",
    "operadores-aritmeticos": "Operadores Aritméticos",
    "classes-e-objetos": "Classes e Objetos",
    "tratamento-de-erros": "Tratamento de Erros",
    "tipos-de-dados": "Tipos de Dados",
    "saidas-e-resultados": "Saídas e Resultados",
    "estruturas-condicionais": "Estruturas Condicionais",
    // Adicione mais conforme necessário
  };

  let textoFormatado = mapCorrecoes[texto] || texto;

  textoFormatado = textoFormatado.replace(/-/g, " ");

  textoFormatado =
    textoFormatado.charAt(0).toUpperCase() + textoFormatado.slice(1);

  const palavrasMinusculas = [
    "e",
    "de",
    "do",
    "da",
    "com",
    "para",
    "em",
    "a",
    "o",
  ];

  palavrasMinusculas.forEach((palavra) => {
    const regex = new RegExp(`\\b${palavra}\\b`, "gi");
    textoFormatado = textoFormatado.replace(regex, (match) =>
      match.toLowerCase()
    );
  });

  return textoFormatado;
};
