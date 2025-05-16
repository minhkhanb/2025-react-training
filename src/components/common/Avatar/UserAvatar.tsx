import React from 'react';
import Avatar from '@src/components/common/Avatar/index';
import { StaticImageData } from 'next/image';

interface Props {
  size?: 'small' | 'medium' | 'large';
  photo?: StaticImageData;
}

const UserAvatar = ({ size = 'small', photo }: Props) => {
  return <Avatar size={size} src={photo} />;
};

export default UserAvatar;
