var admin = require("firebase-admin");

var serviceAccount = require("../admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://online-grand-test-series.firebaseio.com"
});

const db = admin.firestore()

module.exports = { db, admin }