import express from 'express'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import path from 'path'
import { fileURLToPath } from 'url'

import userRoutes from './routes/user.routes.js'
import contactRoutes from './routes/contact.routes.js'
import projectRoutes from './routes/project.routes.js'
import educationRoutes from './routes/education.routes.js'
import authRoutes from './routes/auth.routes.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors({ origin: '*', credentials: true }))


app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'Welcome to My Portfolio API'
  })
})


app.use('/', userRoutes)
app.use('/', authRoutes)
app.use('/', contactRoutes)
app.use('/', projectRoutes)
app.use('/', educationRoutes)


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')))


  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  })
}

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: `${err.name}: ${err.message}` })
  }
  if (err) {
    console.error(err)
    return res.status(400).json({ error: `${err.name}: ${err.message}` })
  }
  next()
})

export default app
