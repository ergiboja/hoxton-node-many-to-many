import Database from "better-sqlite3";

const db = Database('./db/data.db', { verbose: console.log })

const interviewers = [
    {
        id: 1,
        name: "Nicolas",
        email: "nicolas.marcora@hoxton.com"
    },
    {
        id: 2,
        name: "Ed",
        email: "ed.putans@hoxton.com"
    },];

    const applicants = [
        {
            id: 1,
            name: "Ergi Boja",
            email: "ergiboja@gmil.com"
        },
        {
            id: 2,
            name: "xhefri Cela",
            email: "xhefricela@gmil.com"
        },
        {
            id: 3,
            name: "Fabjon Laraj",
            email: "fabjonlaraj@gmil.com"
        },
    ]
    
    const interviews=[
        {
            interviewersId: 1,
            applicantsId: 1,
            score: 5,
          date: "10/09/2022"
            
        },
        {
            interviewersId: 1,
            applicantsId: 2,
            score: 8,
          date: "01/09/2022"
            
        },
        {
            interviewersId: 2,
            applicantsId: 1,
            score: 10,
          date: "28/08/2022"
            
        },
        {
            interviewersId: 2,
            applicantsId: 2,
            score: 9,
          date: "10/08/2022"
            
        },
        {
            interviewersId: 3,
            applicantsId: 1,
            score: 3,
          date: "10/07/2022"
            
        },
        {
            interviewersId: 3,
            applicantsId: 2,
            score: 4,
          date: "30/07/2022"
            
        },
    ];
    const deleteApplicanttbl = db.prepare(`
DROP TABLE IF EXISTS applicants;
`)
deleteApplicanttbl.run();

const createApplicantsTbl = db.prepare(`

CREATE TABLE IF NOT EXISTS applicants(
    id INTEGER,
    name TEXT,
    email TEXT,
    PRIMARY KEY (id)
);
`)
createApplicantsTbl.run()
const insertApplication = db.prepare(`
INSERT INTO applicants (name,email) VALUES (@name,@email)
`)
for (let applicant of applicants) {
    insertApplication.run(applicant)
}

const createtableofInterviewers = db.prepare(`
CREATE TABLE IF NOT EXISTS interviewers(
    id INTEGER,
    name TEXT,
    email TEXT,
    PRIMARY KEY (id)
);
`)
createtableofInterviewers.run()
const insertInterviewers = db.prepare(`
INSERT INTO interviewers (name,email) VALUES (@name,@email)
`)
for (let interviewer of interviewers) {
    insertInterviewers.run(interviewer)
}

const createtableofInterviews = db.prepare(`
CREATE TABLE IF NOT EXISTS interviews (
    id INTEGER,
    applicantsId INTEGER NOT NULL,
    interviewersId INTEGER NOT NULL,
    score INTEGER,
    date TEXT,
    FOREIGN KEY (applicantsId) REFERENCES applicants(id) ON DELETE CASCADE,
    FOREIGN KEY (interviewersId) REFERENCES interviewers(id) ON DELETE CASCADE,
    PRIMARY KEY (id)
);
`)
createtableofInterviews.run()
const insertInterviews = db.prepare(`
INSERT INTO interviews (applicantsId,interviewersId, date, score) VALUES (@applicantsId,@interviewersId,@date,@score)
`)
for (let interview of interviews) {
    insertInterviews.run(interview)
}