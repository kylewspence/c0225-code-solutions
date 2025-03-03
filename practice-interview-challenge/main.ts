function getRangeReport(start: number, end: number): any {
  let totalNum = 0;
  const oddsArray = [];
  const evensArray = [];
  const allNum = [];
  for (let i = start; i <= end; i++) {
    totalNum += i;
    if (i % 2 !== 0) {
      oddsArray.push(i);
    }
    if (i % 2 === 0) {
      evensArray.push(i);
    }
    if (i) {
      allNum.push(i);
    }
  }
  const averageNum = totalNum / (end - start + 1);
  const object = {
    total: totalNum,
    odds: oddsArray,
    evens: evensArray,
    numbers: allNum,
    average: averageNum,
  };
  return object;
}
console.log(getRangeReport(10, 50));
