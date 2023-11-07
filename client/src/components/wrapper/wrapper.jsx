import React from 'react';
import Navbar from '../navbar/navbar'; 
import Pagination from '../pagination/Pagination' 

const Wrapper = ({ children ,page}) => {
  return (
    <div className="bg-background inset-0 z-10 absolute overflow-hidden">
      <Navbar /> {/* Render Navbar component */}
      <div className="relative w-full h-full overflow-hidden">
        <Pagination page={page} /> {/* Render Pagination component */}
      </div>
      {children}
    </div>
  );
}

export default Wrapper;
