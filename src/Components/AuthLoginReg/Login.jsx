'use client'
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import GoogleBtn from './GoogleBtn';
import { useRouter } from 'next/navigation';

const Login = () => {
  const { handleSubmit, register } = useForm();
  const session = useSession()
  console.log(session)
  const router =useRouter()
  const handleLogin =async (loginData) => {
   try {
     if (!loginData.email) {
       return;
     }
     if (!loginData.password) {
       return;
     }
   const res = await  signIn('credentials', {
       redirect: false,
       email: loginData.email,
       password: loginData.password,
     });
     if (res?.ok) {
       toast.success('Login success');
       router.push('/dashboard')
     } else {
        toast.error('Login error');
     }
    
   } catch (error) {
    console.log(error)
   }
  }
  return (
    <div className="bg-white w-full max-w-4xl max-h-[90vh] md:max-h-[95dvh] overflow-y-auto rounded-3xl shadow-2xl flex flex-col md:flex-row border border-white/20">
      {/* Left Side: Brand/Welcome - Hidden or shrunk on very small screens if needed, but here we stack it */}
      <div className="w-full md:w-1/2 bg-[#3B5998] p-6 md:p-10 text-white flex flex-col justify-center items-center text-center">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-3xl rotate-12 mb-4 md:6 flex items-center justify-center backdrop-blur-md">
          <span className="text-3xl md:text-4xl font-bold -rotate-12">do</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-black tracking-tight mb-2 md:4">
          Welcome Back!
        </h1>
        <p className="text-sm md:text-base text-[#FFFFFF]/80 leading-relaxed">
          Join **doChat** to connect, chat, and share moments with your friends.
        </p>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full md:w-1/2 bg-white p-6 md:p-10">
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">
            Login to Account
          </h2>
         
        </div>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="space-y-4 md:space-y-5"
        >
          <div className="form-control w-full">
            <label className="label font-medium text-slate-700 text-sm">
              Email Address
            </label>
            <input
              type="email"
              {...register('email', { required: true })}
              placeholder="name@company.com"
              className="input input-bordered w-full focus:border-[#3B5998] focus:ring-2 focus:ring-[#3B5998]/20 transition-all outline-none h-11 md:h-12"
            />
          </div>

          <div className="form-control w-full">
            <label className="label font-medium text-slate-700 text-sm">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register('password', { required: true })}
              className="input input-bordered w-full focus:border-[#3B5998] focus:ring-2 focus:ring-[#3B5998]/20 transition-all outline-none h-11 md:h-12"
            />
            <div className="flex justify-end mt-1 md:mt-2">
              <a className="text-[10px] md:text-xs font-semibold text-[#3B5998] hover:underline cursor-pointer">
                Forgot password?
              </a>
            </div>
          </div>

          <button className="btn w-full bg-[#3B5998] hover:bg-[#2d4373] text-white border-none rounded-xl h-11 md:h-12 shadow-lg shadow-[#3B5998]/30 transition-all">
            Login In
          </button>
        </form>

        <div className="mt-4">
          <GoogleBtn />
        </div>

        <div className="text-center mt-4 md:mt-6">
          <p className="text-xs md:text-sm text-slate-500">
            Don't have an account?{' '}
            <Link
              href={'/register'}
              className="text-[#3B5998] font-bold cursor-pointer hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;