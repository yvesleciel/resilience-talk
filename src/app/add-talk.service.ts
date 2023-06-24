import { Injectable } from '@angular/core';
import { collection, addDoc, getFirestore, onSnapshot, doc, query, where, getDoc, setDoc } from "firebase/firestore";
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


@Injectable({
  providedIn: 'root'
})
export class AddTalkService {

talkForCurrentUser = [];

  constructor() { }

  async addTalk(talk: any) {
    try {
      const db = getFirestore();
      const docRef = await addDoc(collection(db, "talks"), {
      ...talk
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async updateTalk(talk: any, talkRef: string){
    const db = getFirestore();
    const docRef = await setDoc(doc(db, "talks", talkRef), {
      ...talk
    });
    console.log("Document Update with Ref: ", docRef);
  }

  getTalkPerUser(id: string):Promise<any[]>{
    return new Promise((resolve, reject)=>{
      const db = getFirestore();
      const q = query(collection(db, "talks"), where("uuid", "==", id));
      const unsub = onSnapshot(q, (doc) => {
        //console.log("Current data: ", doc.data());
        const talk:any[] = [];
        console.log(doc)
        doc.forEach(doc => {
          console.log("Current data: ", doc.data());
          console.log("Current key: ", doc.ref.id);
          talk.push(doc)
        })
        resolve(talk);
      });
    })
  }

 uploadImage(file:File):Promise<any>{
    return new Promise((resolve, reject)=>{
      const storage = getStorage();
      const storageRef = ref(storage, 'talkUsersImages');
// 'file' comes from the Blob or File API
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        getDownloadURL(storageRef).then(url => {
          resolve(url)
        })
      });
    })
 }

 async getOneTalkPerRef(ref: string) {
   const db = getFirestore();
   const docSnap = await getDoc(doc(db, 'talks', ref));
   if (docSnap.exists()) return docSnap
   else return null;
  }
}
