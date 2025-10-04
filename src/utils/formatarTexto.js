const TEXT_MAPPINGS = {
  funcao: 'Função',
  funcoes: 'Funções',
  logicos: 'Lógicos',
  condicionais: 'Condicionais',
  facil: 'Fácil',
  medio: 'Médio',
  dificil: 'Difícil',
  'operadores-logicos': 'Operadores Lógicos',
  'estrutura-controle': 'Estrutura de Controle',
  'lacos-de-repeticao': 'Laços de Repetição',
  'operadores-aritmeticos': 'Operadores Aritméticos',
  'classes-e-objetos': 'Classes e Objetos',
  'tratamento-de-erros': 'Tratamento de Erros',
  'tipos-de-dados': 'Tipos de Dados',
  'saidas-e-resultados': 'Saídas e Resultados',
  'estruturas-condicionais': 'Estruturas Condicionais',
};

const LOWERCASE_WORDS = ['e', 'de', 'do', 'da', 'com', 'para', 'em', 'a', 'o'];

const capitalizeFirst = (text) => text.charAt(0).toUpperCase() + text.slice(1);

const applyLowercaseWords = (text) => {
  return LOWERCASE_WORDS.reduce((acc, word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    return acc.replace(regex, word.toLowerCase());
  }, text);
};

export const formatarTexto = (text) => {
  if (!text || typeof text !== 'string') return '';

  const mappedText = TEXT_MAPPINGS[text.toLowerCase()] || text;
  const textWithoutHyphens = mappedText.replace(/-/g, ' ');
  const capitalizedText = capitalizeFirst(textWithoutHyphens);

  return applyLowercaseWords(capitalizedText);
};
