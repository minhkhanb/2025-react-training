import { Input } from '@src/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function Search({ value, onChange }: SearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set('keyword', value);
    } else {
      params.delete('keyword');
    }
    router.push(`?${params.toString()}`);
    onChange(value);
  };

  return (
    <Input
      placeholder="Search all columns..."
      value={value}
      onChange={e => handleSearch(e.target.value)}
      className="max-w-sm"
    />
  );
}
