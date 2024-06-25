import React, { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    setPersistence,
    browserSessionPersistence
} from "firebase/auth";
import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const register = async (email, password, additionalData) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Check if this is the first user
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const isFirstUser = usersSnapshot.empty;

        // Set user data in Firestore
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, {
            email: user.email,
            role: isFirstUser ? "admin" : "user",
            ...additionalData,
            createdAt: new Date().toISOString(),
            hospitalId: additionalData.hospitalId || generateHospitalId(),
            photoURL: additionalData.photoURL || "",
            uid: user.uid
        });

        setCurrentUser({ ...user, role: isFirstUser ? "admin" : "user" });
    };

    const login = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignUp = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Extracting additional information
            const displayName = user.displayName;
            const email = user.email;
            const photoURL = user.photoURL;
            const uid = user.uid;

        const userRef = doc(db, "users", uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            // Check if this is the first user
            const usersCollection = collection(db, "users");
            const usersSnapshot = await getDocs(usersCollection);
            const isFirstUser = usersSnapshot.empty;

            await setDoc(userRef, {
                email: email,
                role: isFirstUser ? "admin" : "user",
                createdAt: new Date().toISOString(),
                hospitalId: generateHospitalId(),
                country: '',
                fullName: displayName || "",
                regNo: "",
                username: email,
                photoURL: photoURL,
                uid: uid,
                phoneNumber: "",
            });

            setCurrentUser({ ...user, role: isFirstUser ? "admin" : "user" });
        } else {
            setCurrentUser({ ...user, ...userDoc.data() });
        }
    };

    const logout = async () => {
        await signOut(auth);
        setCurrentUser(null);
    };

    const generateHospitalId = () => {
        return 'HOSP' + Math.floor(Math.random() * 1000000).toString();
    };

    useEffect(() => {
        setPersistence(auth, browserSessionPersistence);

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userRef);
                setCurrentUser({ ...user, ...userDoc.data() });
            } else {
                setCurrentUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        register,
        login,
        googleSignUp,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
