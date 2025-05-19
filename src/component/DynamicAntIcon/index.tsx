'use client';

import { ForwardRefExoticComponent, RefAttributes, useEffect, useState } from 'react';
import Loading from '../Loading';
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';

interface Props {
  iconName: string;
  className?: string | undefined;
}

export default function DynamicAntIcon({ iconName, className }: Props) {
  const [Icon, setIcon] = useState<ForwardRefExoticComponent<
    Omit<AntdIconProps, 'ref'> & RefAttributes<HTMLSpanElement>
  > | null>(null);

  useEffect(() => {
    const loadIcon = async () => {
      try {
        const mod = await import(`@ant-design/icons/es/icons/${iconName}`);
        setIcon(() => mod.default);
      } catch (err) {
        console.warn(`icon not found: ${iconName}`, err);
      }
    };

    loadIcon();
  }, [iconName]);

  if (!Icon) return <Loading className="h-8" message="" />;

  return <Icon className={className} />;
}
