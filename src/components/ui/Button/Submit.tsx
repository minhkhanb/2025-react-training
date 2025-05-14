import React, { FunctionComponent } from 'react';
import Button from '@src/components/ui/Button';
import { cn } from '@src/utils/cn';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  submitting?: boolean;
  dirty?: boolean;
  dirtyText?: string;
  cleanText?: string;
  hideOnClean?: boolean;
  formId?: string;
  inverted?: boolean;
  button?: FunctionComponent;
}

const Submit: FunctionComponent<ButtonProps> = ({
  cleanText,
  dirtyText,
  hideOnClean,
  submitting,
  dirty,
  disabled,
  formId,
  button = Button.BlueRounded,
  ...props
}) => {
  const cleanTxt = cleanText || props.children || 'Close';
  const dirtyTxt = dirtyText || props.children || 'Save';

  let holdSpace = dirtyTxt;

  if (cleanText?.length ?? 0 > (dirtyText?.length ?? 0)) {
    holdSpace = cleanTxt;
  }
  const Btn = button;

  return (
    <Btn
      {...props}
      className={cn(
        'duration-200 transition-all flex-col relative',
        props.className,
        'min-w-[8rem] whitespace-nowrap px-4',
        hideOnClean && !dirty && !submitting ? 'invisible' : 'visible'
      )}
      type="submit"
      form={formId}
      disabled={disabled || submitting}
      data-txt={`${submitting}-${dirty}-${holdSpace}`}
    >
      <>
        <div
          className={cn('inline-flex m-auto relative h-0', !submitting && !dirty ? '' : 'hidden')}
        >
          {cleanTxt}
        </div>

        <div
          className={cn('inline-flex m-auto relative h-0', !submitting && dirty ? '' : 'hidden')}
        >
          {dirtyTxt}
        </div>

        <div className={cn('absolute h-1/2 m-auto', submitting ? 'visible' : 'invisible h-0')}>
          Spinner
        </div>

        <div className="inline-flex invisible">{holdSpace}</div>
      </>
    </Btn>
  );
};

export default Submit;
