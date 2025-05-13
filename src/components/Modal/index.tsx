import { useClickOutside } from '@src/composables/useClickOutside';
import { cn } from '@src/utils/cn';
import { useEffect, useState } from 'react';

interface Props {
  title?: string;
  visible: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
}

const Modal = ({ title, visible, onClose, children }: Props) => {
  const [shouldRender, setShouldRender] = useState(visible);
  const [animate, setAnimate] = useState<string>('');

  const ref = useClickOutside<HTMLDivElement>({
    onClickOutside: onClose,
    enabled: shouldRender,
  });

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      setAnimate('fade-in');
    } else {
      setAnimate('fade-out');
      setTimeout(() => setShouldRender(false), 500);
    }
  }, [visible]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed top-0 left-0 flex flex-col items-center justify-center w-full h-full ',
        'bg-[rgba(0,0,0,0.4)] z-50 transition-all duration-500 ',
        `animate-${animate}-overlay`
      )}
    >
      <div
        ref={ref}
        className={cn(
          'rounded-sm p-5 gap-2 flex flex-col bg-white w-lg shadow ',
          `animate-${animate}`
        )}
      >
        <button
          onClick={onClose}
          className="text-lg absolute right-5 top-5 text-gray-400 cursor-pointer fa-solid fa-xmark"
        />
        <h3 className="text-lg font-medium w-full">{title}</h3>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
