import React from 'react';

const Language = ({ ShowMultilanguage, setShowMultilanguage }) => {
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
      <div className='bg-white p-8 rounded shadow-lg text-center relative'>
        <svg
          focusable="false"
          aria-hidden="true"
          role="presentation"
          viewBox="0 0 24 24"
          width="24px"
          height="24px"
          onClick={() => setShowMultilanguage(!ShowMultilanguage)}
          fill='currentcolor'
          className="absolute top-4 right-4 border border-slate-500 rounded-full hover:rotate-180 transition-all duration-500 text-black cursor-pointer"
        >
          <path d="M0.585786 0.585786C1.36683 -0.195262 2.63317 -0.195262 3.41422 0.585786L12 9.17157L20.5858 0.585787C21.3668 -0.195262 22.6332 -0.195262 23.4142 0.585787C24.1953 1.36684 24.1953 2.63317 23.4142 3.41421L14.8284 12L23.4142 20.5858C24.1953 21.3668 24.1953 22.6332 23.4142 23.4142C22.6332 24.1953 21.3668 24.1953 20.5858 23.4142L12 14.8284L3.41422 23.4142C2.63317 24.1953 1.36683 24.1953 0.585786 23.4142C-0.195262 22.6332 -0.195262 21.3668 0.585786 20.5858L9.17157 12L0.585786 3.41421C-0.195262 2.63317 -0.195262 1.36683 0.585786 0.585786Z"></path>
        </svg>
        <h2 className='text-2xl font-bold mb-4'>Select Your Language</h2>
        <div className='grid grid-cols-2 gap-4'>
          <p className='hover:bg-gray-200 p-2 cursor-pointer'>Marathi</p>
          <p className='hover:bg-gray-200 p-2 cursor-pointer'>Hindi</p>
          <p className='hover:bg-gray-200 p-2 cursor-pointer'>English</p>
          <p className='hover:bg-gray-200 p-2 cursor-pointer'>Gujarati</p>
          <p className='hover:bg-gray-200 p-2 cursor-pointer'>Punjabi</p>
          <p className='hover:bg-gray-200 p-2 cursor-pointer'>Bengali</p>
          <p className='hover:bg-gray-200 p-2 cursor-pointer'>Telugu</p>
          <p className='hover:bg-gray-200 p-2 cursor-pointer'>Tamil</p>
          {/* Add more languages as needed */}
        </div>
      </div>
    </div>
  );
}

export default Language;