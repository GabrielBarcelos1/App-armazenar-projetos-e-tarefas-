const express = require('express')

const server = express()

server.use(express.json())

const projetos = [{
  "id":"1",
"title": "Minhas tarefas",
"task": []}]

function checkProjectExists(req,res,next){
  const { id } = req.params
  const project = projetos.find(p => p.id == id);
  
  if(!project){
    return res.status(400).json({erro:"Id not found"})
  }
  return next()
}
function requisitions(req,res,next){
  console.count("numero de requisições")
  return next()
}

server.use(requisitions)
server.get('/projects',(req,res)=>{
  return res.json(projetos)
})

server.post('/projects', (req,res)=>{
  const { id , title} = req.body
  const project = {
    id,
    title,
    task: []
  }
  
  projetos.push(project)

 return res.json(projetos)
})



server.put('/projects/:id',checkProjectExists,(req,res)=>{
  const { id } = req.params
  const { title } = req.body
  
  const project = projetos.find(p => p.id == id)
  
  project.title = title

  return res.json(projetos)
})

server.delete('/projects/:id',(req,res) => {
  const { id } = req.params

  const projectIndex = projetos.findIndex(p => p.id == id);
  projetos.splice(projectIndex,1)
  
  return res.send()
})
server.post('/projects/:id',checkProjectExists,(req,res)=>{
  const { id } = req.params;
  const { title } = req.body;
  const project = projetos.find(p => p.id == id);
  
  project.task.push(title)
  
  return res.json(project);
})

server.listen(3001)