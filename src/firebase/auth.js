import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  const results = await createUserWithEmailAndPassword(auth, email, password);
//   console.log("New User With email&pass - Auth >", results);
  return results;
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  const results = await signInWithEmailAndPassword(auth, email, password);
//   console.log("Existing User With email&pass - Auth >", results.error.code);
  return results;
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const results = await signInWithPopup(auth, provider);
  console.log("User with Google Sign IN >", results);
  return results;
};

export const doSignOut = () => {
  console.log("User SignOut");
  return auth.signOut();
};
