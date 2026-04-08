'use client'
import { useAxios } from '@/Hooks/useAxios';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const { handleSubmit, register, reset } = useForm();
  const axiosInstance = useAxios();
   const router=useRouter()
 
  
  const handleRegister = (data) => {
    try {
      if (!data.email) {
            return 
      }
      if (!data.password) {
            return 
      }
      const imageFile = data.image[0];
      const formData = new FormData();
      formData.append('image',imageFile);
      const imgBBURL = process.env.NEXT_PUBLIC_IMGBB_API_URL;
     axios.post(imgBBURL, formData).then(imgURl => {
        const imageUrl = imgURl.data.data.url
        axiosInstance
          .post('/auth/register', {
            ...data,
            image: imageUrl,
            authProvider: 'credentials',
          })
          .then(async (res) => {
            console.log(res);
            if (res.data?.insertedId) {
              const resLogin = await signIn('credentials', {
                redirect: false,
                email: data.email,
                password: data.password,
              });
              if (resLogin?.ok) {
                toast.success('Register success');
                router.push('/dashboard')
              }
              console.log(resLogin)
            }
          })
          .catch(error => {
            console.log(error);
          });
      }).catch(err => {
        console.log(err)
      })
      
    } catch (error) {
      
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit(handleRegister)} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <div className="form-control w-full md:col-span-2">
          <label className="label text-sm font-bold text-slate-600">
            Full Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            {...register('name',{required:true})}
            className="input input-bordered h-12 w-full bg-slate-50 border-slate-200 focus:border-[#3B5998] focus:ring-4 focus:ring-[#3B5998]/10 transition-all rounded-xl outline-none"
          />
        </div>

        <div className="form-control w-full md:col-span-2">
          <label className="label text-sm font-bold text-slate-600">
            Profile Picture
          </label>
          <div className="group relative flex items-center justify-center w-full h-20 md:h-24 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer">
            <div className="text-center">
              <p className="text-sm text-slate-500">
                Click to upload or drag & drop
              </p>
            </div>
            <input
              type="file"
              {...register('image',{required:true})}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <div className="form-control w-full">
          <label className="label text-sm font-bold text-slate-600">
            Email Address
          </label>
          <input
            type="email"
            {...register('email',{required:true})}
            placeholder="name@company.com"
            className="input input-bordered h-12 w-full bg-slate-50 border-slate-200 focus:border-[#3B5998] focus:ring-4 focus:ring-[#3B5998]/10 transition-all rounded-xl outline-none"
          />
        </div>

        <div className="form-control w-full">
          <label className="label text-sm font-bold text-slate-600">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            {...register('password',{required:true})}
            className="input input-bordered h-12 w-full bg-slate-50 border-slate-200 focus:border-[#3B5998] focus:ring-4 focus:ring-[#3B5998]/10 transition-all rounded-xl outline-none"
          />
        </div>

        <div className="md:col-span-2 mt-2">
          <button className="btn w-full bg-[#3B5998] hover:bg-[#2d4373] text-white border-none rounded-xl h-14 shadow-lg shadow-[#3B5998]/20 transition-all text-lg font-bold">
            Register Now
          </button>
        </div>

        <div className="md:col-span-2 text-center mt-4 pb-8 md:pb-0">
          <p className="text-sm text-slate-500 font-medium">
            Already have an account?{' '}
            <Link
              href={'/'}
              className="text-[#3B5998] font-extrabold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;