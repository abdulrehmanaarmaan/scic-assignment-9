import React from 'react';

const Footer = () => {
    return (
        <footer className="border-t border-gray-200 bg-white">
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-500">
                    © {new Date().getFullYear()} ProductHub. All rights reserved.
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Built with Next.js</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Mock Authentication</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;