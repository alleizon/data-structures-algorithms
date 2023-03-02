function fibRecursive(n) {
  if (n === 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];

  const newArr = fibRecursive(n - 1);
  newArr.push(newArr[newArr.length - 1] + newArr[newArr.length - 2]);
  return newArr;
}

console.log(fibRecursive(1));
