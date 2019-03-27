const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true })
  .then(result => {
	  console.log('connected to MongoDB')
  })
  .catch((error) => {
	  console.log('error connecting to MongoDB:', error.message)
})
	
let personSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: [3,'Nimen min pituus 3 merkkiä'],
		required: true,
  },
  number:  {
	  type: String,
	  minlength: [8,'Numeron min pituus 8 merkkiä'],
	  //maxlength: [4,'max pituus'],
	  required: true
  }
  /* name: String,
  number:String */
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)