function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const { length } = arr;
  const left = arr.slice(0, length / 2);
  const right = arr.slice(length / 2);

  const [a, b] = [mergeSort(left), mergeSort(right)];
  const newArr = [];

  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      newArr.push(a[i]);
      i += 1;
      j += 1;
    } else if (a[i] < b[j]) {
      newArr.push(a[i]);
      i += 1;
    } else {
      newArr.push(b[j]);
      j += 1;
    }
  }

  const aFinished = i === a.length;
  if (aFinished) {
    while (j < b.length) {
      newArr.push(b[j]);
      j += 1;
    }
  } else
    while (i < a.length) {
      newArr.push(a[i]);
      i += 1;
    }

  return newArr;
}

// const a = [5, 0, 3, 10, 2, 1, 3, 0, 1];
// console.log(mergeSort(a)); // => [0, 0, 1, 1, 2, 3, 3, 5, 10]

export default mergeSort;
