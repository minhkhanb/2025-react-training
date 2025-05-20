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

/**
 * Type definition for Ant Design icon components
 * These are forwarded ref components with specific prop requirements
 */
type IconComponent = ForwardRefExoticComponent<
  Omit<AntdIconProps, 'ref'> & RefAttributes<HTMLSpanElement>
>;

interface Props extends Omit<AntdIconProps, 'ref'> {
  iconName: string;
  className?: string | undefined;
}

/**
 * Module-level cache to store already loaded icons
 * This persists between renders to avoid redundant dynamic imports
 */
const iconCache: Record<string, IconComponent> = {};

export default function DynamicAntIcon({ iconName, ...props }: Props) {
  const [icon, setIcon] = useState<IconComponent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  /**
   * Asynchronously loads the icon component
   * 1. First checks the module cache to avoid redundant imports
   * 2. If not cached, dynamically imports the icon from Ant Design
   * 3. Updates component state based on loading result
   */
  const loadIcon = useCallback(async () => {
    setLoading(true);
    setError(false);

    // Return cached icon if available
    if (iconCache[iconName]) {
      setIcon(iconCache[iconName]);
      setLoading(false);
      return;
    }

    try {
      // Dynamic import path must match Ant Design's icon export structure
      const mod = await import(`@ant-design/icons/es/icons/${iconName}`);
      setIcon(() => mod.default);
      iconCache[iconName] = mod.default;
    } catch (err) {
      console.warn('Icon not found: ', iconName, err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [iconName]);

  // Trigger icon loading when the iconName prop changes
  useEffect(() => {
    loadIcon();
  }, [loadIcon]);

  // Render loading/error states or the actual icon
  if (loading) return <Loading className="h-8" message="" />;
  if (error) return <span className="text-red-500">Icon not found</span>;
  if (!icon) return null;

  // Use createElement instead of JSX to render the component from a variable
  // This prevents the TypeScript error with lowercase JSX elements
  return React.createElement(icon, props);
}
