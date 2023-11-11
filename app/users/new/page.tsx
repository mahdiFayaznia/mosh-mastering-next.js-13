"use client";
import { useRouter } from "next/navigation"; // important
import React from "react";

const NewUserPage = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.push("/users");
      }}
      className="btn btn-primary"
    >
      Create
    </button>
  );
};

export default NewUserPage;
