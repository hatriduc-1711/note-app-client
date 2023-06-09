// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCIOV1zoLem-NYNUkGsxVLaHVHyxe9Ym1k',
    authDomain: 'note-app-d9602.firebaseapp.com',
    projectId: 'note-app-d9602',
    storageBucket: 'note-app-d9602.appspot.com',
    messagingSenderId: '862840222555',
    appId: '1:862840222555:web:166faa077c8a7321c9607e',
    measurementId: 'G-HXZ7GLL24X',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
