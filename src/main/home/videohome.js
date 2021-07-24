import React from "react";


const Videohome = () => {
  return (

    <video autoplay = 'autoplay' muted="muted" loop='loop' style={{
        position: 'fixed',
        zindex: -1,
        left: '0',
        width: '100%' , 
    }}>
        <source src='/qh.mp4' type="video/mp4"/>
      
    </video>
   
  );
};

export default Videohome;
