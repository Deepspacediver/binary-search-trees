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
    if (startArr > endArr) return null;

    const midArr = Math.floor((startArr + endArr) / 2);
    const node = new Node(arr[midArr]);
    node.left = this.buildTree(arr.slice(startArr, midArr));
    node.right = this.buildTree(arr.slice(midArr + 1));
    this.root = node;
    return node;
  }

  insert(valueToInsert, treeNode = this.root) {
    if (treeNode === null) return new Node(valueToInsert);
    
    if (valueToInsert < treeNode.value) {
      treeNode.left = this.insert(valueToInsert, treeNode.left);
    } else treeNode.right = this.insert(valueToInsert, treeNode.right);
    console.log(treeNode);
    return treeNode;
  }
}
let dataArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const myTree = new Tree(dataArray);
myTree.sortArray().removeDuplicates().buildTree();
myTree.insert(0);
myTree.insert(-1);
console.log(myTree);
