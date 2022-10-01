/* eslint-disable no-undef */
const mongoose = require('mongoose')
let name
let number
if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
} else if (process.argv.length ===5) {
  name= process.argv[3]
  console.log(name)
  number = process.argv[4]
  console.log(number)
}

const password = process.argv[2]
console.log(password)
const url = `mongodb+srv://admindb:${password}@persons.ie3kbjj.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,

})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then(() => {

    if (name && number) {
      let person = new Person({
        name:name,
        number:number,

      })
      console.log(person)
      return person.save()
    } else {
      console.log('in')
      Person
        .find({})
        .then(persons => {
          persons.forEach(person => {
            console.log(person.name ,person.number)
          })

        })
    }
  })
  .then(() => {
    if (name && number) {
      console.log(`added ${name} number ${number} to phonebook`)
    }
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))