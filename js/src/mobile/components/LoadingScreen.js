import React from 'react';

export const LoadingScreen = () => (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-900">
        <div className="text-2xl font-bold text-white mb-4">Kairos App</div>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
    </div>
);
