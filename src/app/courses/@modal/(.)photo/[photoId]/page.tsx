import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@src/components/shadcn/ui/dialog';
import { PhotoData } from '@src/app/courses/photo/[photoId]/page';
import PhotoDisplay from '@src/app/courses/photo/[photoId]/PhotoDisplay';

type Props = {
  params: {
    photoId: string;
  };
};

export default async function Photo({ params: { photoId } }: Props) {
  const response = await fetch(`http://localhost:3500/images/${photoId}`, { cache: 'no-store' });

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
