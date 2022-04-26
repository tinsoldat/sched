import mongoose from 'mongoose'
import dotenv from 'dotenv'

import eventSchema from '../models/eventSchema'

const config = dotenv.config()

const DATABASE = process.env.DATABASE ?? 'mongodb://127.0.0.1:27017/test'

const main = async () => {

  await mongoose.connect(DATABASE)

  const kittySchema = new mongoose.Schema({
    name: String
  })

  kittySchema.methods.speak = function() {
    const greeting = this.name
    ? "Mew name is " + this.name
    : "I don't have a name"
    console.log(greeting);
  }

  const Kitten = mongoose.model('Kitten', kittySchema)

  const silence = new Kitten({ name: 'Silence' })
  
  silence.speak()

  const fluffy = new Kitten({ name: 'fluffy' })

  await silence.save()
  await fluffy.save()
  fluffy.speak()

  const kittens = await Kitten.find()

  console.log('all kittens: ', kittens);

  console.log('find Fluffy', await Kitten.find({ name: 'fluffy' }))

}


main().catch(err => console.log(err));