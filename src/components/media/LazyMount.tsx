import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Platform, View, type StyleProp, type ViewStyle } from 'react-native';

interface LazyMountProps {
  children: ReactNode;
  /** When true, render immediately (above-the-fold). */
  disabled?: boolean;
  /** Pixels of pre-load margin around the viewport. */
  rootMargin?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Mounts `children` only when the wrapper enters (or is near) the viewport.
 * Web: uses IntersectionObserver. Native: no-op pass-through.
 * The wrapper holds the layout box (so the slot reserves space before mount).
 * Above-the-fold media should pass `disabled` so it loads immediately.
 */
export function LazyMount({
  children,
  disabled = false,
  rootMargin = '300px',
  style,
}: LazyMountProps) {
  const [visible, setVisible] = useState(disabled || Platform.OS !== 'web');
  const hostRef = useRef<View | null>(null);

  useEffect(() => {
    if (disabled || visible || Platform.OS !== 'web') return;
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const node = hostRef.current as unknown as Element | null;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            return;
          }
        }
      },
      { rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [disabled, rootMargin, visible]);

  return (
    <View ref={hostRef} style={style} collapsable={false}>
      {visible ? children : null}
    </View>
  );
}
