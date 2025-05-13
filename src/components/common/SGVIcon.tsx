import React from 'react';

interface Props {
  className?: string;
  icon: string;
  style?: any;
  icon2?: string;
  onClick?: () => void;
}

const SVGIcon = ({ className, icon, style, onClick, icon2 }: Props) => {
  return (
    <svg
      onClick={onClick}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={`${className}`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
      {icon2 && <path strokeLinecap="round" strokeLinejoin="round" d={icon2} />}
    </svg>
  );
};

export default SVGIcon;
