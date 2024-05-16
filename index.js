class Node {
  constructor(value) {
    this.data = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  buildTree(array) {
    if (!array.length) return null;

    let sortedArr = array.sort((a, b) => a - b);
    sortedArr = Array.from(new Set(sortedArr));

    const midIndex = Math.floor((sortedArr.length - 1) / 2);
    let mid = new Node(sortedArr[midIndex]);

    if (!this.root) this.root = mid;
    mid.left = this.buildTree(sortedArr.slice(0, midIndex));
    mid.right = this.buildTree(sortedArr.slice(midIndex + 1, sortedArr.length));

    return mid;
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }

    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false,
      );
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(value) {
    let node = this.root;
    let tmp = node;

    while (node !== null) {
      if (!node.left || !node.right) tmp = node;
      if (value > node.data) node = node.right;
      else node = node.left;
    }

    if (value > tmp.data) tmp.right = new Node(value);
    else tmp.left = new Node(value);
  }

  delete(value) {
    let node = this.root;
    let tmp = node;

    while (node.data !== value) {
      tmp = node;
      if (value > node.data) node = node.right;
      else node = node.left;
    }

    if (!node.left && !node.right) {
      if (value > tmp.data) tmp.right = null;
      else tmp.left = null;
    } else if (node.left && node.right) {
      let min = node.right;
      tmp = min;

      while (min.left || min.right) {
        tmp = min;
        if (min.left) min = min.left;
        else min = min.right;
      }

      node.data = min.data;
      tmp.left = null;
      tmp.right = null;
    } else {
      if (node.left) tmp = node.left;
      else tmp = node.right;

      node.data = tmp.data;
      node.left = tmp.left;
      node.right = tmp.right;
    }
  }

  find(value) {
    let node = this.root;

    while (node.data !== value) {
      if (value > node.data) node = node.right;
      else node = node.left;
    }

    return node;
  }

  levelOrder(callback) {
    let root = this.root;

    if (!root) return;

    let arr = [];
    let queue = [root];

    while (queue.length !== 0) {
      let length = queue.length;

      for (let i = 0; i < length; i++) {
        if (queue.length === 0) break;

        if (queue[i].left) queue.push(queue[i].left);

        if (queue[i].right) queue.push(queue[i].right);

        arr.push(queue[i]);
        if (callback !== undefined) callback(queue[i]);

        queue.shift();
        i--;
      }
    }

    return arr;
  }

  inOrder(root, callback) {
    if (!root) return;

    this.inOrder(root.left, callback);

    if (root === this.root) callback(root);

    this.inOrder(root.right, callback);

    if (root !== this.root) callback(root);
  }

  preOrder(root, callback) {
    if (!root) return;

    callback(root);

    this.preOrder(root.left, callback);
    this.preOrder(root.right, callback);
  }

  postOrder(root, callback) {
    if (!root) return;

    this.postOrder(root.left, callback);
    this.postOrder(root.right, callback);

    callback(root);
  }

  height(node, heightValue) {
    if (!node) return heightValue - 1;

    let leftVal = this.height(node.left, heightValue + 1);
    let rightVal = this.height(node.right, heightValue + 1);

    if (leftVal >= rightVal) return leftVal;
    else return rightVal;
  }

  depth(node, root, depthValue) {
    if (!root) return null;
    if (root === node) return depthValue;

    let leftVal = this.depth(node, root.left, depthValue + 1);
    let rightVal = this.depth(node, root.right, depthValue + 1);

    if (leftVal) return leftVal;
    if (rightVal) return rightVal;
  }

  isBalanced(root, height) {
    if (!root) return height - 1;

    let leftVal = this.isBalanced(root.left, height + 1);
    let rightVal = this.isBalanced(root.right, height + 1);

    if (root === this.root) {
      if (
        leftVal - rightVal === 0 ||
        leftVal - rightVal === 1 ||
        leftVal - rightVal === -1
      )
        return true;
      else return false;
    } else {
      if (leftVal >= rightVal) return leftVal;
      else return rightVal;
    }
  }

  rebalance() {
    let values = this.levelOrder().map((x) => x.data);
    console.log(values);
    this.root = null;
    this.buildTree(values);
  }
}

const tree = new Tree();
tree.buildTree([1, 3, 5]);
tree.insert(8);
tree.insert(9);
tree.insert(7);
tree.prettyPrint(tree.root);
console.log(tree.isBalanced(tree.root, 1));
tree.rebalance();
tree.prettyPrint(tree.root);
