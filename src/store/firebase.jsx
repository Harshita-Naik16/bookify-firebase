import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  updateDoc,
  Timestamp,
  setDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const apiKey = import.meta.env.VITE_TEST_FIREBASE_API_KEY;
const appId = import.meta.env.VITE_TEST_FIREBASE_APP_ID;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "bookify-b7f70.firebaseapp.com",
  projectId: "bookify-b7f70",
  storageBucket: "bookify-b7f70.appspot.com",
  messagingSenderId: "783019915990",
  appId: appId,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const provider = new GoogleAuthProvider();

export const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  const [userState, setUserState] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserState(user);
      } else {
        setUserState(null);
      }
    });
  }, []);

  const isLoggedIn = userState ? true : false;

  const registerUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signinUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };

  const signOutUser = async () => {
    try {
      signOut(auth);
    } catch (err) {
      console.log(err.message);
    }
  };

  const addBookToList = async (name, isbn, price, coverPic, author) => {
    try {
      const imageRef = ref(
        storage,
        `uploads/images/${new Date().getMilliseconds()}-${coverPic.name}`
      );
      const uplaodResult = await uploadBytes(imageRef, coverPic);

      const docResult = await addDoc(collection(db, "books"), {
        name: name,
        author: author,
        isbn: isbn,
        price: price,
        imageUrl: uplaodResult.ref.fullPath,
        userID: userState.uid,
        email: userState.email,
        displayName: userState.displayName,
        photoUrl: userState.photoURL,
      });

      return docResult;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getBookList = async () => {
    return await getDocs(collection(db, "books"));
  };

  const getBookById = async (bookId) => {
    const bookRef = doc(db, "books", bookId);
    const result = await getDoc(bookRef);
    return result;
  };

  const getImage = async (imageUrl) => {
    const pathReference = ref(storage, imageUrl);
    const imageResultUrl = await getDownloadURL(pathReference);
    return imageResultUrl;
  };

  const placeOrder = async (bookId, qty, address) => {
    const bookRef = collection(db, "books", bookId, "orders");
    const result = await addDoc(bookRef, {
      qty: qty,
      email: userState.email,
      displayName: userState.displayName,
      photoUrl: userState.photoURL,
      completed: false,
      placedOn: Timestamp.fromDate(new Date()),
      address: address,
      customerId: userState.uid,
    });
    return result;
  };

  const setUserOrder = async (
    bookId,
    bookName,
    soldBy,
    price,
    qty,
    address,
    orderId,
    userId
  ) => {
    const docRef = doc(db, "userOrders", userId, "orders", orderId);
    const result = await setDoc(docRef, {
      bookName: bookName,
      bookId: bookId,
      soldBy: soldBy,
      price: price,
      qty: qty,
      address: address,
      placedOn: Timestamp.fromDate(new Date()),
      confirmed: false,
    });
    return result;
  };

  const getOrder = async () => {
    const collectionRef = collection(db, "books");
    const q = query(collectionRef, where("userID", "==", userState.uid));
    const result = await getDocs(q);
    return result.docs;
  };

  const getOrderDetail = async (bookId) => {
    const collectionRef = collection(db, "books", bookId, "orders");
    const result = await getDocs(collectionRef);
    return result.docs;
  };

  const updateOrderStatus = async (bookId, orderId, customerId) => {
    const orderRef = doc(db, "books", bookId, "orders", orderId);
    const userOrderRef = doc(db, "userOrders", customerId, "orders", orderId);
    const sellerStatus = updateDoc(orderRef, {
      completed: true,
    });
    const customerStatus = updateDoc(userOrderRef, {
      confirmed: true,
    });
    return await Promise.all([sellerStatus, customerStatus]);
  };

  const getPurchasesList = async () => {
    return await getDocs(collection(db, "userOrders", userState.uid, "orders"));
  };

  return (
    <FirebaseContext.Provider
      value={{
        registerUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        signInWithGoogle,
        signOutUser,
        addBookToList,
        getBookList,
        getImage,
        getBookById,
        getPurchasesList,
        getOrder,
        getOrderDetail,
        placeOrder,
        setUserOrder,
        updateOrderStatus,
        isLoggedIn,
        userState,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
