import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../../public/firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const axiosInstance = useAxiosPublic();

  // Login with email
  const loginWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Register with email and send data to backend
  const registerWithEmail = async (
    email,
    password,
    name,
    phone,
    photo,
    address,
    upazilaCode
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = userCredential.user;

      // Send user data to backend
      const response = await axiosInstance.post("/users", {
        uid: newUser.uid,
        email: newUser.email,
        displayName: name || "User",
        phone: phone,
        photoUrl: photo || "https://i.ibb.co/k6hTYW1/Alien-Dev.jpg",
        address: address,
        isAdmin: false, // Default role
        isBlocked: false, // Default status
        upazilaCode,
      });
      console.log(response);
      loginWithEmail("rajanidas.ict@gmail.com", "123456");
      return newUser; // Returning new user without affecting the current session
      // return response.data;
    } catch (error) {
      console.error("Registration failed:", error.message);
      throw error; // Re-throw error for further handling if needed
    }
  };

  // Logout user
  const logOutUser = () => {
    return signOut(auth);
  };

  // Monitor auth state and fetch user data from backend
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const { data } = await axiosInstance.get(`/user/${currentUser.uid}`);
          setUser(data);
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth, axiosInstance]);

  return (
    <AuthContext.Provider
      value={{ registerWithEmail, user, loginWithEmail, logOutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
