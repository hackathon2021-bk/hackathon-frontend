import React from "react";


const Videohome = () => {
  return (
    <div width="100%"  >
         <video autoplay = 'autoplay' muted="muted" loop='loop' style={{
            position: 'fixed',
            zindex: "1",
            left: '0' ,
            width:"98.9%", 
        }}>
        <source src='/qh.mp4' type="video/mp4"/>
      
    </video> 

    </div>
   
   
  );
};

export default Videohome;
