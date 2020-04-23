const functions = require('firebase-functions');
const express=require('express')
const app=express();
const cors = (require('cors'))({origin:true})
app.use(cors)
const {admin, db} = require('./utils/admin')
const { registerAdmin } = require("./handlers/roles")

app.post("/registerstudent",(req, res) => cors(req, res, () => {
    console.log("registerstudent")
    const email = req.body.email
    const password = req.body.password
    const dbRef = db.collection("Students").doc()
    let uid = ""
    admin.auth().createUser({
        email : email,
        password : password
    })
    .then(user => {
        uid = user.uid
       return admin.auth().setCustomUserClaims(user.uid,{
            role:'student'
        })
    })
    .then(() => {
        return dbRef.set({
            id : dbRef.id,
            uid : uid,
            email : email,
            role : 'student',
            isExist : true,
            score : 0,
            attemptedExamsDates : []
        })
    })
    .then(() => {
       return res.send({
            message : `Student registered successfully!`,
            status:true
        })
    })
    .catch(err => {
        console.log(err)
       return res.send({
            message : `An error occured while registering`,
            status:false,
            code : `register-error`
        })
    })
}))


app.post("/registeradmin",(req, res) => {
    console.log("registeradmin")
    const email = req.body.email
    const password = req.body.password
    const dbRef = db.collection("Lecturers").doc()
    let uid = ""; 
    admin.auth().createUser({
        email : email,
        password : password
    })
    .then(user => {
        uid = user.uid
        return admin.auth().setCustomUserClaims(user.uid,{
            role : 'admin'
        })
    })
    .then(() => {
       return dbRef.set({
            id : dbRef.id,
            uid : uid,
            email : email,
            isExist : true,
            role : 'admin'
        })
    })
    .then(() => {
       return res.send({
            message : `Admin registered successfully !`,
            status:true
        })
    })
    .catch(err => {
        console.log(err)
       return res.send({
            message : `An error occured while registering`,
            status:false,
            code : `register-error`
        })
    })
})



// app.post("/startexamsession",(req, res) => cors(req, res, () => {
//     console.log("startexamsession")
//     const uid = req.body.uid
//     db.collection("Exam").doc()
// })

app.post("/createexamsession", (req, res) => cors(req, res, () => {
    const uid = req.body.uid
    const title = req.body.title
    const students = req.body.students
    const key = req.body.key
    let options = []
    for(let i=0; i<180; i++)
        options.push('')
    const optionsAndStudents = students.map(student => {
        return {
            studentUID : student,
            options : options,
            isStarted : false,
            isFinished : false,
            score : 0
        }
    })
    const dbRef = db.collection("Exams").doc()
    const dbRefAns = db.collection("Answers").doc()
    dbRef.set({
        createdAt : (new Date()).toISOString(),
        id : dbRef.id,
        title:title,
        isCompleted : false,
        key : key
    })
    .then(() => {
        let promises = []
        optionsAndStudents.map(student => {
            console.log(student.studentUID)
            const promise = db.collection("Exams")
            .doc(dbRef.id)
            .collection("Session")
            .doc(student.studentUID)
            .set(student)
            promises.push(promise)
        })

        return Promise.all(promises)
    })
    .then(() => {
        let studentIds = []
        optionsAndStudents.map(student => {
            const promise = db.collection("Students")
            .where("uid","==",student.studentUID)
            .get()
            studentIds.push(promise)
        })
        return Promise.all(studentIds)
    })
    .then((studentIds) => {
        studentIds.map(student => {
            console.log(student.docs.map(doc => doc.data()))
            student.docs.map(doc => {
                db.collection("Students")
                .doc(doc.data().id)
                .update({
                    currentExam : dbRef.id
                })
            })
           
        })
    })
    .then(() => {
        return res.send({
            message : `New session created successfully !`,
            status : true
        })
    })
    .catch(err => {
        console.log(err)
        return res.send({
            message : `Failed to create new session`,
            status : false
        })
    })
}))


app.post("/getsessionlist", (req, res) => {
    db.collection("Exams")
    .orderBy("createdAt","desc")
    .get()
    .then(snap => {
        let exams = snap.docs[0].data()
        console.log(exams)
        return exams
    })
    .then((exams) => {
        return res.send({
            response : exams,
            status : true
        })
    })
    .catch(err => {
        return res.send({
            error : `An error occured while getting the list of tasks,`,
            status : false
        })
    })
})




app.post("/startexam",(req, res) => cors(req, res, () =>{
    console.log("startexam")
    const examId = req.body.examId
    const studentUID = req.body.studentUID
    console.log(examId, studentUID)
    db.collection("Exams")
    .doc(examId)
    .collection("Session")
    .doc(studentUID)
    .update({
        isStarted : true
    })
    .then(() => {
        return res.send({
            message : `${studentUID} started exam`,
            status : true
        })
    })
    .catch(err => {
        console.log(err)
        return res.send({
            error : `Failed to start exam`,
            status : false
        })
    })
}))

