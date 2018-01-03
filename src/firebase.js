import firebase from "firebase"

const config = {
  apiKey: "AIzaSyByu75uWrDy5WLBB3d_T1FwMhV3Dnp-T7g",
  authDomain: "searchjobs-ee1d3.firebaseapp.com",
  databaseURL: "https://searchjobs-ee1d3.firebaseio.com",
  projectId: "searchjobs-ee1d3",
  storageBucket: "searchjobs-ee1d3.appspot.com",
  messagingSenderId: "672621764128"
}

firebase.initializeApp(config)

export const db = firebase.database().ref()
export const auth = firebase.auth()
export default firebase