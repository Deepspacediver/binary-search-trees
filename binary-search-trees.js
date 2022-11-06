import mergeSort from "./mergeSort.js";
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
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
      if (arr.includes(item, indexOfItem + 1)) arr.splice(indexOfItem + 1, 1);
      else return;
    });
    return this;
  }
  buildTree(arr = this.array, startArr = 0, endArr = arr.length - 1) {
    console.log({arr})
    if (startArr > endArr) return null;
    else {
      const midArr = Math.floor((startArr + endArr) / 2);
      const node = new Node(arr[midArr])
      console.log(node)
      node.left = this.buildTree(arr.slice(startArr, midArr))
      node.right = this.buildTree(arr.slice(midArr+1))
      this.root = node
      return node
    }
  }
}
let dataArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const myTree = new Tree(dataArray);
myTree.sortArray().removeDuplicates().buildTree()
console.log(myTree)

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}
console.log(prettyPrint(myTree.root)) 