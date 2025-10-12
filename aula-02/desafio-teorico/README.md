# 📚 Desafio Teórico - Aula 02

## Instruções

Responda às perguntas abaixo diretamente neste arquivo, substituindo o texto "**Sua resposta aqui...**" com suas respostas.

Seja claro e objetivo nas respostas. Você pode usar exemplos para ilustrar os conceitos.

---

## Questões

### 1. Descreva o que é HTML

**Sua resposta aqui...**
  
  HTML é uma lingaguem de marcação para criar e estrutura as páginas web,como um esquelo do site com a sua estrutura,inputs,link´s.
  Exemplo:
      <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Hello, World!</title>
    </head>
    <body>
        <h1>Hello World!</h1>
    </body>
    </html>


### 2. Descreva o que é CSS

**Sua resposta aqui...**

E  um estilo casacata usada para parte visual do usuário e o site, como cores,lyout a estrutura organizada do html e sendo estilizar os elementos do site.

Exemplo:
Mudar o estilo da fonte
    p {
      font-family: "Arial", sans-serif;
      font-style: italic;
    }

Mudar a cor e o tamanho do título
    h1 {
      color: blue;
      font-size: 24px;
    }

### 3. Descreva o que é DOM

**Sua resposta aqui...**

Uma estrutura de árvore  que organiza os documento onde a raiz do projeto é  documento se encontra,tendo os elemento com o html,head,body que são as suas ramificaçõs,cada parte do documento e representda como um objeto com propriedades e métodos como getElementById(),querySelector()para acessar e modificar esses objetos, alterando o que o usuário acessa.

### 4. Descreva o que é um servidor

**Sua resposta aqui...**

Um servidor é um computador ou sistema que fornece serviços, dados ou recursos para outros computadores — chamados de clientes — através de uma rede, como a internet.
Para complementar o  servidor é um equipamento ou programa específico responsável por disponibilizar recursos, informações ou funcionalidades para outros computadores (clientes) conectados a uma rede. Ele concentra dados, executa aplicações e responde a múltiplas solicitações simultaneamente, sendo fundamental para o funcionamento de sites, serviços de e-mail e sistemas empresariais.


### 5. Descreva o que é HTTP

**Sua resposta aqui...**
É uma comunicação entre o navegador e os servidores,ele defineas mensagens que são enviadas e recebidas entre o navegador e o servidor.

### 6. Descreva o que é uma API REST

**Sua resposta aqui...**

Permite uma aplicação se conectar e comparthilhar informações.

Principais características de uma API REST:

Usa métodos HTTP como GET, POST, PUT e DELETE,não mantém estado entre as requisições (é stateless),facilita a integração entre diferentes sistemas e plataformas,utiliza URLs claras para identificar recursos.

Exemplo: API de Loja Virtual

GET → /produtos → lista todos os produtos.

POST → /produtos → adiciona um novo produto.

PUT → /produtos/10 → atualiza as informações do produto de ID 10.

DELETE → /produtos/10 → remove o produto de ID 10.


### 7. Descreva o que é JSON e sua relação com APIs REST

**Sua resposta aqui...**

Uma API REST, o JSON é geralmente o formato padrão usado para enviar e receber dados entre o cliente (como um site ou app) e o servidor.

👉 Exemplo de JSON:

{
  "nome": "Samira",
  "idade": 20,
  "curso": "Análise e Desenvolvimento de Sistemas"
}


As requisições e respostas em APIs REST normalmente usam JSON para representar os dados isso permite integração rápida e padronizada entre sistemas diferentes.


### 8. Descreva o que é autenticação e autorização

**Sua resposta aqui...**
Autenticação verifica a identidade de um usuário, enquanto a autorização define o que esse usuário pode acessar e fazer após ser autenticado.

Exemplo:
Login em um sistema

Autenticação: você digita seu e-mail e senha para entrar no sistema.
→ O sistema verifica se suas credenciais são válidas.

Autorização: depois de entrar, o sistema libera apenas as funções que você tem permissão, como visualizar seu perfil, mas não acessar dados de outros usuários.

## Entrega

1. Preencha todas as respostas acima
2. Faça commit deste arquivo no seu repositório
3. Compartilhe o link do repositório na plataforma de entrega

## Critérios de Avaliação

- **Clareza**: As respostas são claras e compreensíveis
- **Completude**: Todas as questões foram respondidas
- **Precisão**: As informações estão corretas
- **Exemplos**: Uso de exemplos para ilustrar os conceitos (opcional, mas recomendado)
