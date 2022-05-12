# API-REST

API que faz o crud de quatro entidades (cliente, produto, invoice e invoice itens).

As entidades possuem os seguintes campos:

Cliente

ID (Auto incremento)
Razão Social (max: 50)
Nome Fantasia (max: 50)
CNPJ (max: 14)
e-mail (max: 80)
telefone (max: 12)


Invoice

ID (Auto Incremento)
Ordem de compra (max: 30)
Cliente (ref: cliente)
Data de Emissão (data - default data corrente)
Previsão de chegada (data - não podendo ser < que a data de emissão)


Invoice Itens

ID (Auto incremento)
Número da Invoice (ref: invoice)
Produto (int)
Quantidade (decimal)
Valor unitário (decimal)
Valor Total (decimal)
Valor Total em dólar - consultar na API do Banco Central a cotação do dólar do dia e fazer a conversão.


Os produtos são consumidos da seguinte API:

http://makeup-api.herokuapp.com/

Usuários

ID
e-mail (max: 50)
senha (possuir no minimo 8 caracteres contendo ao menos uma letra maiúscula, um número e um caracter especial).
ativo (default true)

Existem rotas para realizar cada operação (criação, alteração e exclusão de entidades - No caso de exclusão de usuários utilizo soft deletes) As rotas, com exceção de login, são protegidas com autenticação.

As entidades possuem validação nos campos (e-mail válido, cnpj válido etc... )
