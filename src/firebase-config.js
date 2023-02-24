// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

// App's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCp1KP3Agnuo8Ijs4QqQUBMkOPoMxjcyaY',
	authDomain: 'trainer-portal-d46ca.firebaseapp.com',
	projectId: 'trainer-portal-d46ca',
	storageBucket: 'trainer-portal-d46ca.appspot.com',
	messagingSenderId: '317696584093',
	appId: '1:317696584093:web:8ea75b558f232e69642774',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
