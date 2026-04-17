import bcrypt from "bcrypt"; // 🔥 tambahkan ini
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where
} from "firebase/firestore";
import app from "./firebase";

const db = getFirestore(app);

export async function retrieveProducts(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retrieveDataByID(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));
  const data = snapshot.data();
  return data;
}

export async function signIn(email: string) {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) return null;

  const docData = querySnapshot.docs[0];

  return {
    id: docData.id,
    ...docData.data(),
  };
}

// 🔥 REGISTER (SUDAH DIPERBAIKI)
export async function signUp(
  userData: {
    email: string;
    fullname: string;
    password: string;
    role?: string;
    image?: string;
  },
  callback: Function
) {
  try {
    const q = query(
      collection(db, "users"),
      where("email", "==", userData.email)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return callback({
        status: "error",
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = {
      email: userData.email,
      fullname: userData.fullname,
      password: hashedPassword, 
      role: "user",
      image: userData.image || null,
      createdAt: new Date(),
    };

    await addDoc(collection(db, "users"), newUser);

    return callback({
      status: "success",
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return callback({
      status: "error",
      message: "Internal server error",
    });
  }
}

// GOOGLE SIGN IN
  export async function  signInWithGoogle(userData: any, callback: any) {
    try {
      const q = query(
        collection (db, "users"),
        where("email", "==", userData.email),
      );
      const querySnapshot = await getDocs(q);
      const data: any = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (data.length > 0) {
        userData.role = data[0].role;
        await updateDoc(doc(db, "users", data[0].id), userData);
        callback({
          status: true,
          message: "User registered and logged in with Google",
          data: userData,
        });
      }else{
        userData.role = "member";
        await addDoc(collection(db, "users"), userData);
        callback({
          status: true,
          message: "User registered and logged in with Google",
          data: userData,
        });
      }
    } catch (error:any) {
      callback({
        status: false,
        message: "Failed to register user with Google",
      });
    }
  }
