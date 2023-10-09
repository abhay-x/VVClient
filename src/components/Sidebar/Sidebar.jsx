import React from 'react';

const Sidebar = () => {
  return (
    <div className="fixed w-16 h-[calc(100vh-56px)] z-50 shadow">
      <div className="mt-1">
        <button className='w-full py-5 px-4'><i className="fas fa-store fa-lg"></i></button>
        <hr />
        <button className='w-full py-5 px-4'><i className="fas fa-comments fa-lg"></i></button>
        <hr />
        <button className='w-full py-5 px-4'><i className="fas fa-upload fa-lg"></i></button>
        <hr />
        <button className='w-full py-5 px-4'><i className="fas fa-trash-alt fa-lg"></i></button>
        <hr />
        <button className='w-full py-5 px-4'><i className="fas fa-heart fa-lg"></i></button>
        <hr />
        <button className='w-full py-5 px-4'><i className="fas fa-info fa-lg"></i></button>
      </div>
    </div>
  );
};

export default Sidebar;
