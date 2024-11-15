# Fatec - Centro Paula Souza
## TechNinja - Projeto Integrador 4º Semestre FATEC Luigi Papaiz
### Descrição
Sistema que visa oferecer uma plataforma educacional interativa para usuários interessados em aprender programação através de quizzes.

<div align="center">
  <img src="https://github.com/matheusduartedevs/3-semestre-projeto-integrador/assets/127058626/e70ded39-9a2b-415f-8725-e6ac5ef8df0d" alt='LogoWhite' />
</div>

### Time de Desenvolvimento
- [Julia Ayumi](https://github.com/JuliaAyumi)
- [Luan Beserra](https://github.com/luan-beserra)
- [Matheus Duarte](https://github.com/matheusduartedevs)
- [Pedro Henrique](https://github.com/PedroHHCarvalho)

## Metas
- Reunir materiais educativos em um único ambiente.​
- Facilitar o acesso para qualquer tipo de usuário.​
- Criar um sistema intuitivo e amigável.​
- Garantir que os usuários possam encontrar informações rapidamente.

## Requisitos Funcionais
- RF01 - Criação de Contas​
- RF02 - Validações no Cadastro​
- RF03 - Banco de Perguntas​
- RF04 - Perguntas Interativas​
- RF05 - Temas das Perguntas​
- RF06 - Fases Progressivas​
- RF07 - Níveis de Jogo​
- RF08 - Feedback Imediato​
- RF09 - Pontuação e Acompanhamento​

## Funcionalidades
- Criação de perfil
- Realizar Quizzes
- Progresso do Usuário 

## Caso de Uso
<div align="center">
  <img src="https://github.com/user-attachments/assets/42eb6b05-92d4-43eb-8758-7e788d08ffb2" alt='Imagem do caso de uso geral da aplicação' />
</div>

## Stack utilizada
**Front-end:** React, Javascript <br />
**Back-end:** Node <br />
**Banco de Dados:** MongoDB

### Processo de Desenvolvimento de Software - PDS
O PDS segue uma abordagem incremental adaptada do Scrum. A definição de pronto estabelece os mecanismos para controle de qualidade da aplicação.

Estamos utilizando Scrum para entregar semanalmente código e documentação, além de cumprir com as tarefas acadêmicas. Durante as reuniões semanais, revisamos o que cada membro do time fez na semana anterior e, em seguida, definimos as tarefas (tasks) para a semana seguinte. Essas reuniões garantem que todos estejam alinhados com os objetivos do projeto e que possamos abordar rapidamente quaisquer desafios ou problemas.

### Análise de Risco
A análise de risco concluiu que é possível implementar o projeto dentro do semestre, com os alunos atuando como programadores. Para mitigar a questão do tempo, o grupo decidiu se reunir toda quarta-feira na faculdade para revisar as entregas e definir as tarefas (tasks) da próxima semana. Em relação às dificuldades com a programação, o grupo optou por trabalhar em equipe nas tarefas mais complexas, além de realizar pesquisas com professores e na internet para superar os desafios técnicos.

### Product Backlog
Cada requisito possui um identificador único para rastrear a necessidade do cliente com a implementação do software.

| Identificador | Descrição | Complexidade |
| ------------- | ------------------------------------------------------------ | ------------ |
| REQ01         | Criação de Contas: Implementação do cadastro de usuários, incluindo validações básicas de entrada. | Média |
| REQ02         | Validações no Cadastro: Adicionar validações avançadas, como verificação de e-mail duplicado e validação de senha. | Alta |
| REQ03         | Banco de Perguntas: Desenvolvimento do banco de dados para armazenar as perguntas dos quizzes. | Alta |
| REQ04         | Perguntas Interativas: As perguntas devem ser apresentadas de forma interativa e envolvente. | Alta |
| REQ05         | Perguntas Dinâmicas:  Deve permitir que as perguntas envolvam múltipla escolha e verdadeiro ou falso. | Alta |
| REQ06         | Temas das Perguntas: Desenvolvimento de categorias temáticas para as perguntas, permitindo filtros por tema. | Média |
| REQ07         | Fases Progressivas: O jogo deve ter fases progressivas, com dificuldade aumentando à medida que o usuário avança. | Média |
| REQ08         | Balanceamento: Garantir que a progressão de dificuldade seja equilibrada, evitando saltos bruscos que possam frustrar o usuário. | Alta |
| REQ09         | Níveis de Jogo: Os usuários devem passar por diferentes níveis para completar o jogo. | Alta |
| REQ10         | Controle de Nível: O sistema deve permitir que o usuário inicie, pause e retome os níveis. | Média |
| REQ11         | Feedback Imediato: Fornecimento de feedback imediato após cada resposta do quiz. | Média |
| REQ12         | Pontuação e Acompanhamento: Implementação de um sistema de pontuação que permita acompanhar o progresso dos usuários ao longo do tempo. | Alta |
| REQ13         | Análise de desempenho dos Usuários: Fornecer um ranking comparativo com o progresso de outros usuários. | Alta |
| REQ14         | Interface Intuitiva e Fácil de Usar: Garantir que a interface do usuário seja simples e intuitiva. | Média |
| REQ15         | Experiência do Usuário Amigável: Otimizar a experiência do usuário para que seja acessível e agradável. | Média |
| REQ16         | Segurança dos Dados: Implementar práticas de segurança para proteger os dados dos usuários. | Alta |
| REQ17         | Escalabilidade: Garantir que o sistema seja capaz de crescer com o aumento de usuários e dados. | Alta |

### Definição de Pronto
O sprint será considerado concluído quando:
1. Todas as entregas de cada membro devem ser revisadas pela equipe.
2. As entregas de código devem estar de acordo com os padrões de aceitação definidos pela equipe e ser plenamente executáveis.
3. Após a aprovação do código, ele deve ser armazenado no GitHub.

### Projeto de Arquitetura
A arquitetura do sistema segue uma abordagem orientada a serviços, classificada em três tipos:

1. **Serviços utilitários**: Implementam funcionalidades comuns e reutilizáveis, como a validação de e-mail e senha.

2. **Serviços de entidade (serviços de negócios)**: Derivados de uma ou mais entidades de negócio, esses serviços possuem um alto grau de reutilização. Exemplos incluem:
   - **Serviço de Gerenciamento de Usuários (User)**: Gerencia os dados dos usuários, como a criação de novos usuários, atualização de informações de perfil e gerenciamento de pontuações de quizzes.
   - **Serviço de Autenticação e Autorização**: Funções relacionadas ao login, logout e verificação de permissões de usuários.
   - **Serviço de Gerenciamento de Quizzes**: Gerencia quizzes, incluindo a criação de novos quizzes, armazenamento dos resultados de quizzes concluídos e verificação de quizzes já completados.

3. **Serviços de tarefa (coordenação de processos-workflow)**: Serviços específicos que suportam processos de negócios amplos, envolvendo atividades e atores diferentes. Exemplos incluem:
   - **Serviço de Fluxo de Quizzes**: Coordena o processo de direcionar o usuário para quizzes específicos, verificando quais quizzes já foram concluídos e qual o próximo passo no processo de aprendizado.
   - **Serviço de Gestão de Sessão e Navegação**: Controla a navegação do usuário, incluindo redirecionamentos com base no estado de login ou progresso do usuário nos quizzes.
   - **Serviço de Notificações ao Usuário**: Gerencia a exibição de mensagens de erro ou sucesso ao usuário durante a execução de tarefas, como o envio de formulários ou conclusão de quizzes.
