import Image from 'next/image';
import React from 'react';

const Loading = () => {
  return <Image src={'/spinner.gif'} alt="Loading" width={150} height={150} />;
};

export default Loading;
