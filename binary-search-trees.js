import { mergeSort, prettyPrint } from "./mergeSort.js";
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
    if (treeNode === null) {
      return new Node(valueToInsert);
    }

    if (valueToInsert < treeNode.value) {
      treeNode.left = this.insert(valueToInsert, treeNode.left);
    } else treeNode.right = this.insert(valueToInsert, treeNode.right);
    return treeNode;
  }
  findMin(root = this.root) {
    let rightTree = root.right;
    while (rightTree.left !== null) rightTree = rightTree.left;
    console.log({ rightTree });
    return rightTree;
  }
  delete(valueToDelete, root = this.root) {
    if (valueToDelete < root.value)
      root.left = this.delete(valueToDelete, root.left);
    else if (valueToDelete > root.value)
      root.right = this.delete(valueToDelete, root.right);
    // Once valueToDelete === root.value
    else {
      if (root.right === null) {
        console.log("right null", root);
        root = root.left;
      } else if (root.left === null) {
        console.log("left null", root);
        root = root.right;
      } else {
        root.value = this.findMin(root).value;
        root.right = this.delete(root.value, root.right);
      }
    }
    console.log(root);
    return root;
  }
  find(value, root = this.root) {
    while (root !== null) {
      if (value === root.value) return root;
      else if (value < root.value) root = root.left;
      else root = root.right;
    }
    return "No such value";
    // Recursive method
    /* if(root === null) return 'No such value'
    else if(value === root.value) return root
    
    if(value < root.value) return this.find(value, root.left)
    else return this.find(value, root.right) */
  }
  levelOrder(callback, root = this.root) {
    console.log(root);
    let queue = [];
    const result = [];
    queue.push(root);
    let firstInQ = queue[0];
    while (queue.length !== 0) {
      if (firstInQ.left !== null) queue.push(firstInQ.left);
      if (firstInQ.right !== null) queue.push(firstInQ.right);
      if (callback !== undefined) callback(firstInQ);
      else result.push(firstInQ.value);
      queue.shift();
      firstInQ = queue[0];
    }
    return result.length !== 0 ? result : "Callback has been provided";
  }
  preorder(callback, root = this.root) {
    if (root === null) return;
    let arr = [];
    if (callback) {
      callback(root);
      this.preorder(callback, root.left);
      this.preorder(callback, root.right);
    } else {
      arr = arr
        .concat(
          root.value,
          this.preorder(callback, root.left),
          this.preorder(callback, root.right)
        )
        .filter((el) => el !== undefined);
    }
    return arr;
  }
  inorder(callback, root = this.root) {
    if (root === null) return;
    let arr = [];
    if (callback) {
      this.inorder(callback, root.left);
      callback(root);
      this.inorder(callback, root.right);
    } else {
      console.log(root);
      arr = arr
        .concat(
          this.inorder(callback, root.left),
          root.value,
          this.inorder(callback, root.right)
        )
        .filter((el) => el !== undefined);
    }
    return arr;
  }
  postOrder(callback, root = this.root) {
    if (root === null) return;
    let arr = [];
    if (callback) {
      this.postOrder(callback, root.left),
        this.postOrder(callback, root.right),
        callback(root.value);
    } else {
      arr = arr
        .concat(
          this.postOrder(callback, root.left),
          this.postOrder(callback, root.right),
          root.value
        )
        .filter((el) => el !== undefined);
    }
    return arr;
  }
}
let dataArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const myTree = new Tree(dataArray);
myTree.sortArray().removeDuplicates().buildTree();
console.log(myTree);

console.log(prettyPrint(myTree.root));
//console.log(myTree.preorder());
/* console.log(myTree.preorder(function (el) {
    console.log(el.value, el.value * 2);
  })); */

console.log(myTree.postOrder());
