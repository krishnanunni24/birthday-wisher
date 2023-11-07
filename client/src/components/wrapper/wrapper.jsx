import React from 'react';
import Navbar from '../navbar/navbar'; 
import Pagination from '../pagination/Pagination' 
import Background from './background';

const Wrapper = ({ children ,page}) => {
  return (
    <div className="bg-background inset-0 z-50 absolute overflow-hidden">
      <Background>
      <Navbar /> {/* Render Navbar component */}

      <div className="relative w-full h-full overflow-hidden">
        <Pagination page={page} /> {/* Render Pagination component */}
      </div>
      {children}
      </Background>
    </div>
  );
}

export default Wrapper;