app.post("/studentfinishexam", (req, res) => cors(req, res, () =>{
    console.log("studentfinishexam")
    const studentUID = req.body.studentUID
    const examId = req.body.examId
    const options = req.body.options
    let score = 0
    const dbRef = db.collection("Exams").doc(examId)
    let key = []
    db.collection("Exams")
    .where("id","==",examId)
    .limit(1)
    .get()
    .then(snap => {
        let data = snap.docs[0].data()
        let marks = 0
        let neg = 0
        key = data.key
        return key
    })
    .then(() => {
        let marks = 0
        let neg = 0
        console.log(key)
        console.log(options)
        for(let i=0; i<key.length ; i++){
            if(options[i] === key[i]){
                marks = marks + 4
            }
            else if(options[i] === ""){

            }
            else if(options[i] !== key[i]){
                neg ++ ;
            }
        }
        console.log(marks)
        score = marks - neg
        return score
    })
    .then(data => {
        return db.collection("Exams")
                .doc(examId)
                .collection("Session")
                .doc(studentUID)
                .update({
                    isFinished : true,
                    options : options,
                    score : score
                })
    })
    .then(score => {
        return db.collection("Students")
        .where("uid","==",studentUID)
        .limit(1)
        .get()
    })
    .then(student => {
        let id = student.docs[0].data().id
        return db.collection("Students")
        .doc(id)
        .update({
            score : score,
            currentExam : ""
        })
    })
    .then(() => {
        return res.send({
            message : `${studentUID} finished exam`,
            status : true
        })
    })
    .catch(err => {
        console.log(err)
        return res.send({
            error : `Failed to finish exam`,
            status : false
        })
    })
}))  


app.post("/listOfStudents",(req, res) => {
    db.collection("Students")
    .where("isExist","==",true)
    .get()
    .then(snap => {
        let students = snap.docs.map(doc => doc.data())
        return students
    })
    .then(students => {
        return res.send({
            response : students,
            status : true
        })
    })
    .catch(err => {
        console.log(err)
        return res.send({
            error : `Failed to get students`,
            status : false
        })
    })
})

const checkStudentExamStatus = (req, res, next) => {
    console.log("checkStudentExamStatus")
    const examId = req.body.examId
    db.collection("Exams")
    .where("id", "==", examId)
    .get()
    .then(snap => {
        let promises = []
        snap.docs[0].data().studentSelection.map(student => {
            if(!student.isFinished)
                return res.send({
                    message : `Cannot reveal key, students are still in exam`,
                    status : false
                })    
        })

        return next()
    })
}

app.post("/revealkey", checkStudentExamStatus , (req, res) => {
    const examId = req.body.examId
    const key = req.body.key
    const dbRef = db.collection("Exams").doc(examId)
    db.collection("Exams")
    .where("id", "==", examId)
    .limit(1)
    .get()
    .then(snap => {
        if(snap.size < 1)
            return res.send({
                message : `No exam found with the requested exam id`,
                status : false
            })
        return dbRef.set({
            ...snap.docs[0].data(),
            key : key
        },{merge:true})
    })
    .then(() => {
        return res.send({
            message : `Key updated successfully`,
            status : true
        })
    })
    .catch(err => {
        console.log(err)
        return res.send({
            error : `Failed to updated key`,
            status : false
        })
    })
})

app.post("/getmyexams",(req, res) => cors(req, res, ()=> {
    const studentUID = req.body.studentUID
    db.collection("Students")
    .where("uid","==",studentUID)
    .get()
    .then(snap => {
        let data = snap.docs[0].data()
        return data.currentExam
    })
    .then((myExams) => {
        return res.send({
            response : myExams,
            status:true
        })
    })
    .catch(err => {
        console.log(err)
        return res.send({
            error : `Failed to get exams`,
            status : false
        })
    })

}))


app.post("/getresult", (req, res) => cors(req, res, () =>  {
    console.log("getresult")
    const studentUID = req.body.studentUID
    const examId = req.body.examId
    let score = 0
    db.collection("Exams")
    .where("uid","==",studentUID)
    .get()
    .then(snap => {
        let score = snap.docs[0].data().score
        return res.send({
            response : score,
            status : true
        })
    })
    .catch(err => {
        console.log(err)
        return res.send({
            message : `Failed to get score`,
            status : false
        })
    })
}))


app.post("/getoldresult", (req, res) => cors(req, res, () =>{
    console.log("getoldresult")
    const studentUID = req.body.studentUID
    console.log(studentUID)
    db.collection("Students")
    .where("uid", "==", studentUID)
    .limit(1)
    .get()
    .then(student => {
        const score = student.docs[0].data().score
        return res.send({
            response : score,
            status : true
        })
    })
    .catch(err => {
        console.log(err)
        return res.send({
            message : `Failed to get score`,
            status : false
        })
    })
}))


app.post("/bulkregister", (req, res) => {
    for(let i=199001;i<=199065;i++){
        const dbRef = db.collection("Students").doc()
        let email = i+'@alps.com'
        console.log(email)
        let uid = ""
        admin.auth()
        .createUser({
            email : email,
            password : i+'@alps'
        })
        .then(user => {
            uid = user.uid
           return admin.auth().setCustomUserClaims(user.uid,{
                role:'student'
            })
        })
        .then(() => {
            return dbRef.set({
                id : dbRef.id,
                uid : uid,
                email : email,
                role : 'student',
                isExist : true,
                score : 0,
                currentExam : ""
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
})

app.post("/getstudents", (req, res) => {
    db.collection("Students")
    .get()
    .then(snap => {
        return res.send({
            response : snap.docs.map(doc => doc.data()),
            length : snap.docs.length,
            status : true
        })
    })
    .catch(err => {
        console.log(err)
        return res.send({
            message : `Failed to get students`,
            status : false
        })
    })
})

app.post("/getexam",(req, res) => cors(req, res, () => {
    const id = req.body.examId
    db.collection("Exams")
    .where("id", "==", id)
    .get()
    .then(snap => {
        return res.send({
            response : snap.docs[0].data(),
            status : true
        })
    })
    .catch(err => {
        console.log(err)
        return res.send({
            message : `Failed to get exam`,
            status : false
        })
    })
    
}))

exports.api = functions.https.onRequest(app)