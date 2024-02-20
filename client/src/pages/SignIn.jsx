import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth.jsx";
import axios from "axios";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { errorMessage, loading } = useSelector((state) => state.user);
  // const [errorMessage, setErrorMessage] = useState('');
  // const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      // return setErrorMessage('Please fill out all the fields');
      return dispatch(signInFailure("Please fill out all the fields"));
    }
    try {
      // setLoading(true);
      // setErrorMessage(null);
      dispatch(signInStart());
      // const res = await fetch('/api/auth/signin', {
      //   method: 'POST',
      //   headers: {'Content-Type':'application/json'},
      //   body:JSON.stringify(formData)
      // });
      // const data = await res.json();
      // if (data.success === false){
      //   return dispatch(signInFailure(data.message))
      // }
      // setLoading(false);
      const response = await axios.post("/api/auth/signin", formData);
      // console.log("Signin Response", response.data);
      dispatch(signInSuccess(response.data));
      navigate("/");
      // if(res.ok){
      //   navigate('/')
      // }
    } catch (error) {
      // setErrorMessage(error.message)
      // setLoading(false);
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold m-7"> Sign In </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-4 mt-5">
        <p>Dont Have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-400 font-bold">Sign Up</span>
        </Link>
      </div>
      <div>
        <h4 className="mt-5 bg-red-300 rounded-lg">
          {errorMessage ? errorMessage || "Something went wrong" : ""}
        </h4>
      </div>
    </div>
  );
};

export default SignIn;
