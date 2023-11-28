import { MongoClient } from 'mongodb'
import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_STRING)
        console.log('MongoDB connected')
    } catch (err) {
        console.log('Error connecting to MongoDB: ' + err)
    }
}

export default connectDB