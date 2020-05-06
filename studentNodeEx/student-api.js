const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 3000

let students =[{
    "StudentID":111,
    "StudentName":"Yogi",
    "StudentGrade":"A",
    "Course":"Information Technology",
    "Address":"No:27,Hellokitty St.,Pinkcity",
    "PhoneNo":9835271682,
},
{
    "StudentID":222,
    "StudentName":"Santhoshi",
    "StudentGrade":"S",
    "Course":"Computer Science",
    "Address":"No:06,Minion St., Minicity",
    "PhoneNo":9835271682,
},
{
    "StudentID":333,
    "StudentName":"Yuvi",
    "StudentGrade":"B",
    "Course":"Mechanical",
    "Address":"No:07,Harry St., Hogwart",
    "PhoneNo":9835271682,
}];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/student', (req, res) =>{
    res.json(students);
});

app.get('/student/:StudentID',(req, res)=>{
    const StudentID = req.params.StudentID;

    for(let student of students){
        if(student.StudentID === StudentID){
            res.json(student);
            return;
        }
    }

    res.status(404).send('Student not found');
});

app.post('/student', (req, res) => {
    const student = req.body;

    console.log(student);
    students.push(student);

    res.send('Student is added to the database');
});

app.put('/student/:StudentID',(req, res)=>{
    const StudentID = req.params.StudentID;
    const newstudent= req.body;
    
    for(let i=0;i<students.length;i++){
        let student=students[i]

        if(student.StudentID === StudentID){
            students[i]=newstudent;
        }
    }

    res.send('Student is edited');

});

app.delete('/student/:StudentID', (req, res)=>{
    const StudentID = req.params.StudentID;

    students=students.filter(i => {
        if(i.StudentID !== StudentID){
            return true;
        }
        return false;
    });
    res.send('Student is deleted');
});

app.listen(port,()=>
console.log(`Hello world listening on port ${port}!`
));