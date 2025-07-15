export function promedio(ratings: { rating: number }[]): number {
  if (!ratings || ratings.length === 0) return 0;
  const total = ratings.reduce((sum, r) => sum + r.rating, 0);
  return total / ratings.length;
}