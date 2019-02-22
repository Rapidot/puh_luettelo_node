/*
Harjoitus 3.1, 3.2, 3.3, 3.4, 3.5 ja 3.6
*/
const express = require('express')
const app = express()
const mod = require('./mytimemodule');

const bodyParser = require('body-parser')

app.use(bodyParser.json())


let persons =  [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Martti Tienari",
      "number": "040-123456",
      "id": 2
    },
    {
      "name": "Arto Järvinen",
      "number": "040-123456",
      "id": 3
    },
    {
      "name": "Lea Kutvonen",
      "number": "040-123456",
      "id": 4
	}
]

app.get('/info', (req, res) => {
		const sum = persons.length
  res.send('<p>puhelinluettelossa ' + sum + ' henkilön tiedot </p>' + mod.myDateTime())
  
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  const person = persons.find(person => person.id === id )
   if ( person ) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
if ( person ) {
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

const generateId = () => {
  //const maxId = persons.length > 0 ? persons.map(n => n.id).sort().reverse()[0] : 1
  const maxId = Math.floor(Math.random() * 100) + 1
  return maxId
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === "" || body.number === "") {
    return response.status(400).json({error: 'content missing'})
  }
  
  const duplicate=persons.find(n => n.name.toLowerCase() === body.name.toLowerCase())
  
  if (duplicate) {
    return response.status(400).json({error: 'name already in use'})
  }
  
  const person = {
    name: body.name,
    number: body.number|| 0000,
    id: generateId()
  }

  persons = persons.concat(person)

  response.json(person)
})
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})