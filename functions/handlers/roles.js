const { admin, db } = require('../utils/admin')
const express = require('express')
const cors = (require("cors"))({origin:true});
const app = express()

app.use(cors)

exports.registerAdmin = (req, res) => cors(req, res, () => {
    console.log("resgisteradmin")
    const email = req.body.email
    const password = req.body.password
    const dbRef = db.collection("Users").doc()
    const user = ""; 
    admin.auth().createUser({
        email : email,
        password : password
    })
    .then(user => {
        user = user
        return admin.auth().setCustomUserClaims(user.uid,{
            role : 'admin'
        })
    })
    .then(() => {
        dbRef.set({
            id : dbRef.id,
            uid : user.uid,
            email : email,
            role : 'admin'
        })
    })
    .then(() => {
        res.send({
            message : `Admin registered successfully !`,
            status:true
        })
    })
    .catch(err => {
        console.log(err)
        res.send({
            message : `An error occured while registering`,
            status:false,
            code : `register-error`
        })
    })
})