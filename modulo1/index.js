const express = require('express')

const server = express()
server.use(express.json())

let users = [
  'Gustavo',
  'Matheus',
  'Herta'
]

server.use((req, res, next) => {
  next()
})

const checkName = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({ error: 'Insira um nome valido' })
  }
  return next()
}

const checkUser = (req, res, next) => {
  const { index } = req.params

  if ( users[index] === undefined ) {
    return res.status(400).json({ error: 'Usuario não cadastrado'  })
  }

  return next()
}

server.get('/users', (req, res) => {
  res.json(users)
})
server.get('/users/:index', checkUser, (req, res) => {
  const { index } = req.params

  res.json(users[index])
})
server.post('/users', checkName, (req, res) => {
  const { name } = req.body

  users.push(name)
  
  return res.json(users)
})
server.put('/users/:index', checkUser, checkName, (req, res) => {
  const { name } = req.body
  const { index } = req.params

  users[index] = name
  
  return res.json(users)
})
server.delete('/users/:index', checkUser, (req, res) => {
  const { index } = req.params
  
  users.splice(index, 1)

  return res.json(users)
})

server.listen(3000)