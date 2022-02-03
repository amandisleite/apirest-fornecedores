module.exports = {
  listar () {
    return []
  },

  inserir (fornecedor) {
    return {
      id: 400,
      dataCriacao: '10/12/3420',
      dataAtualizacao: '10/12/3420',
      versao: 90
    }
  },

  async pegarPorId (id) {
    return {
      id: 400,
      dataCriacao: '10/12/3420',
      dataAtualizacao: '10/12/3420',
      versao: 90
    }
  },

  async atualizar (id, dadosParaAtualizar) {
  },

  async remover (id) {
  }
}
