import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCX97G9K9P3cWnjEy8s_NIxjBTx_-KoO9E',
  authDomain: 'catch-of-the-day-ronak.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-ronak.firebaseio.com'
})

const base = Rebase.createClass(firebaseApp.database())

// This is a named export
export { firebaseApp }

// this is a default export
export default base
