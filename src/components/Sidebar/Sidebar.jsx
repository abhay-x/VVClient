import React from 'react';

const Sidebar = () => {
  return (
    <div className="sticky w-16 h-[calc(100vh-56px)] bg-gray-800  flex flex-col items-center justify-between overflow-hidden">
      <div className="mt-1 flex-col">
        <button className='w-full py-5 px-4'><i class="fas fa-store fa-lg"></i></button>
        <hr />
        <button className='w-full py-5 px-4'><i class="fas fa-comments fa-lg"></i></button>
        <hr />
        <button className='w-full py-5 px-4'><i class="fas fa-upload fa-lg"></i></button>
        <hr />
        <button className='w-full py-5 px-4'><i class="fas fa-trash-alt fa-lg"></i></button>
        <hr />
        <button className='w-full py-5 px-4'><i class="fas fa-heart fa-lg"></i></button>
        <hr />
        <button className='w-full py-5 px-4'><i class="fas fa-info fa-lg"></i></button>
      </div>
    </div>
  );
};

export default Sidebar;
