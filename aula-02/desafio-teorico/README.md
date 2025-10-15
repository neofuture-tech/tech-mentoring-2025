# 📚 Desafio Teórico - Aula 02

## Instruções

Responda às perguntas abaixo diretamente neste arquivo, substituindo o texto "**Sua resposta aqui...**" com suas respostas.

Seja claro e objetivo nas respostas. Você pode usar exemplos para ilustrar os conceitos.

---

## Questões

### 1. Descreva o que é HTML

HyperText Markup Language (Linguagem de marcação de Hipertexto) 
é a espinha dorsal de qualquer website. Pense nele como o esqueleto ou a estrutura de uma pagina web.
Ele usa "tags" (etiquetas) para dizer ao seu navegador (Chrome, FireFox ou Edge) como o conteúdo deve ser organizado.
Exemplo:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <title>Minha Página</title>
</head>
<body>
    <h1>Olá Mundo!</h1>
</body>
</html>

---

### 2. Descreva o que é CSS

Cascading Style Sheet. É a linguagem responsável por todo o visual e apresentação de um website, em resumo, ele dita como os elementos HTML devem parecer.
O CSS controla:
Cores: A cor do texto, do fundo, dos botões.

Fontes: O tipo de letra (Arial, Times New Roman, etc.), o tamanho e se o texto é itálico ou negrito.

Layout: Onde as coisas ficam na tela (esquerda, direita, centro), o tamanho de caixas e como o conteúdo se move quando você redimensiona a tela (responsividade).

Estilos: Bordas, sombras, animações, transições e muito mais.
Exemplo:
h1 {
    color: #4CAF50; /* Define a cor do texto como um verde bonito */
    text-align: center; /* Centraliza o texto na página */
    font-family: Arial, sans-serif; /* Define a família da fonte */
    border-bottom: 2px solid #ccc; /* Adiciona uma linha cinza sutil abaixo do título */
    padding-bottom: 10px; /* Cria um espaço entre o texto e a linha */
}

---

### 3. Descreva o que é DOM

Document Object Model. Ele é essencialmente uma representação em árvore (ou mapa hierárquico) de todos os elementos de uma página HTML. Quando um navegador carrega um site, ele pega o código HTML e o transforma neste "mapa".

Pense nele como o ponto de interface (o "meio de campo") entre o código estático do HTML e as linguagens de programação dinâmicas, como o JavaScript.

Em termos simples: O DOM é a API (Interface de Programação de Aplicação) da página web. Ele fornece as ferramentas e o caminho para que você modifique a página depois que ela já foi carregada no navegador. É o que faz um botão ter uma ação, ou um texto mudar sem recarregar a página.
---

### 4. Descreva o que é um servidor

Servidor é um sistema de computação – que pode ser hardware físico, uma máquina virtual, ou uma instância de software – que opera dentro de uma arquitetura Cliente-Servidor. Sua principal função é executar código e gerenciar recursos de rede para clientes que fazem requisições.

Exemplos e tipo de servidores:
Servidor Web: O servidor do Google ou do YouTube que envia o código do site para sua tela.

Servidor de Email:O servidor do Gmail ou do Outlook que garante que sua mensagem chegue ao destinatário.

Servidor de Banco de dados: O servidor onde um aplicativo como o Instagram armazena todas as informações de usuários, fotos e comentários.

---

### 5. Descreva o que é HTTP

Hypertext Transfer Protocol. Ele é o protocolo de comunicação fundamental que permite a transferência de informações e dados na World Wide Web (WWW).

Pense no HTTP como o conjunto de regras e a linguagem que o seu Cliente (seu navegador, como Chrome ou Firefox) e o Servidor usam para solicitar e enviar arquivos pela internet.

Como Funciona: O Modelo Requisição-Resposta
O HTTP opera em um modelo simples, mas poderoso: o Cliente-Servidor.

Requisição (Pedido): Quando você digita um endereço (URL) na barra do seu navegador e aperta Enter, o navegador cria uma Requisição HTTP. Esse pedido é enviado ao servidor do site.

Resposta (Entrega): O servidor recebe a requisição, processa o que foi pedido (o arquivo HTML, uma imagem, etc.) e envia de volta uma Resposta HTTP.

Visualização: Essa Resposta HTTP contém o conteúdo solicitado (o código HTML, CSS, JavaScript) e o seu navegador o utiliza para renderizar (montar) a página na sua tela.

---

### 6. Descreva o que é uma API REST

Application Programming Interface. Pense nela como um "contrato de comunicação" que define como dois softwares devem interagir.

