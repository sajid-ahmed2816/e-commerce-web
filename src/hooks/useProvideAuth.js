import { useState } from "react";

function useProvideAuth() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [name, setName] = useState(localStorage.getItem("name"));
  const [firstName, setFirstName] = useState(localStorage.getItem("firstName"));
  const [lastName, setLastName] = useState(localStorage.getItem("lastName"));
  const [picture, setPicture] = useState(localStorage.getItem("picture"));
  const [email, setEmail] = useState(localStorage.getItem("email"));

  const userLogin = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data._id);
    localStorage.setItem("name", `${data.firstName} ${data.lastName}`);
    localStorage.setItem("firstName", data.firstName);
    localStorage.setItem("lastName", data.lastName);
    localStorage.setItem("picture", data.image);
    localStorage.setItem("email", data.email);
    setToken(data.token);
    setUserId(data._id);
    setName(`${data.firstName} ${data.lastName}`);
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setPicture(data.image);
    setEmail(data.email);
  };

  const userLogout = async () => {
    setToken(null);
    setName(null);
    setPicture(null);
    setEmail(null);
    localStorage.clear();
  };

  return {
    token,
    userId,
    name,
    firstName,
    lastName,
    picture,
    email,
    userLogin,
    userLogout,
  };
}

export default useProvideAuth;
