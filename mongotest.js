/*
Tehtävä 3.12
*/

let mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const pName = process.argv[3]
const pNumber = process.argv[4]

console.log(pName)
console.log(pNumber)



//const url = `mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true`
const url = `mongodb+srv://dbuser1:${password}@cluster0-ztys2.mongodb.net/omapp?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

let personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    //returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
	//delete returnedObject.number
	delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: pName,
  number: pNumber,
})

if ( pName || pNumber ) {
  person.save().then(response => {
    console.log(`lisätty ${response}`);
    mongoose.connection.close();
  })
}else{
  console.log('Puhelinluettelo: ')
  Person.find({}).then(result => {
    result.forEach(person => {		
      console.log(person.toJSON())
    })
    mongoose.connection.close()
  })
}



