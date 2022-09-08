import express from 'express'
import Database from 'better-sqlite3'
import cors from 'cors'


const db = Database('./db/data.db', { verbose: console.log })
const port = 4000
const app = express()

app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
    res.send(`Navigate to other routes to find data`)
})
app.listen(port, () => {
    console.log(` http://localhost:${port}/`)
})