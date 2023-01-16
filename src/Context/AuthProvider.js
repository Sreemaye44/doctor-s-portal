import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/Firebase.config';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth';
export const AuthContext=createContext();
const auth=getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser]=useState(null);
    const [loading, setLoading]=useState(true);
    const createUser=(email, password)=>{
        setLoading(false);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signIn=(email, password)=>{
        setLoading(false);
        return signInWithEmailAndPassword(auth, email, password)
    }
    const updateUser=(userInfo)=>{
        setLoading(false);
        return updateProfile(auth.currentUser, userInfo);
    }
    const logOut=()=>{
        return signOut(auth);
    }
    
    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth,currentUser=>{
            console.log('user Observing')
            setUser(currentUser);
            setLoading(false);
        });
        return ()=> unsubscribe();
    },[])


    const authInfo={
        user,
        createUser,
        signIn,
        logOut,
        updateUser,
        loading

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;