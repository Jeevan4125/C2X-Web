/**
 * Estimates reading time in whole minutes from a word count,
 * assuming an average adult reading speed of ~200 wpm.
 */
export const estimateReadingTime = (wordCount: number): number => {
  return Math.max(1, Math.round(wordCount / 200));
};
