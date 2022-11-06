import mergeSort from "./mergeSort.js";
class Node {
  constructor(value, leftChild, rightChild) {
    this.value = value;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }
}

class Tree {
  constructor(array, root) {
    this.array = array;
    this.root = root;
  }
  sortArray() {
    this.array = mergeSort(this.array);
    return this;
  }
  removeDuplicates(arr = this.array) {
    arr.forEach((item) => {
      let indexOfItem = arr.findIndex((element) => element === item);
      if (arr.includes(item, indexOfItem+1)) arr.splice(indexOfItem+1, 1);
      else return
    });
    return this
  }
  buildTree() {}
}
let dataArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const myTree = new Tree(dataArray);
myTree.sortArray().removeDuplicates()
console.log(myTree)