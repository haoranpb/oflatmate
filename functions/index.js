const functions = require('firebase-functions')
const admin = require('firebase-admin')
const nodemailer = require('nodemailer')

let config, url
// any better way to do this?
if (Object.keys(functions.config()).length === 0) {
  config = require('./env.json').env
  url = 'http://localhost:8080'
} else {
  config = functions.config().env
  url = 'https://flatmate-3a1eb.web.app'
}

const transport = nodemailer.createTransport(
  {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: config.email.user,
      clientId: config.email.client.id,
      clientSecret: config.email.client.secret,
      refreshToken: config.email.token.refresh,
      accessToken: config.email.token.access,
    },
  },
  { from: `Open Flatmate <${config.email.user}>` }
)

admin.initializeApp()

exports.getUsersInfo = functions
  .region('europe-west1')
  .https.onCall((request) => {
    return admin.auth().getUsers(
      request.map((item) => {
        return { uid: item }
      })
    )
  })

exports.inviteToFlat = functions
  .region('europe-west1')
  .https.onCall(async (data, context) => {
    const docRef = await admin
      .firestore()
      .collection('invitations')
      .add({ fid: data.flatId, date: new Date().toISOString().slice(0, 10) })

    const invitationLink = `${url}/flat?invite=${docRef.id}&flat=${data.flatId}`

    transport.sendMail({
      to: data.email,
      subject: `${data.flatName} -- Invitation`,
      html: `<p>${context.auth.token.name} invites you to join flat: ${data.flatName}</p>
      <p>Click the link to join: ${invitationLink}</p>`,
    })
  })

/*
  This function is taking way too long, fix soon
  maybe real time bind the `flats` collection could help
*/
exports.handleInvitation = functions
  .region('europe-west1')
  .https.onCall(async (data, context) => {
    const querySnapshot = await admin
      .firestore()
      .collection('invitations')
      .doc(data.inviteId) // test of existence could be enough
      .get()

    if (querySnapshot.data() === undefined) {
      return new functions.https.HttpsError(
        'failed-precondition',
        'The invitation has expired'
      )
    } else {
      const docRef = admin
        .firestore()
        .collection('flats')
        .doc(querySnapshot.data().fid)

      docRef.update({
        member: admin.firestore.FieldValue.arrayUnion(context.auth.token.uid),
      })

      return (await docRef.get()).data() // not sure if this will get the update, but it doesn't matter
    }
  })

//TODO: remove invitation on schedule (once per month/week)
