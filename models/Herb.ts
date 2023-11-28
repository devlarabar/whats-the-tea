import mongoose from 'mongoose'
const { Schema } = mongoose

const HerbSchema = new Schema({
    name: String,
    nameScientific: String,
    uses: [String],
    sideEffects: [String],
    interactions: [String],
    sources: [String]
})

const Herb = mongoose.models.Herb || mongoose.model('Herb', HerbSchema)
export default Herb