/*
Harjoitus 3.1, 3.2, 3.3, 3.4, 3.5 ja 3.6 + 3.7, 3.8
 + 3.9, 3.10
 + 3.11
 + 3.13, 3,14

POSTMAN
POST Body:
{
    "name": "B",
    "number": "12",
    "id": 41
}
*/
require('dotenv').config()


const express = require('express')
const app = express()
app.use(express.static('build'))//Etsii juuresta Frontendin upotetusta BUILD hakemistosta index.js tiedoston

/* const nofavicon = require("express-no-favicons")
app.use(nofavicon()) */

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const Person = require('./models/person')

const logger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(logger)

/* const morgan = require('morgan') //Log
morgan.token('message', (req, res)=> {
	return JSON.stringify(req.body)
	}
)
app.use(morgan(':method :url :message :status :res[content-length] - :response-time ms'))*/
 
/* const cors = require('cors') //Cross-origin resource sharing
app.use(cors()) */

/* let persons =  [
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
] */

/* app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
}) */

app.get('/info', (req, res, next) => {
  const sum = persons.length
  res.send('<p>puhelinluettelossa ' + sum + ' henkilön tiedot </p>' + mod.myDateTime())
})

/* app.get('/api/persons', (req, res) => {
  res.json(persons)
}) */

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()))
  });
});

/* app.get('/api/persons/:id', (req, res) => {
  const id = Number(request.params.id)
  console.log(id)
  const person = persons.find(person => person.id === id )
  if ( person ) {
    response.json(person)
  } else {
    response.status(404).end()
  }
}) */
app.get('/api/persons/:id', (request, response) => {
	Person.findById(request.params.id).then(person => {
    response.json(person.toJSON())
  })
})


app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
if ( persons ) {
    res.json(persons)
  } else {
    res.status(404).end()
  }
})

/* const generateId = () => {
  //const maxId = persons.length > 0 ? persons.map(n => n.id).sort().reverse()[0] : 1
  const maxId = Math.floor(Math.random() * 100) + 1
  return maxId
} */

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
    //id: generateId() //Mongon hoidossa
  }

  //persons = persons.concat(person) //Lisätään Mongoon eikä listaan
  
  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON())
  })
  
  response.json(person)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})