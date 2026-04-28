'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import GoogleBtn from './GoogleBtn';
import { useRouter } from 'next/navigation';

const Login = () => {
  const { handleSubmit, register } = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async loginData => {
    try {
      setLoading(true)
      const res = await signIn('credentials', {
        redirect: false,
        email: loginData.email,
        password: loginData.password,
      });
      if (res?.ok) {
        toast.success('Login success');
        router.push('/dashboard');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="bg-white w-full max-w-4xl rounded-2xl md:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/20">
      {/* Left Side: Brand/Welcome */}
      <div className="w-full md:w-[40%] bg-[#3B5998] p-8 md:p-12 text-white flex flex-col justify-center items-center text-center md:items-start md:text-left relative overflow-hidden">
        {/* Background shapes for flare */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl rotate-12 mb-6 mx-auto md:mx-0 flex items-center justify-center shadow-xl">
            <span className="text-[#3B5998] text-2xl md:text-3xl font-black -rotate-12">
              do
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            Welcome Back!
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed">
            Join **doChat** to connect, chat, and share moments with your
            friends.
          </p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full md:w-[60%] bg-white p-8 md:p-12">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
            Login to Account
          </h2>
          <p className="text-slate-500 mt-1">Please enter your details</p>
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          <div className="form-control w-full">
            <label className="label font-medium text-slate-700 text-sm">
              Email Address
            </label>
            <input
              type="email"
              {...register('email', { required: true })}
              placeholder="name@company.com"
              className="input input-bordered w-full focus:border-[#3B5998] focus:ring-2 focus:ring-[#3B5998]/20 transition-all outline-none h-12 rounded-xl"
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
              className="input input-bordered w-full focus:border-[#3B5998] focus:ring-2 focus:ring-[#3B5998]/20 transition-all outline-none h-12 rounded-xl"
            />
            <div className="flex justify-end mt-2">
              <a className="text-xs font-semibold text-[#3B5998] hover:underline cursor-pointer">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            disabled={loading}
            className="btn w-full bg-[#3B5998] hover:bg-[#2d4373] text-white border-none rounded-xl h-12 shadow-lg shadow-[#3B5998]/30 transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center text-base font-bold"
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              'Log In'
            )}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400">
                Or continue with
              </span>
            </div>
          </div>
          <GoogleBtn />
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-slate-500">
            Don't have an account?{' '}
            <Link
              href={'/register'}
              className="text-[#3B5998] font-bold hover:underline"
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
