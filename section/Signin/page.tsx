import Image from "next/image";
import React from "react";

const SignIn = () => {
  return (
    <div className="flex items-center justify-center gap-5">
      <div className="w-lg aspect-square relative">
        <Image
          className="object-cover"
          fill
          alt="Authentication Image"
          src="/authentication.png"
        />
      </div>
    </div>
  );
};

export default SignIn;
