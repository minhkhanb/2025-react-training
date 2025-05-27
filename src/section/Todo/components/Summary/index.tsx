'use client';

export const Summary = ({
  children,
  className,
}: {
  children: () => React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={'flex justify-between bg-gray-50 p-4 text-sm text-gray-600 ' + className}>
      {children()}
    </div>
  );
};
