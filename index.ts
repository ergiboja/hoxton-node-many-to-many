import express from 'express'
import Database from 'better-sqlite3'
import cors from 'cors'


const db = Database('./db/data.db', { verbose: console.log })
const port = 4000
const app = express()

app.use(express.json())
app.use(cors())

const getInterviewers= db.prepare(`
    SELECT * FROM interviewers;
`)
const getApplicants = db.prepare(`
    SELECT * FROM applicants;
`)
const getInterviews = db.prepare(`
    SELECT * FROM interviews;
`)



app.get('/', (req, res) => {
    res.send(`Navigate to other routes to find data`)
})
app.get('/applicants', (req, res) => {
    const applicants = getApplicants.all()
    res.send(applicants)
})
app.get('/interviews', (req, res) => {
    const interviews = getInterviews.all()
    res.send(interviews)
})
app.get('/interviewers', (req, res) => {
    const interviewers = getInterviewers.all()
    res.send(interviewers)
})



app.listen(port, () => {
    console.log(` http://localhost:${port}/`)
})