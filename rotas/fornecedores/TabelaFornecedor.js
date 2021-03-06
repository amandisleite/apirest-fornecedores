const Modelo = require('./modeloTabelaFornecedor')
const NaoEncontrado = require('../../erros/NaoEncontrado')

module.exports = {
  listar () {
    return Modelo.findAll({ raw: true }) // faz retornar lista de objetos
  },

  inserir (fornecedor) {
    return Modelo.create(fornecedor)
  },

  async pegarPorId (id) {
    const fornecedorEncontrado = await Modelo.findOne({
      where: {
        id: id
      }
    })

    if (!fornecedorEncontrado) {
      throw new NaoEncontrado('fornecedor')
    }

    return fornecedorEncontrado
  },

  atualizar (id, dadosParaAtualizar) {
    return Modelo.update(
      dadosParaAtualizar,
      { where: { id: id } }
    )
  },

  remover (id) {
    return Modelo.destroy({
      where: { id: id }
    })
  }
}
