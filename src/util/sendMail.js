import { react } from "@babel/types"
import React from "react";
import emailjs from "emailjs-com";
import { useSelector } from "react-redux";

export function sendMail(message, email) {
  if (email != '') 
  {
    let a =  { message : message,
        toMail  : email,
        fromName: "QH-Teams"
    };
    console.log(a);
    emailjs.send('service_hnmvlcx', 'template_juis6jq',a, "user_HhLPeIjiJuO5o8K66poBz").then((result) => {
    console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
  }
}



