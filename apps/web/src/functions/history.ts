export function history(posts: { date: Date; active: boolean }[]): {month: number; year: number; count: number}[] {
  // NOTE: TEST FILE REQUIRES 1)MONTH 2)YEAR 3)COUNT - RETURN MUST REFLECT
  
  // Implement per specification
  // Return the ordered list of "month, year" strings sorted from most recent to oldes
  // consider only active posts

  return posts
    .filter((p) => p.active)
    .sort((d1, d2) => d2.date.valueOf() - d1.date.valueOf())
    .reduce((accumulator, post) => {
      const month = post.date.getMonth() + 1;
      //1-12 NOT 0-11 indexx
      const year = post.date.getFullYear();
      const found = accumulator.find((item) => item.month === month && item.year === year);
      if (found) {
        found.count++;
      } else {
        accumulator.push({ month, year, count: 1 });
      }
      return accumulator;
    }, [] as {month: number; year: number; count: number}[]);
    //Logic took from sample code at categories
}
