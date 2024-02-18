import React from 'react';
import {Link} from 'react-router-dom';

const SignUp = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold m-7'> SignUp </h1>
      <form className='flex flex-col gap-4'>
        <input type='text' placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg'/>
        <input type='text' placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg'/>
        <input type='password' placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg'/>
        <button className='bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-60'>Sign Up</button>
      </form>
      <div className='flex gap-4 mt-5'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
        <span className='text-blue-400 font-bold'>Sign In</span>
        </Link>
      </div>
      </div>
  )
}

export default SignUp