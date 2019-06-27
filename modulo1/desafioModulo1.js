const express = require('express')

const server = express()
server.use(express.json())

let projects = []
let count = 0

server.use((req, res, next) => {
  addCount()

  next()

  console.log(count)
})

function addCount() {
  count++
}

function checkID(req, res, next) {
  const { id } = req.params
  const project = projects.find( item => item.id === id )

  if( project === undefined || id === undefined ) {
    return res.status(400).json({ error: 'Id não localizado ou Invalido' })
  }

  return next()
}

server.get('/projects', (req, res) => {
  return res.json(projects)
})

server.post('/projects', (req, res) => {
  const { id, title } = req.body

  projects.push({ id, title, tasks: [] })

  return res.json(projects)
})

server.put('/projects/:id', checkID, (req, res) => {
  const { id } = req.params
  const { title } = req.body

  const project = projects.find( item => item.id === id )

  project.title = title

  return res.json( project )
})

server.delete('/projects/:id', checkID, (req, res) => {
  const { id } = req.params

  const project = projects.findIndex( item => item.id === id )

  projects.splice(project, 1)

  return res.send()
})

server.post('/projects/:id/tasks', checkID, (req, res) => {
  const { id } = req.params
  const { title } = req.body

  const project = projects.find( item => item.id === id )

  project.tasks.push(title)

  return res.send()
})

server.listen(5000)