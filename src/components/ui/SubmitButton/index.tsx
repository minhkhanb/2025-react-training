import Button from '../Button';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const SubmitButton = ({ children, className, ...props }: Props) => {
  return (
    <Button type="submit" className={className} {...props}>
      {children}
    </Button>
  );
};

export default SubmitButton;
