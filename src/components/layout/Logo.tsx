import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
    return (
        <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
                <div className="text-3xl font-bold metallic-text tracking-tighter">
                    DB
                </div>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-silver-primary to-transparent"></div>
            </div>
        </Link>
    );
};

export default Logo;
