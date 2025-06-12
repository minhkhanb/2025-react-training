import { MouseEvent, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { DoorClosed } from 'lucide-react';

const TodoFormDialog = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const onClose = useCallback(() => router.back(), [router]);

  const handleDialogClick = (e: MouseEvent) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 z-10 bg-black/30 flex justify-end"
      onClick={onClose}
    >
      <div
        className="flex flex-col bg-white h-full w-96 p-6 shadow-lg border-l border-gray-200"
        onClick={handleDialogClick}
      >
        <DoorClosed
          onClick={onClose}
          className="ml-auto cursor-pointer text-gray-500 hover:text-gray-700"
        />
        {children}
      </div>
    </div>
  );
};

export default TodoFormDialog;
