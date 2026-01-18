"use client"

import Cookies from 'js-cookie';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Navbar = () => {

    const pathname = usePathname();
    const router = useRouter();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [mounted, setMounted] = useState(false); // to avoid SSR mismatch

    queueMicrotask(() => {
        if (savedEmail) setEmail(savedEmail);
        if (savedPassword) setPassword(savedPassword);
    });

    useEffect(() => {
        queueMicrotask(() => {
            setMounted(true);
        })
    }, []);

    useEffect(() => {
        const auth = Cookies.get("auth") === "true";
        queueMicrotask(() => {
            setIsAuthenticated(auth);
        })
    }, [pathname]);

    const handleLogout = () => {
        Cookies.remove("auth");
        toast.success("Logged out successfully");
        router.replace("/login");
    };

    const linkClass = (path) =>
        `text-sm font-medium transition ${pathname === path
            ? "text-blue-600"
            : "text-gray-700 hover:text-blue-600"
        }`;

    if (!mounted) return null;

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo / Brand */}
                <Link href="/" className="text-xl font-semibold text-gray-900">
                    ProductHub
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-6">
                    <Link href="/products-list" className={linkClass("/products-list")}>
                        Products
                    </Link>

                    {!isAuthenticated ? (
                        <Link href="/login" className={linkClass("/login")}>
                            Login
                        </Link>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="text-sm font-medium text-gray-700 hover:text-red-600 transition cursor-pointer"
                        >
                            Logout
                        </button>
                    )}
                </nav>
            </div>
        </nav>
    );
};

export default Navbar;