REST (Representational State Transfer) é um estilo arquitetural (um conjunto de regras e boas práticas) que usa o protocolo HTTP (que acabamos de descrever) de forma padronizada para realizar essa comunicação.

Uma API REST é, portanto, um conjunto de URLs e regras que um servidor expõe para que clientes (navegadores, aplicativos, outros sistemas) possam acessar ou manipular dados de forma padronizada e previsível.

---

### 7. Descreva o que é JSON e sua relação com APIs REST

JavaScript Object Notation (Notação de Objeto JavaScript).

Em sua essência, JSON é um formato de texto leve e independente de linguagem, usado para armazenar e transferir dados. Pense nele como a linguagem universal de dados da web.

Ele organiza os dados de uma maneira muito fácil de ser lida tanto por humanos quanto por máquinas. O JSON é construído em dois tipos de estruturas:

Coleções de pares de nome/valor (Objetos): Representadas por chaves {}. Isso equivale aos "Objetos" em JavaScript ou "Dicionários" em Python.
Exemplo: {"nome": "Maria", "idade": 30}

Outro exemplo simples de um produto de uma loja online seria representado em JSON:
{
  "id": 456,
  "nome": "Smartphone X10",
  "preco": 1299.50,
  "disponivel": true,
  "cores": ["Preto", "Branco", "Azul"]
}
Excelente! Vamos descrever o que é JSON e, em seguida, explicar por que ele é o "parceiro de comunicação" perfeito para as APIs REST.

O que é JSON?
JSON significa JavaScript Object Notation (Notação de Objeto JavaScript).

Em sua essência, JSON é um formato de texto leve e independente de linguagem, usado para armazenar e transferir dados. Pense nele como a linguagem universal de dados da web.

Ele organiza os dados de uma maneira muito fácil de ser lida tanto por humanos quanto por máquinas. O JSON é construído em dois tipos de estruturas:

Coleções de pares de nome/valor (Objetos): Representadas por chaves {}. Isso equivale aos "Objetos" em JavaScript ou "Dicionários" em Python.

Exemplo: {"nome": "Maria", "idade": 30}

Listas ordenadas de valores (Arrays): Representadas por colchetes [].

Exemplo: [10, 20, 30] ou ["banana", "maçã", "uva"]

Exemplo Simples de JSON
Aqui está como um produto de uma loja online seria representado em JSON:

JSON

{
  "id": 456,
  "nome": "Smartphone X10",
  "preco": 1299.50,
  "disponivel": true,
  "cores": ["Preto", "Branco", "Azul"]
}
Relação do JSON com APIs REST
O JSON se tornou o formato de dados padrão para a grande maioria das APIs REST modernas. Eles têm uma relação simbiótica (de benefício mútuo) pelas seguintes razões:

Clareza e Leveza
O JSON é muito menos "falador" (tem menos caracteres e estrutura extra) do que outros formatos de dados, como o XML. Como o REST é baseado no protocolo HTTP, o JSON permite que as mensagens de Requisição e Resposta sejam menores e mais rápidas para serem transmitidas pela internet.

Embora tenha nascido no JavaScript, bibliotecas e parsers de JSON (programas que leem e interpretam JSON) existem em praticamente todas as linguagens de programação (Python, Java, C#, PHP, etc.). Isso permite que uma única API REST sirva dados para um aplicativo Android (feito em Java), um site (feito em JavaScript) e um script de análise (feito em Python).
---

### 8. Descreva o que é autenticação e autorização

1. Autenticação (Quem é Você?)
Autenticação é o processo de verificar a identidade de um usuário, sistema ou entidade. É a resposta à pergunta: "Você é quem diz ser?"

No mundo digital, é o que acontece quando você faz login.

Exemplo Prático
Entrada no Clube: É o momento em que você mostra sua identidade ou carteira de sócio na porta.

No Software: É o processo de fornecer um nome de usuário (ou e-mail) e uma senha, ou usar métodos biométricos (impressão digital) para provar sua identidade.

2. Autorização (O que Você Pode Fazer?)
Autorização é o processo de determinar quais permissões e acessos um usuário autenticado possui. É a resposta à pergunta: "O que essa pessoa tem permissão para fazer/ver/acessar?"

A Autorização só ocorre depois que a Autenticação é bem-sucedida.

Exemplo Prático
Dentro do Clube: Depois de provar quem você é (Autenticação), a Autorização define:

Se você é um sócio comum, só pode acessar o bar e a pista de dança.

Se você é um membro VIP, você tem autorização para entrar na sala privada de acesso restrito.

No Software: Se você está logado como Administrador, você tem autorização para excluir contas de outros usuários. Se você está logado como Usuário Comum, você só tem autorização para editar sua própria conta.

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
