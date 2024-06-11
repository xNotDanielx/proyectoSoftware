import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app } from "./firebase";
import { updateEmail, updatePassword } from "firebase/auth";
import { auth } from "./firebase"; // asegúrate de importar auth correctamente

const db = getFirestore(app);

interface UserData {
  email: string;
  password: string;
  username: string; // Agregado el campo username
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

export const updateUserProfile = async (uid: string, userData: UserData) => {
  try {
    // Validar los datos de entrada
    if (!userData.email || !userData.password) {
      throw new Error("Email y contraseña son campos obligatorios");
    }

    // Actualizar el perfil en Firestore
    await setDoc(doc(db, 'users', uid), userData, { merge: true });
    console.log("Perfil de usuario actualizado con éxito en Firestore");

    // Actualizar el correo electrónico y la contraseña en Firebase Auth
    const user = auth.currentUser;
    if (user) {
      if (user.email !== userData.email) {
        await updateEmail(user, userData.email);
      }
      await updatePassword(user, userData.password);
    } else {
      throw new Error("No se pudo obtener el usuario actual");
    }
  } catch (error) {
    console.error("Error al actualizar el perfil del usuario en Firestore: ", error);
    throw new Error("No se pudo actualizar el perfil del usuario en Firestore");
  }
};

export const getUserData = async (uid: string): Promise<UserData | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw new Error("Failed to get user data");
  }
};