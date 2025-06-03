import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@src/components/shadcn/ui/alert-dialog';
import { Loader2 } from 'lucide-react';

type ConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  loading?: boolean;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
};

export default function ConfirmDialog({
  isOpen,
  onClose,
  title,
  loading,
  description,
  confirmText = 'Continue',
  cancelText = 'Cancel',
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {loading ? <Loader2 strokeWidth={1.5} className="animate-spin" /> : confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
