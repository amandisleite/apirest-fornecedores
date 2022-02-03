const express = require('express')
const bodyParser = require('body-parser')

const roteador = require('../rotas/fornecedores/index')
const roteadorV2 = require('../rotas/fornecedores/rotas.v2')

const NaoEncontrado = require('../erros/NaoEncontrado')
const CampoInvalido = require('../erros/CampoInvalido')
const DadosNaoFornecidos = require('../erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('../erros/ValorNaoSuportado')

const formatosAceitos = require('../serializador/index').formatosAceitos
const SerializadorErro = require('../serializador/index').SerializadorErro

const app = express()

app.use(bodyParser.json())

app.use((requisicao, resposta, proximo) => {
  let formatoRequisitado = requisicao.header('Accept')

  if (formatoRequisitado === '*/*') {
    formatoRequisitado = 'application/json'
  }

  if (formatosAceitos.indexOf(formatoRequisitado) === -1) {
    resposta.status(406)
    resposta.end()
    return
  }

  resposta.setHeader('Content-Type', formatoRequisitado)
  proximo()
})

app.listen(3003, () => console.log('servidor rodando'))

app.use((requisicao, resposta, proximo) => {
  resposta.set('Access-Control-Allow-Origin', '*')
  proximo()
})

app.use('/api/fornecedores', roteador)
app.use('/api/v2/fornecedores', roteadorV2)

// middleware - tratamento de erro
app.use((erro, requisicao, resposta, proximo) => {
  let status = 500

  if (erro instanceof NaoEncontrado) {
    status = 404
  }

  if (erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos) {
    status = 400
  }

  if (erro instanceof ValorNaoSuportado) {
    status = 406
  }

  const serializador = new SerializadorErro(
    resposta.getHeader('Content-Type')
  )
  resposta.status(status)
  resposta.send(serializador.serializar({
    mensagem: erro.message,
    id: erro.idErro
  }))
})
