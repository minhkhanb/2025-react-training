import { useEffect, useRef, useCallback, RefObject } from 'react';

type UseClickOutsideOptions<T extends HTMLElement> = {
  onClickOutside: (evt: PointerEvent) => void;
  enabled?: boolean;
  eventType?: keyof DocumentEventMap; // default = 'pointerdown
};

export function useClickOutside<T extends HTMLElement>({
  onClickOutside,
  enabled = true,
  eventType = 'pointerdown',
}: UseClickOutsideOptions<T>): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  const handleClickOutside = useCallback(
    (evt: Event) => {
      const el = ref.current;

      if (!enabled || !el) return;

      const target = evt.target as Node | null;
      if (target && !ref.current?.contains(target)) {
        onClickOutside(evt as PointerEvent);
      }
    },
    [enabled, onClickOutside]
  );

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener(eventType, handleClickOutside);

    return () => {
      document.removeEventListener(eventType, handleClickOutside);
    };
  }, [eventType, handleClickOutside, enabled]);

  return ref;
}
