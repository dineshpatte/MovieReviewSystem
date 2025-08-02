"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [disabled, setDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      user.name.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/signup", user);
      console.log("successfull", response.data);
      setLoading(false);
      router.push("/auth/login");
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <p className="text-white text-2xl font-bold">
        {loading ? "loading" : "Sign up"}
      </p>

      <label htmlFor="name">name</label>
      <input
        className="px-4 py-2 text-white placeholder:text-gray-300 border-2 border-blue-600"
        type="text"
        value={user.name}
        onChange={(e) => {
          setUser({ ...user, name: e.target.value });
        }}
        placeholder="enter name"
      />

      <label htmlFor="name">email</label>
      <input
        className="px-4 py-2 text-white placeholder:text-gray-300 border-2 border-blue-600"
        type="text"
        value={user.email}
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
        placeholder="enter email"
      />

      <label htmlFor="name">password</label>
      <input
        className="px-4 py-2 text-white placeholder:text-gray-300 border-2 border-blue-600"
        type="text"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
        placeholder="enter password"
      />

      <button
        className="px-4 py-2 bg-blue-600 text-white font-bold mt-4 rounded-2xl"
        onClick={onSignUp}
      >
        {" "}
        {disabled ? "No Signup" : "SIgn up"}
      </button>
    </div>
  );
};

export default page;
