import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value.trim()})
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password)
  {
    return setErrorMessage('Please fill out all the fields');
  }
  try {
    setLoading(true);
    setErrorMessage(null);
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify(formData)
    });
    const data = await res.json();
    if (data.success === false){
      setLoading(false);
      return setErrorMessage(data.message)
    }
    setLoading(false);
    if(res.ok){
      navigate('/sign-in')
    }
    
  } catch (error) {
    setErrorMessage(error.message)
    setLoading(false);
  }

  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold m-7"> SignUp </h1>
      <form  onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
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
        <button disabled={loading} className="bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-60">
          {loading ? 'Loading...': 'Sign Up'}
        </button>
      </form>
      <div className="flex gap-4 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-400 font-bold">Sign In</span>
        </Link>
      </div>
      <div>
          {
            errorMessage && <h4 className="mt-5 bg-red-300 rounded-lg">{errorMessage}</h4>
          }
        </div>
    </div>
  );
};

export default SignUp;
