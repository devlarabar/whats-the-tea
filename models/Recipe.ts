import mongoose from 'mongoose'
const { Schema } = mongoose

const RecipeSchema = new Schema({
    title: String,
    herbs: String,
    extras: String,
}, {
    timestamps: false
})

const Recipe = mongoose.model('Recipe', RecipeSchema)
export default Recipe