const ModeloTabela = require("../rotas/fornecedores/modeloTabelaFornecedor")

ModeloTabela
    .sync()
    .then(() => console.log('tabela criada com sucesso'))
    .catch(console.log)