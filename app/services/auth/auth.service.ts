
import {Injectable} from '@angular/core';
// DB
import {FB as firebase} from "../../app.module";
import 'firebase/auth';

@Injectable()
export class AuthService {
    private auth: any;
    constructor() {
        this.auth = firebase.auth();
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