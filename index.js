const express = require('express');
const app = express();

app.use(express.json());
app.set('port', process.env.port || 8000);

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const students = [
  {
    name: "tandor",
    studentId: 0,
    grades: [100, 95, 90]
  }, 
  {
    name: "joe",
    studentId: 1,
    grades: [80, 70, 75]
  }, 
  {
    name: "apple",
    studentId: 2, 
    grades: [100, 70, 80]
  }, 
  {
    name: "franklin",
    studentId: 3,
    grades: [70, 90, 100]
  }
];

const users = [
  {
    email: "testUser@gmail.com",
    password: "123"
  },
]

// GET student - returns a list of all students
app.get('/students', function(req, res) {
  if(Object.keys(req.query).length === 0) {
    res.send(students)
  }

  // GET student?search= - returns a list of students filtered on name matching the given query
  else {
    const query = req.query.search
    const filteredStudents = students.filter(student => student.name.includes(query))
  
    res.json(filteredStudents)
  }
});

// GET students/:studentId - returns details of a specific student by student id
app.get('/students/:studentId', function(req, res, next) {
  res.send(students[req.params.studentId]);
});

// GET grades/:studentId - returns all grades for a given student by student id
app.get('/grades/:studentId', function(req, res, next) {
  studentName = students[req.params.studentId].name
  studentGrades = students[req.params.studentId].grades
  res.send(studentGrades);
});

// POST /grades - records a new grade, returns success status in JSON response (meaning you do 
//   not need to actually store the grade in a database. You do need to validate that the user 
//   supplied at least a grade, and a studentId)

app.post('/grades', function(req, res) {
  let result;
  const body = req.body;

  if(body.studentId && body.grade) {
    students[studentId].grades.push(grade)

    result = {
      "status": "success",
      "message": "The review has been successfully added"
    }
  }

  else {
    result = {
      "status": "failed",
      "message": "The review has not been added"
    }
    res.status(400);
  }

  res.json.result
});

// POST /register - creates a new user, returns success status in JSON response (meaning you do 
//   not need to actually store the user info in a database. You do need to validate that the user 
//   supplied username and email)

app.post('/register', function(req, res) {
  let result;
  const user = {email: req.body.email, password: req.body.password};

  if(user.email && user.password) {
    user.push(user);

    result = {
      "status": "success",
      "message": "The account has been successfully created"
    }
  }

  else {
    result = {
      "status": "failed",
      "message": "The account has not been created"
    }
    res.status(400);
  }

  res.json(result)
});

// Starting server
app.listen(app.get('port'), () => console.log(`listening on port ${app.get('port')}`));

module.exports = app;


//   // for(i=0; i<students.length; i++) {
//   //   console.log('student[i]', student[i]);

//   //   if(student[i].name.includes(req.query))
//   //   {
//   //       res.send(students[i])
//   //   }
//   // }