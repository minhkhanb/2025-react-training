import { Input } from '@src/components/ui/input';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function Search({ value, onChange }: SearchProps) {
  return (
    <Input
      placeholder="Tìm kiếm tất cả cột..."
      value={value}
      onChange={e => onChange(e.target.value)}
      className="max-w-sm"
    />
  );
}
