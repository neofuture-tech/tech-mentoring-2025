# 📚 Desafio Teórico - Aula 02

## Instruções

Responda às perguntas abaixo diretamente neste arquivo, substituindo o texto "**Sua resposta aqui...**" com suas respostas.

Seja claro e objetivo nas respostas. Você pode usar exemplos para ilustrar os conceitos.

---

## Questões

### 1. Descreva o que é HTML

HTML é uma linguagem de marcação (como dito no nome HyperText Markup Language), que serve para indicar a máquina a separação e estrutura do conteúdo da Web, ou seja, serve para definir coisas como título central, subtítulos, header, parágrafos, etc. 

Exemplo de um parágrafo no hmtl:
<p>Isto é um parágrafo.</p>.

---

### 2. Descreva o que é CSS

CSS acompanha fortemente o HTML, ajudando-o a deixar o site bonito, ou seja, serve para estilizar elementos da página Web. Voltando ao parágrado do HTML, o que podemos fazer com ele é estilizá-lo, ou seja, podemos mudar o fundo, adicionar uma imagem, link(ambos também são possíveis de serem feitos somente em HTML), mudar a fonte, a ênfase do texto, fundo, distância entre parágrafos, etc. Um exemplo de código de CSS para o parágrafo mostrado anterior é:

<style>

p {
 color: blue;
 text-weight: bold;
}

</style>

Isso muda a cor do texto para azul e negrito.  
---

### 3. Descreva o que é DOM

Antes, uma ideia do que é XML:
Em vez de tags predefinidas como o HTML, com XML é o usuário que cria as próprias tags, adaptando a estrutura de acordo com a necessidade para organizar informações, como em bancos de dados, aplicações de software e no comércio eletrônico.

DOM é traduzido como Document Object Model e é uma interface que representa um documento web (como HTML ou XML) como uma árvore de objetos, facilitando que linguagens de programação como JavaScript manipulem dinamicamente o conteúdo, a estrutura e o estilo da página.

Por exemplo, num código JS:
```js
var paragraphs = document.getElementsByTagName("p");
// paragraphs[0] is the first <p> element
// paragraphs[1] is the second <p> element, etc.
alert(paragraphs[0].nodeName);
```
retorna a lista de nós <p> do documento.

---

### 4. Descreva o que é um servidor

Um servidor é um computador equipado com um ou mais processadores, bancos de memória, portas de comunicação, softwares e/ou armazenamento de dados, provendo tudo isso a outros computadores ou oferecendo como serviço.

Exemplo de servidores: 
- servidores de Gmail e Outlook.
- servidor de dados da AWS.
---

### 5. Descreva o que é HTTP

HTTP é HyperText Transfer Protocol é a base da Internet e é usado para carregar páginas Web. Um fluxo típico de HTTP envolve uma máquina cliente que faz uma solicitação a um servidor, o qual por sua vez, envia uma mensagem de resposta. Dessas solicitações, recebemos uma resposta, que pode ser um erro ou acerto.

```py
print("Temos 5 tipos de erros:")
for i in range(1,6,1):
    print(f"{i}xx")
```

Onde o "xx" se refere a números de 1 a 99, e o número das centenas significam Informativo, Sucesso, Redirecionamento, Erro no cliente e Erro no servidor, respectivamente.

---

### 6. Descreva o que é uma API REST

Vamos lembrar o que é uma API antes:

Uma API é um conjunto de definições e protocolos utilizados no desenvolvimento e integração de aplicações de software. Normalmente, pode-se pensar que API é um mediador entre os usuários e clientes e os recursos que eles querem obter.
Exemplo: Para fazer um webscrapping, você normalmente precisa da API do site que vai raspar os dados para fazer as conexões entre os dois.

Ok, vamos agora para API Rest:

REST é uma sigla para Representational State Transfer, que no geral significa um conjunto de regras e diretrizes de como criar uma API. Algumas delas são:
Interface Uniforme - Todas as solicitações de API pelo mesmo recurso devem ter a mesma aparência, independentemente da origem. O mesmo dado deve pertencer a apenas um Identificador de Recurso Uniforme(URI). 
Desacoplamento cliente-servidor - as aplicações do cliente e do servidor devem ser completamente independente uma da outra.
Sem estado - As APIs REST são estado, ou seja, cada solicitação precisa incluir todas as informações necessárias para processamento.
Possibilidade de armazenamento em chace - O nome diz tudo
Arquitetura de sistemas de camada - as chamadas da API passam por várias camadas (como Client, Gateway, Firewall).
---

### 7. Descreva o que é JSON e sua relação com APIs REST

JSON é a sigla para JavaScript Object Notation é uma forma de notação de objetos JavaScript, baseado em texto para troca e armazenamento de dados.

Quando uma solicitação de cliente é feita por uma API RESTful, ela transfere uma representação do estado do recurso para o solicitante ou endpoint. Essa informação, ou representação, é entregue em um de vários formatos, via HTTP: JSON (Javascript Object Notation), HTML, XLT, Python, PHP ou texto simples. No caso, o JSON é o mais usado porque, apesar de seu nome, ele é um formato independente de linguagem e pode ser lido por máquinas e humanos.

Exemplo de JSON:
{
  "nome": "Lucas Albuquerque",
  "idade": 30,
  "cidade": "São Paulo",
  "ativo": true,
  "hobbies": ["programação", "leitura", "corrida"]
}

Parece um dicionário do Python.

---

### 8. Descreva o que é autenticação e autorização

Autenticação é o processo de confirmar a identidade de um usuário ou dispositivo (ou seja, uma entidade).

Exemplo: Verificar a digital ao fazer um PIX.

Autorização se refere ao processo de verificação dos recursos que as entidades (usuários ou dispositivos) podem acessar ou quais ações elas podem executar, ou seja, seus direitos de acesso.

Exemplo:
Imagine uma situação em que você compra um ingresso para um show. O estabelecimento não estará interessado em sua identidade. Eles se preocupam se você está autorizado ou não a assistir ao show. Um ingresso seria uma forma de te autorizar sem precisar se autenticar
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
