import { Injectable } from '@angular/core';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, updateProfile, onAuthStateChanged} from "firebase/auth";
import {Router} from "@angular/router";
//import firebase from "firebase";


const provider = new GoogleAuthProvider();


//firebase.auth().useDeviceLanguage();

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  errorMessage = '';
  user:any;

  constructor(private router: Router) { }

  signInWithGoogle(){
    const auth = getAuth()
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;
        // The signed-in user info.
        const user = result!.user;
        console.log('********************** user');
        console.log(user);
        console.log('*********************** token');
        console.log(token);
        console.log('current user')
        console.log(auth.currentUser)
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        this.router.navigate([''])
      }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      this.errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }

  signUpWithUsernameAndPass(name:string, email:string, password:string){
    const auth = getAuth();
    console.log(email, password)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        this.updateUsersData(name);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        this.errorMessage = error.message;
        // ..
      });
  }

  signInWithUsernameAndPass(email:string, password:string){
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)

  }

  updateUsersData(displayName: string){
    const auth = getAuth();
    if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName: displayName,
      }).then(() => {
        console.log(auth.currentUser);
        // Profile updated!
        // ...
        this.router.navigate([''])
      }).catch((error) => {
        // An error occurred
        // ...
      });
    }
  }

  getUUID():Promise<string | undefined>{
    return new Promise((resolve, reject)=>{
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          this.user = user;
          const uid = user.uid;
          console.log(uid);
          resolve(uid);
          // ...
        } else {
          // User is signed out
          // ...
          resolve(undefined);
        }
      });
    })
  }
}
