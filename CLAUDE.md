@AGENTS.md

## Component & Layout Rules

**Equal-height cards in rows:** Every card grid in this project must equalise row heights so all cards in a row match the tallest. Implementation pattern:
- The row/grid container uses alignItems: 'stretch'
- Each card component uses alignSelf: 'stretch' and fills available height with flex: 1 where needed
- Any ScrollReveal or Animated.View wrapper around a card must also stretch — never let it clip to content height
- This applies to: ResponsiveGrid, SkillsGrid, any new grid added to a case study page or landing section, and any new card type introduced (skill cards, case cards, post cards, service cards, etc.)
