
import {Injectable} from '@angular/core';

//AOT
// import {database, auth} from 'firebase';
// import {FB} from "../../app.module";
//AOT todo

// JIT
import firebase from 'firebase/app';
import 'firebase/auth';
// JIT

@Injectable()
export class AuthService {
    private auth: any;
    constructor() {
        //JIT
        this.auth = firebase.auth();
        // JIT

        //AOT
        // this.auth = FB.auth();
        //AOT todo
    }
    signIn(email: string, pass: string): Promise<any>{
        return this.auth.createUserWithEmailAndPassword(email, pass);
    }
    logIn(email: string, pass: string): Promise<any>{
        return this.auth.signInWithEmailAndPassword(email, pass);
    }
    logOut():Promise<void>{
        return this.auth.signOut();
    }

}