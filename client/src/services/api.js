import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { firebaseConfig } from '../config'

class ApiServices {
  constructor(fbConfig) {
    firebase.initializeApp(fbConfig)
    this.fb = firebase
  }

  signIn = (email, password) =>
    this.fb.auth().signInWithEmailAndPassword(email, password)
  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password)

  addPerson = (person) =>
    this.fb
      .firestore()
      .collection('people')
      .add(person)

  fetchPeople = () =>
    this.fb
      .firestore()
      .collection('people')
      .get()
      .then(processCollectionResponse)

  onAuthChange = (callback) => this.fb.auth().onAuthStateChanged(callback)
}

function processCollectionResponse(response) {
  console.log(response)
  return response.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}

export default new ApiServices(firebaseConfig)
