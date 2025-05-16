import React from 'react';

interface Props {
  label?: string;
  className?: string;
  onChange?: () => void;
  checked?: boolean;
  showLabel?: boolean;
}

const CheckBox = ({
  onChange,
  label = '',
  checked = false,
  showLabel = true,
  className,
}: Props) => {
  return (
    <label className="text-sm flex items-center gap-2">
      <input
        type="checkbox"
        name="gender"
        className={className}
        checked={checked}
        onChange={onChange}
      />
      {showLabel && label}
    </label>
  );
};

export default CheckBox;
