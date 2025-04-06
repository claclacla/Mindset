
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    UserCredential
} from "firebase/auth";

import { auth } from '@/app/context/authContext';

export default function useAuth() {
    async function signUp(email: string, password: string) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    };
    
    async function login(email: string, password: string) {
        const userCredential: UserCredential | null = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    };
    
    async function logout() {
        await signOut(auth);
    };

    return {
        signUp,
        login,
        logout
    }
} 

