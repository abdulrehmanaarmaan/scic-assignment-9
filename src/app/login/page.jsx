"use client"

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    const MOCK_EMAIL = "student@sciccompany.com";
    const MOCK_PASSWORD = "SecurePass123!";

    const handleLogin = event => {
        event.preventDefault();

        setIsSubmitting(true)

        if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {

            Cookies.set("auth", "true", { expires: 1 });

            toast.success('Logged in successfully')

            localStorage.removeItem("loginEmail");
            localStorage.removeItem("loginPassword"); // clear persisted values

            router.push("/items-list")

        }
        else {
            toast.error("Invalid email or password");
        }

        setIsSubmitting(false)
    }

    useEffect(() => {
        const savedEmail = localStorage.getItem("loginEmail");
        const savedPassword = localStorage.getItem("loginPassword");

        if (savedEmail || savedPassword) {
            // Defer setState to next tick to avoid cascading render
            queueMicrotask(() => {
                if (savedEmail) setEmail(savedEmail);
                if (savedPassword) setPassword(savedPassword);
            });
        }
    }, []);

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 pt-6 pb-16">
            <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                        Login
                    </h1>
                    <p className="text-gray-600 text-sm">
                        Sign in to access protected features of the application.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleLogin}
                    className="space-y-6">
                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            placeholder="student@sciccompany.com"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                localStorage.setItem("loginEmail", e.target.value);
                            }}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            placeholder="SecurePass123!"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                localStorage.setItem("loginPassword", e.target.value); // persist
                            }}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full text-white px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition cursor-pointer
                       disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Mock Credentials Info */}
                <div className="mt-8 rounded-lg bg-gray-100 p-4 text-sm text-gray-600">
                    <p className="font-medium text-gray-700 mb-1">
                        Mock Login Credentials
                    </p>
                    <p>
                        Email: <span className="font-mono">student@sciccompany.com</span>
                    </p>
                    <p>
                        Password: <span className="font-mono">SecurePass123!</span>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Login;