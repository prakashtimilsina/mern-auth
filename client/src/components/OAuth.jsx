import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      provider.setCustomParameters({ prompt: 'select_account'})
      const result = await signInWithPopup(auth, provider);
      const payload = {
        name: result.user.displayName,
        email: result.user.email,
        googlePhotoUrl: result.user.photoURL,
      };
      console.log("payload", payload);
      const response = await axios.post("/api/auth/google", payload);
      console.log("Response:", response.data);

      // const res = await fetch('/api/auth/google', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     name: result.user.displayName,
      //     email: result.user.email,
      //     googlePhotoUrl: result.user.photoURL,
      //   }),
      // });
      // const data = await res.json();
      // console.log(data);
      dispatch(signInSuccess(response.data));
    } catch (error) {
      console.log("could not login with google", error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
    >
      Continue with google
    </button>
  );
}
