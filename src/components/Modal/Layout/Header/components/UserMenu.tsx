import Image from 'next/image';
import React from 'react';

const UserMenu = () => {
  return (
    <Image
      className="rounded-full aspect-square"
      src="https://res.cloudinary.com/dkopgdffv/image/upload/v1744644860/uploads/image_1744644860786_0.8171996447665082.jpg"
      alt="Todo Icon"
      width={40}
      height={40}
    />
  );
};

export default UserMenu;
