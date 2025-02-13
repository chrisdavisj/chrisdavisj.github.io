import React from 'react';

function ContentWrapper({ children }) {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-4xl">
        {children}
      </div>
    </div>
  );
}

export default ContentWrapper;