import axios from 'axios';
import {protectedAxios, publicAxios} from './axios';

export const authCodeUser = async (nameUser, phoneNumber,
    lastName,
    firstName,
    password,
    email,
    identificacion,
    addres,
    country,
    dateBirth,
    sex) => {
    let data = [];
     await publicAxios
      .post("/users/authcode", nameUser, phoneNumber,
        lastName,
        firstName,
        password,
        email,
        identificacion,
        addres,
        country,
        dateBirth,
        sex,{
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        //console.log(response.data);
        data.push(response.data);
      })
      .catch(function (error) {
        //console.log(error);
      });
    return data;
  };
  

