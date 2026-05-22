/**
 * Cross-navigation hint. When a case-study screen sends the user back, it
 * records which landing section they should land on, so the landing page can
 * scroll there on mount instead of resetting to the top.
 */
export const navMemory: { returnSection: string | null } = { returnSection: null };
