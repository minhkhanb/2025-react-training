import React, { ChangeEvent } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@src/components/shadcn/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@src/components/shadcn/ui/command';
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@src/components/shadcn/ui/button';
import { cn } from '@src/utils';

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  inputRef?: React.Ref<HTMLButtonElement>;
  value?: string;
  options: DropdownOption[];
  onChange?: (evt: ChangeEvent<HTMLButtonElement>) => void;
  placeholder?: string;
}

const Dropdown = ({
  inputRef,
  value,
  options,
  placeholder = 'Select an option',
  ...props
}: DropdownProps) => {
  const [open, setOpen] = React.useState(false);

  const onChange = (selectedValue: string) => {
    props.onChange?.({ target: { value: selectedValue } } as ChangeEvent<HTMLButtonElement>);

    setOpen(false);
  };

  const selectedOption = options.find(option => option.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger ref={inputRef} asChild>
        <Button variant="outline" className="w-full justify-between" {...props}>
          <span
            className={cn('font-normal', selectedOption ? 'text-gray-900' : 'text-gray-900/40')}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>

          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[var(--radix-popper-anchor-width)] p-0 rounded-md bg-white shadow-lg">
        <Command>
          <CommandList>
            <CommandEmpty>No item found</CommandEmpty>
            <CommandGroup>
              {options.map(option => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={onChange}
                  onChange={event => console.log('PDebug change: ', event)}
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Dropdown;
