# 📚 Desafio Teórico - Aula 02

## Instruções

Responda às perguntas abaixo diretamente neste arquivo, substituindo o texto "**Sua resposta aqui...**" com suas respostas.

Seja claro e objetivo nas respostas. Você pode usar exemplos para ilustrar os conceitos.

---

## Questões

### 1. Descreva o que é HTML

HTML ou HyperText Markup Language é uma linguagem de marcação utilizada 
na construção da estrutura de websites. O HTML permite definir cada
elemento que vai ser utilizado e todas as propriedades que o site
possui, como título, linguagem, descrição, palavras-chave, comportamento em cada dispositivo
e diversas características que permite que o site seja reconhecido nos buscadores da internet.

---

### 2. Descreva o que é CSS

CSS ou Cascading Style Sheets é uma linguagem de estilo, utilizada para dar vida ao site
já estruturado com o HTML. Através do CSS é possível definir cores, espaçamento, fontes, animações,
reações, e até mesmo trabalhar com manipulação do site através de estados diferentes ou temas diferentes.
O CSS trabalha com um modelo de caixa, onde cada elemento possui um conteúdo, um espaçamento interno e um espaçamento 
externo que permite definir sua composição e como deve se comportar com outros elementos.

---

### 3. Descreva o que é DOM

DOM ou Document Object Model é a representação dos elementos de um documento HTML, através de
objetos e propriedades. Com o DOM é possível recuperar e manipular qualquer coisa do documento HTML. Permite
criar animações mais complexas com javascript, manipular eventos, scroll, posição, tamanho etc. O DOM dá o
poder para o javascript transformar páginas HTML dinamicamente, tornando o processo de navegação e atualização
de recursos mais rápido e prático.

---

### 4. Descreva o que é um servidor

Um servidor em sua natureza é aquele que tem por objetivo principal servir alguma coisa para um ou mais receptores.
Na web um servidor serve recursos e os principais recursos são páginas HTML, arquivos css e javascript. É o que permite
que o receptor ou cliente, geralmente um browser mostre para o usuário um website. Além de páginas, um servidor ou também chamado de API, pode servir recursos em formato JSON ou XML para ser recuperado por outro servidor que contém uma página web ou pelo próprio cliente através do navegador.

---

### 5. Descreva o que é HTTP

HTTP ou HyperText Transfer Protocol é um protocolo de comunicação entre um cliente e um servidor,
através dele é possível que um cliente envie uma requisição pedindo recursos do servidor e o servidor retorne
esses recursos através de uma resposta, seja uma página web, um JSON, uma imagem ou texto puro.

---

### 6. Descreva o que é uma API REST

REST ou Representational State Transfer é uma arquitetura projetada para uma construção mais precisa e escalável de APIs,
os servidores que utilizam REST na construção de APIs, trabalham com métodos HTTP como principal elemento de comunicação.
Uma api REST geralmente é Stateless, ela não precisa que o servidor guarde uma sessão de um usuário conectado para 
transmitir recursos. Os métodos mais comuns do HTTP usados para APIs REST são:
- POST: Utilizado para criação de recursos;
- GET: Utilizado para recuperação de recursos;
- PUT: Utilizado para atualização completa de um recurso;
- PATCH: Utilizado para atualização parcial de um recurso;
- DELETE: Utilizado para deletar recursos.
Para garantir que os recursos seja entregue corretamente ou retorne uma mensagem precisa das chamadas para a API,
aplicações REST retornam Status Code do HTTP, onde são classificados em 5 categorias:
- 100: Informação;
- 200: Sucesso;
- 300: Redirecionamento;
- 400: Problema no formato da requisição do lado do cliente;
- 500: Problema do lado do servidor.
Através desse modelo APIs REST permite que o cliente interprete o retorno dos dados corretamente.

---

### 7. Descreva o que é JSON e sua relação com APIs REST

JSON ou Javascript Object Notation é uma representação de objetos javascript, que permite facilmente
a integração e transmissão de dados entre diferentes sistemas ou serviços. O json possui diversas
particularidades, seja para transmitir requisições HTTP, criação de texturas atlas ou mapeamento de dados.
Seu formato é simples e prático, trabalhando com o conceito de Chave-Valor, como pode ser visto abaixo:
{
    "chave": "valor",
    "chave2": "valor"
}
A relação do JSON com APIs REST é exatamente a transmissão de recursos. Aplicações REST retornam e recebem dados
utilizando por padrão o formato JSON, que é previamente configurado no cabeçalho da requisição http com "Content-Type": "application/json". Isso permite que o cliente que consulta a API tenha garantia de como os dados serão entregues ou recebidos,
facilitando a conversa entre serviços.

---

### 8. Descreva o que é autenticação e autorização

Autenticação é o ato de autenticar, provar que você é quem diz ser.
Autorização é o ato de autorizar, demonstrar uma comprovação de cargo, papel ou função garantir acesso restritivo.
Esses dois termos são muito usados em sistemas e aplicações REST, que por ser Stateless não possui armazenamento da sessão
do usuário, dessa forma, para cada requisição o usuário precisa se autenticar seja por um login, uma senha ou um token de acesso.
Dependendo do tipo do recurso, é necessário ter uma autorização, seja como Gerente, Proprietário ou Administrador, que possibilita
acessar recursos restritos ou privados.

---

## Entrega

1. Preencha todas as respostas acima
2. Faça commit deste arquivo no seu repositório
3. Compartilhe o link do repositório na plataforma de entrega

## Critérios de Avaliação

- **Clareza**: As respostas são claras e compreensíveis
- **Completude**: Todas as questões foram respondidas
- **Precisão**: As informações estão corretas
- **Exemplos**: Uso de exemplos para ilustrar os conceitos (opcional, mas recomendado)
