import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@src/components/shadcn/ui/dialog';
import { PhotoData } from '@src/app/orders/photo/[photoId]/page';
import PhotoDisplay from '@src/app/orders/photo/[photoId]/PhotoDisplay';

type Props = {
  params: Promise<{
    photoId: string;
  }>;
};

export default async function Photo({ params }: Props) {
  const { photoId } = await params;
  const response = await fetch(`http://localhost:3500/api/courses/${photoId}`, {
    cache: 'no-store',
  });

  const photoData: PhotoData = await response.json();

  if (!photoData?.id) {
    return <h1 className="text-center">No Photo Found for that ID.</h1>;
  }

  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </DialogDescription>
          <PhotoDisplay photoData={photoData} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
