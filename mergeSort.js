const merge = (arrLeft, arrRight) => {
  let [i, j] = [0, 0];
  let returnArr = [];
  while (i < arrLeft.length && j < arrRight.length) {
    arrLeft[i] < arrRight[j]
      ? (returnArr.push(arrLeft[i]), i++)
      : (returnArr.push(arrRight[j]), j++);
  }

  while (arrLeft[i]) {
    returnArr.push(arrLeft[i]);
    i++;
  }
  while (arrRight[j]) {
    returnArr.push(arrRight[j]);
    j++;
  }

  return returnArr;
};

const mergeSort = (arr, arrLow = 0, arrHigh = arr.length) => {
  if (arr.length < 2) return arr;
  let arrMid = Math.ceil((arrLow + arrHigh) / 2);
  let leftArr = mergeSort(arr.slice(arrLow, arrMid));
  let rightArr = mergeSort(arr.slice(arrMid));
  // console.log({ leftArr, rightArr });
  return merge(leftArr, rightArr);
};

export default mergeSort
/* console.log(mixedArray.slice(0,mergeSort(mixedArray)))
console.log(mixedArray.slice(mergeSort(mixedArray))) */
