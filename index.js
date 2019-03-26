/*
Harjoitus 3.1, 3.2, 3.3, 3.4, 3.5 ja 3.6 + 3.7, 3.8
 + 3.9, 3.10
 + 3.11
 + 3.13, 3.14
 + 3.15, 3.16, 3.17 ja 3.18

POSTMAN
POST Body:
{
    "name": "B",
    "number": "12",
    "id": 41
}
*/
require('dotenv').config() //.env ympäristömuuttuja
const mod = require('./mytimemodule')

const express = require('express')
const app = express()
app.use(express.static('build'))//Etsii juuresta Frontendin upotetusta BUILD hakemistosta index.js tiedoston

/* const nofavicon = require("express-no-favicons")
app.use(nofavicon()) */

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const Person = require('./models/person')

/* const morgan = require('morgan') //Log
morgan.token('message', (req, res)=> {
	return JSON.stringify(req.body)
	}
)
app.use(morgan(':method :url :message :status :res[content-length] - :response-time ms')) */

const cors = require('cors') //Cross-origin resource sharing
app.use(cors())

const logger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(logger)

app.get('/info', (request, response, next) => {
	Person.countDocuments({}, (error, count) => {
		console.log('puhelinluettelossa ' + count + ' henkilön tiedot ' + mod.myDateTime())
		response.json('Puhelinluettelossa ' + count + ' henkilön tiedot ' + mod.myDateTime())
	})
	.catch(error => next(error))
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()))
  })
  .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then(person => {
			if (person){
				response.json(person.toJSON())
			} else {
				response.status(404).end()
			}
		})
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === "") {
    return response.status(400).json({error: 'content missing'})
  }
  
  const person = new Person({
    name: body.name,
    number: body.number|| 0000,
    //id: generateId() //Mongon hoidossa
  })

  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON())
  })
  //response.json(person)
  .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  
  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})