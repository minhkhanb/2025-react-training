import { Input } from '@src/components/shadcn/ui/input';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useCallback, useRef } from 'react';

interface SearchProps {
  value: string;
  onChange?: (value: string) => void;
}

export function Search({ value, onChange }: SearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const updateUrlParams = useCallback(
    (searchValue: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchValue.trim()) {
        params.set('keyword', searchValue);
      } else {
        params.delete('keyword');
      }

      params.delete('page');
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, searchParams, router]
  );

  const handleSearch = (newValue: string) => {
    onChange?.(newValue);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      updateUrlParams(newValue);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <Input
      placeholder="Search all columns..."
      value={value}
      onChange={e => handleSearch(e.target.value)}
      className="max-w-sm"
    />
  );
}
