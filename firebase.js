import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';
import 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyAxM6D_PK98q3bN3YonRFl3YbQyd0TEGKE',
  authDomain: 'chirp-vet-mentors-app.firebaseapp.com',
  databaseURL: 'https://chirp-vet-mentors-app-default-rtdb.firebaseio.com',
  projectId: 'chirp-vet-mentors-app',
  storageBucket: 'chirp-vet-mentors-app.appspot.com',
  messagingSenderId: '229136364968',
  appId: '1:229136364968:web:aa36ce81a6779bd73d599d',
  measurementId: 'G-XGQ4MJ0DGZ',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export {app, database};
