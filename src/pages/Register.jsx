import React from "react";
import { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import SmallTalkLogo from "../img/ST-logo.png";


const Register = () => {
  const [err, setError] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];


    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {

          //Update profile
          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL,
          });

          //create user on firestore
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, "userChats", res.user.uid), {});

          navigate('/');
        });
      });
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <img className="logo" src= {SmallTalkLogo} alt=""/>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input id='username' type="text" placeholder="display name" />
          <input type="email" placeholder="email id" />
          <input type="password" placeholder="password" />
          <input
            style={{ display: "none" }}
            type="file"
            id="displayPicture"
            placeholder="display picture"
          />
          <label htmlFor="displayPicture">
            <img src={Add} alt="Add file" />
            <span>Add your avatar</span>
          </label>
          <button>Sign Up</button>
          {err && <span className="errorMsg">Something went wrong !!</span>}
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};
export default Register;
