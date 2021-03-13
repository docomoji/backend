import mongoose from 'mongoose'
const { Schema } = mongoose

// TODO: Add a way to handle multiple languages
const questionSchema = new Schema({
    emojis: String,
    answer: String,
    clue: String,
    category: String
})

// Retrieve a random question from the whole collection
// Implemented this : https://stackoverflow.com/questions/14644545/random-document-from-a-collection-in-mongoose
// the only change is to replace count with estimatedDocumentCount because count is deprecated.
questionSchema.statics.random = function(callback) {
    this.estimatedDocumentCount(function(err, count) {
        if (err) {
            callback(err)
        } 

        const ramount = Math.floor(Math.random() * count)
        // skip will jump over ramount of docs. So the doc we are reaching each time
        // is ramount steps away from the first document 
        this.findOne().skip(ramount).exec(callback)

    }.bind(this)) // We bind this to the callback function in order to retrieve a document
}

// export the model for usage inside the request functions. the third parameter inside the
// model call is the collection name. it works without it but i think it's good practice to
//always specify one.
export const Question = mongoose.model('Question', questionSchema, 'questions')