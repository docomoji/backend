import dotenv from 'dotenv'
import cors from 'cors'
import { App } from '@tinyhttp/app'
import { Question } from './database/schemas/questions.js'
import mongoose from 'mongoose'

// read the .env file and import values from it
dotenv.config()
// connect to the mongodb cloud 
mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser: true, useUnifiedTopology: true})

const app = new App()
app.use(cors())

app.get('/random', (_, res, next) => {
    Question.random((err, document) => {
        if (err) return next(err)
        
        res.json(document)
    })
})

// Launch the server once the connection to the db is opened
mongoose.connection.once('open', function() {
    app.listen(process.env.PORT || 3030, () => console.log('Server is running'))
});
