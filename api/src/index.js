import cors from 'cors'
import logger from 'morgan'
import express from 'express'
import bodyParser from 'body-parser'
import passport from "passport";
import routes from './routes'
import "./services/google"


const app = express()

app.use(passport.initialize());
app.use(express.json({limit: '50mb'}));
app.use(cors({ origin: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(logger('dev'))


routes(app)


const port = process.env.PORT || 2000
app.listen(port, console.log(`Server running on http://localhost:${port}`))