import { Children, cloneElement, isValidElement, type ReactNode } from 'react';
import { type StyleProp, View, type ViewStyle } from 'react-native';

import { type ResponsiveValue, useResponsiveValue } from '@/src/hooks/useResponsiveValue';

interface ResponsiveGridProps {
  /** Column count, per breakpoint, e.g. `{ mobile: 1, tablet: 2, desktop: 3 }`. */
  columns: ResponsiveValue<number>;
  /** Gutter between cells, in px. */
  gap?: number;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Fill style injected into every grid child so it stretches to its cell's
 * height. `flexGrow` (not `flex: 1`) is deliberate — `flex: 1` zeroes the
 * flex-basis, which would collapse every cell's content height and leave the
 * row with nothing to size against. `flexGrow` keeps the content-based basis,
 * so the row still measures the tallest card and shorter cards grow to match.
 */
const CELL_FILL: ViewStyle = { flexGrow: 1, alignSelf: 'stretch' };

/**
 * A wrapping grid that reflows by breakpoint. Each child sits in a
 * percentage-width cell with inner padding for the gutter — robust with
 * `flex-wrap` (mixing %-widths with margins is not).
 *
 * Cells in a row are stretched to the tallest one (`alignItems: 'stretch'`),
 * and each child is told to fill its cell — so every card in a row ends up
 * the same height regardless of its own content.
 */
export function ResponsiveGrid({ columns, gap = 14, children, style }: ResponsiveGridProps) {
  const cols = useResponsiveValue(columns);
  const items = Children.toArray(children);
  const half = gap / 2;

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'stretch',
          marginHorizontal: -half,
        },
        style,
      ]}>
      {items.map((child, i) => (
        <View
          key={i}
          style={{ width: `${100 / cols}%`, padding: half, alignItems: 'stretch' }}>
          {isValidElement<{ style?: StyleProp<ViewStyle> }>(child)
            ? cloneElement(child, { style: [child.props.style, CELL_FILL] })
            : child}
        </View>
      ))}
    </View>
  );
}
