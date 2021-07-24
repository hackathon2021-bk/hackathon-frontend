import { react } from "@babel/types"
import React from "react";
import emailjs from "emailjs-com";

export function sendMail(message) {
  let a =  { message : message,
      toMail  : "anhduy0911@gmail.com",
      fromName: "QH-Teams"
  }
  emailjs.send('service_x883o2h', 'template_0bz0vro',a, "user_hmmOGGs1pazTzIfpQ0mfx").then((result) => {
  console.log(result.text);
  }, (error) => {
      console.log(error.text);
  });
}



