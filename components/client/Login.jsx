"use client";

import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../contexts/AuthProvider';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import Link from 'next/link';

export default function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  const { signUpWithGmail, login } = useContext(AuthContext);
  const router = useRouter();

  const [from, setFrom] = useState('/');

  useEffect(() => {
    if (router.query?.from) {
      setFrom(router.query.from);
    }
  }, [router.query]);

  // Login with Google
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        addUserToSupabase(user); // Add user to Supabase
        router.push(from);
      })
      .catch((error) => console.log(error));
  };

  // Login with email and password
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    login(email, password)
      .then((result) => {
        const user = result.user;
        addUserToSupabase(user); // Add user to Supabase
        alert('Login successful!');
        router.push(from);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  // Add user to Supabase
  const addUserToSupabase = async (user) => {
    try {
        const response = await fetch('https://book-store-server-bice.vercel.app/add-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: user.uid, // Firebase UID
                email: user.email,
                first_name: user.displayName?.split(' ')[0] || null,
                last_name: user.displayName?.split(' ')[1] || null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            }),
        });

        const data = await response.json();
        console.log('User added to Supabase:', data);
    } catch (error) {
        console.error('Error adding user to Supabase:', error);
    }
};

  return (
    <div className="min-h-screen bg-accent-dark/5 py-6 flex flex-col justify-center sm:py-12">
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-light/60 to-primary-dark/80 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div className="max-w-md mx-auto">
          <div>
            <h1 className="text-2xl font-semibold text-primary-light/80">Please Login</h1>
          </div>
          <div className="divide-y divide-gray-200">
            <form onSubmit={handleLogin} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="text"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                  placeholder="Email address"
                  required
                />
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                  placeholder="Password"
                  required
                />
              </div>
              <div>
                <p>
                  {errorMessage ? (
                    <span className="text-red-400 text-sm">Email or Password is not valid!</span>
                  ) : (
                    ''
                  )}
                </p>
                <p className="text-base mt-1">
                  If you don't have an account, please create one{' '}
                  <Link href="/signup" className="underline text-accent-dark font-semibold">
                    Sign Up
                  </Link>
                </p>
              </div>
              <div className="relative">
                <button type="submit" className="bg-primary-dark/80 hover:bg-primary-light/80 text-white rounded px-6 py-2 text-sm">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Social login */}
        <div>
          <hr />
          <div className="flex w-full items-center flex-col mt-5 gap-3">
            {/* Google Login */}
             <button onClick={handleRegister} className="text-sm flex items-center gap-2 px-8 py-3 bg-accent-dark/5 border border-gray-300 rounded hover:bg-accent-dark/10">
                <FaGoogle className="text-green-600 w-9 h-9" />
                 <span>Log in with Google</span>
                   </button>
                    {/* Facebook Login */}
                  <button className="text-sm flex items-center gap-2 px-8 py-3 bg-accent-dark/5 border border-gray-300 rounded hover:bg-accent-dark/10">
                    <FaFacebook className="text-blue-600 w-9 h-9" />
                       <span>Log in with Facebook</span>
                       </button>                          
                                        
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}