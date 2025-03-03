function getRangeReport(start: number, end: number): any {
  let totalNum = 0;
  const oddsArray = [];
  const evensArray = [];
  const rangeArray = [];

  for (let i = start; i <= end; i++) {
    totalNum += i;
    if (i % 2 !== 0) {
      oddsArray.push(i);
    }
    if (i % 2 === 0) {
      evensArray.push(i);
    }
    if (i) {
      rangeArray.push(i);
    }
  }

  const averageNum = totalNum / (end - start + 1);
  const report = {
    total: totalNum,
    odds: oddsArray,
    evens: evensArray,
    range: rangeArray,
    average: averageNum,
  };
  return report;
}

console.log(getRangeReport(1, 10));
