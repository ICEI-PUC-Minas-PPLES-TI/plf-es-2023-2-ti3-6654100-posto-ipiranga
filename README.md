# Posto Ipiranga

Descrição:
O Sistema de Gerenciamento de Posto de Combustível é uma solução abrangente projetada para otimizar e automatizar o processo de gerenciamento de um posto de combustível. Esse software oferece funcionalidades avançadas para controle de estoque de combustíveis, vendas, fluxo de caixa e gestão de clientes. Ele proporciona uma experiência intuitiva para os funcionários do posto e agiliza as operações diárias.

## Alunos integrantes da equipe

* Guilherme Augustto Costa Barros
* Marcus Viniccius Souza de Freitas
* Pablo Guilherme Amancio Pereira Magela Benevenuto
* Raquel Inez de Almeida Calazans
* Tiago Vitor Pereira Saraiva

## Professores responsáveis

* Eveline Alonso Veloso
* Juliana Amaral Baroni de Carvalho
* Luiz Henrique da Costa Silva

## Instruções de Instalação
Antes de iniciar a instalação, certifique-se de ter as seguintes ferramentas instaladas:

IntelliJ
Visual Studio Code
PostgreSQL
Passos de Instalação:
Clone o repositório em sua máquina usando o seguinte comando:
bash
Copy code
git clone https://github.com/seu-usuario/seu-repositorio.git
Configure o ambiente de desenvolvimento Java para a versão 17.

No diretório do frontend, execute o seguinte comando para instalar as dependências npm:

bash
Copy code
cd frontend
npm install
Inicie o servidor Spring e certifique-se de que o banco de dados PostgreSQL esteja em execução.

Execute o comando abaixo para iniciar o aplicativo frontend:

bash
Copy code
npm start

Após a conclusão destes passos, o programa estará pronto para ser utilizado conforme desejado.

## Instruções de Utilização
Ao iniciar a aplicação, siga os passos abaixo para aproveitar as funcionalidades oferecidas:

### Controle de Usuários
Faça o cadastro do seu usuário na página "/cadastro" e efetue o login na página inicial.
No dashboard, você encontrará um menu de opções à esquerda, incluindo "Controle de Usuários".
O usuário administrativo tem a capacidade de gerenciar status e permissões de outros usuários.
A exclusão de perfis só pode ser feita pelo proprietário da conta.
É possível deslogar da sua conta no menu lateral.

### Controle de Produtos
Cada produto cadastrado inclui informações como descrição, marca, unidade de medida e preço.
Através da coluna de opções, você pode alterar e deletar produtos do banco de dados.
Em "Adicionar", você pode criar um novo produto na lista.

### Controle de Estoque
O estoque contém informações sobre o produto, a quantidade em estoque e a última data de alteração.
Em "Editar", você pode ajustar a quantidade presente no estoque.
Em "Excluir", o estoque é zerado.

### Controle de Receitas
Cada receita inclui informações como data, produto, quantidade, valor unitário e valor total.
Ao cadastrar uma nova receita, forneça o ID do produto e a quantidade vendida.

### Controle de Despesas
O controle de despesas inclui dados como data, descrição e valor.
É possível editar e excluir despesas quando necessário.

### Geração de Relatórios
Escolha os relatórios desejados e clique em "Gerar Relatório".
Visualize um preview dos relatórios antes de efetuar o download.
Clique em "Baixar Relatório" para fazer o download dos relatórios gerados.
