import { useState } from "react";

function useProvideAuth() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [name, setName] = useState(localStorage.getItem("name"));
  const [picture, setPicture] = useState(localStorage.getItem("picture"));
  const [email, setEmail] = useState(localStorage.getItem("email"));

  const userLogin = (data) => {
    console.log("🚀 ~ userLogin ~ data:", data)
    localStorage.setItem("token", data.token);
    localStorage.setItem("name", data.name);
    localStorage.setItem("picture", data.image);
    localStorage.setItem("email", data.email);
    setToken(data.token);
    setName(data.name);
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
    name,
    picture,
    email,
    userLogin,
    userLogout,
  };
}

export default useProvideAuth;
