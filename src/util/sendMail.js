import { react } from "@babel/types"
import React from "react";
import emailjs from "emailjs-com";

function ContactUs() {
            a =  {
              message : "hello hello",
              toMail  : "quocvietpt98@gmail.com",
              fromName: "QH-Teams"
            }

              emailjs.send('service_x883o2h', 'template_0bz0vro',a, "user_hmmOGGs1pazTzIfpQ0mfx").then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });

  }


