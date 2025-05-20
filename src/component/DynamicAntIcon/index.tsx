'use client';

import React, {
  ForwardRefExoticComponent,
  RefAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Loading from '../Loading';
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';

type IconComponent = ForwardRefExoticComponent<
  Omit<AntdIconProps, 'ref'> & RefAttributes<HTMLSpanElement>
>;

interface Props extends Omit<AntdIconProps, 'ref'> {
  iconName: string;
  className?: string | undefined;
}

const iconCache: Record<string, IconComponent> = {};

export default function DynamicAntIcon({ iconName, ...props }: Props) {
  const [icon, setIcon] = useState<IconComponent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const loadIcon = useCallback(async () => {
    setLoading(true);
    setError(false);

    if (iconCache[iconName]) {
      setIcon(iconCache[iconName]);
      setLoading(false);
      return;
    }

    try {
      const mod = await import(`@ant-design/icons/es/icons/${iconName}`);
      setIcon(() => mod.default);
    } catch (err) {
      console.warn('Icon not found: ', iconName, err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [iconName]);

  useEffect(() => {
    loadIcon();
  }, [loadIcon]);

  if (loading) return <Loading className="h-8" message="" />;
  if (error) return <span className="text-red-500">Icon not found</span>;
  if (!icon) return null;

  return React.createElement(icon, props);
}
