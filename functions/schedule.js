const functions = require('firebase-functions')
const admin = require('firebase-admin')

exports.cleanInvitation = functions
  .region('europe-west1')
  .pubsub.schedule('0 15 * * *')
  .timeZone('Europe/Copenhagen')
  .onRun(() => {
    const last_8_dates = [...Array(8)].map((_, i) => {
      const day = new Date()
      day.setDate(day.getDate() - i)
      return day.toISOString().slice(0, 10)
    })

    const query = admin
      .firestore()
      .collection('invitations')
      .where('date', 'not-in', last_8_dates)

    query.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete()
      })
    })
  })
