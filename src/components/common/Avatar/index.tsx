import { Button } from '@src/components/ui';
import Image, { StaticImageData } from 'next/image';

interface Props {
  text?: string;
  src: StaticImageData;
  changeable?: boolean;
  isGreyscale?: boolean;
  isAnonymized?: boolean;
  deletePhoto?: () => void;
  size?: 'small' | 'medium' | 'large';
}

const Avatar = ({ text, src, changeable }: Props) => {
  return (
    <div className="avatar-container">
      {src && changeable && <Button />}
      <Image
        className="w-12 h-12 object-contain shadow rounded-full border border-gray-950/10"
        src={src}
        alt="Avatar"
      />
      <span>{text}</span>
    </div>
  );
};

export default Avatar;
