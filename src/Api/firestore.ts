import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);

interface UserData {
  email: string;
  goal: string;
  exerciseFrequency: string;
  waterIntake: string;
}

export const addUserWithGoal = async (uid: string, userData: UserData) => {
  try {
    console.log("UID:", uid);
    console.log("UserData:", userData);
    await setDoc(doc(db, 'users', uid), userData);
    console.log("Usuario agregado con éxito a Firestore");
  } catch (error) {
    console.error("Error al agregar el usuario a Firestore: ", error);
    throw new Error("No se pudo agregar el usuario a Firestore");
  }
};
