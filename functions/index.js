const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)
// const serviceAccount = require('../cloud-function-key.json')
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// })

exports.createUser = functions.https.onRequest((req, res) => {
  if (req.method !== 'POST') res.status(404).send('Method Not Allowed')
  const { email, phoneNumber, password, displayName } = req.body
  admin.auth().createUser({
    email,
    emailVerified: false,
    phoneNumber,
    password,
    displayName,
    photoURL: 'http://www.example.com/12345678/photo.png',
    disabled: false,
  }).then(function (userRecord) {
    res.send(userRecord)
  }).catch(function (error) {
    res.send(error.message)
  })
})

exports.deleteUser = functions.https.onRequest((req, res) => {
  if (req.method !== 'POST') res.status(404).send('Method Not Allowed')
  const { uid } = req.body
  admin.auth().deleteUser(uid).then(function () {
    res.send('Successfully deleted user')
  }).catch(function (error) {
    res.send('Error deleting user:' + error.message)
  })
})
