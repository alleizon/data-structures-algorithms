/* eslint-disable max-classes-per-file */

import mergeSort from "./mergeSort.js";

class Node {
  constructor(value = null, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    const sorted = mergeSort(arr);
    if (!sorted.length) return null;

    const mid = sorted[parseInt(sorted.length / 2, 10)];
    const left = sorted.slice(0, sorted.length / 2);
    const right = sorted.slice(sorted.length / 2 + 1);

    const root = new Node(mid);
    root.left = this.buildTree(left);
    root.right = this.buildTree(right);

    return root;
  }

  insert(value) {
    // insert "value" in the tree
    let cur = this.root;

    while (cur) {
      if (cur.value === value) return "value is already in the tree";

      if (value < cur.value) {
        if (cur.left) {
          cur = cur.left;
        } else {
          const newNode = new Node(value);
          cur.left = newNode;
          return newNode;
        }
      } else if (cur.right) {
        cur = cur.right;
      } else {
        const newNode = new Node(value);
        cur.right = newNode;
        return newNode;
      }
    }
    return `didn't insert. last node: ${cur}`;
  }

  delete(target, cur = this.root) {
    // delete "target" from the tree
    const current = cur;
    if (current.value === target && target !== this.root.value) return current;

    let next = this.root;
    if (target !== this.root.value) {
      next =
        target < cur.value
          ? this.delete(target, current.left)
          : this.delete(target, current.right);
    }

    // if the "target" node has been found
    // and the current node we are visiting is exactly the
    // "target" node's parent
    if (
      next.value === target &&
      (current.left === next || current.right === next)
    ) {
      // if the "target" node has no children (leaf node),
      // set its parent's link to the target node to null
      if (!next.left && !next.right) {
        if (current.left === next) current.left = null;
        else if (current.right === next) current.right = null;

        return next;
      }
      // if the "target" node has only 1 child,
      // set its parent's link to the target node's only child
      if (next.left && !next.right) {
        if (current.left === next) current.left = next.left;
        else if (current.right === next) current.right = next.left;
        return next;
      }
      if (!next.left && next.right) {
        if (current.left === next) current.left = next.right;
        else if (current.right === next) current.right = next.right;
        return next;
      }
      // if the "target" has 2 children,
      // take the "target" node's RIGHT subtree and find the next highest value node,
      // with no LEFT subtrees
      if (next.left && next.right) {
        const nodeToDelete = next;
        const rightSubtree = nodeToDelete.right;
        if (!rightSubtree.left && !rightSubtree.right) {
          rightSubtree.left = nodeToDelete.left;
          current.left = rightSubtree;
          return next;
        }
        let leftNodeSubtree = rightSubtree.left;
        while (leftNodeSubtree.left) {
          leftNodeSubtree = leftNodeSubtree.left;
        }

        rightSubtree.left = leftNodeSubtree.right;
        leftNodeSubtree.right = rightSubtree;
        leftNodeSubtree.left = nodeToDelete.left;
        if (current.left === next) current.left = leftNodeSubtree;
        if (current.right === next) current.right = leftNodeSubtree;

        return next;
      }
    }

    // if target is level 0 root
    if (target === this.root.value) {
      const nodeToRemove = this.root;
      const rightSubtree = nodeToRemove.right;
      let leftMostNode = rightSubtree.left;
      let leftMostNodeParent = rightSubtree;
      if (!leftMostNode) {
        rightSubtree.left = this.root.left;
        this.root = rightSubtree;
        return nodeToRemove;
      }
      while (leftMostNode.left) {
        leftMostNode = leftMostNode.left;
        leftMostNodeParent = leftMostNodeParent.left;
      }
      leftMostNodeParent.left = leftMostNode.right;
      leftMostNode.right = rightSubtree;
      leftMostNode.left = this.root.left;
      this.root = leftMostNode;

      return nodeToRemove;
    }

    return next;
  }

  find(value) {
    // returns node with "value" from the tree
    let current = this.root;
    while (current) {
      if (current.value === value) return current;
      current = value < current.value ? current.left : current.right;
    }
    return `value ${value} could not be found.`;
  }

  levelOrder(callback, queue = [this.root]) {
    // traverse the tree in breadth-first level order
    // passing every node as argument to "callback"
    // iterative
    // let current = this.root;
    // const queue = [];
    // queue.push(current);
    // while (queue.length) {
    //   while (queue[0] === null) {
    //     queue.shift();
    //     [current] = queue;
    //     if (!queue.length) return;
    //   }
    //   queue.push(current.left, current.right);
    //   callback(queue[0]);
    //   queue.shift();
    //   [current] = queue;
    // }
    // recursion
    while (queue[0] === null) queue.shift();
    if (!queue.length) return null;
    const current = queue[0];
    queue.push(current.left, current.right);
    const arr = callback(current);
    queue.shift(current);
    this.levelOrder(callback, queue);

    return arr;
  }

  inorder(callback, node = this.root) {
    // traverse the tree depth-first inorder,
    // passing each node as argument to "callback"

    if (node === null) return 0;

    const current = node;

    this.inorder(callback, current.left);
    const arr = callback(current);
    this.inorder(callback, current.right);

    return arr;
  }

  preorder(callback, node = this.root) {
    // traverse the tree depth-first preorder,
    // passing each node as argument to "callback"

    if (node === null) return 0;

    const current = node;

    const arr = callback(current);
    this.preorder(callback, current.left);
    this.preorder(callback, current.right);

    return arr;
  }

  postorder(callback, node = this.root) {
    // traverse the tree depth-first postorder,
    // passing each node as argument to "callback"

    if (node === null) return 0;

    const current = node;

    this.postorder(callback, current.left);
    this.postorder(callback, current.right);
    const arr = callback(current);

    return arr;
  }

  height(node, current = this.root) {
    if (!this.root) return "empty tree";
    if (!current) return 0;

    let currentNode = current;
    // find "node"
    if (current === this.root && node !== current) {
      while (currentNode !== node) {
        if (!currentNode) return "node not found";
        currentNode =
          node.value < currentNode.value ? currentNode.left : currentNode.right;
      }
    }
    // return "node" height (longest path to a leaf node)
    return (
      1 +
      Math.max(
        this.height(node, currentNode.left),
        this.height(node, currentNode.right)
      )
    );
  }

  depth(node, current = this.root) {
    // find distance from root to "node"
    if (node === current) return 0;
    const next = node.value < current.value ? current.left : current.right;
    return 1 + this.depth(node, next);
  }

  isBalanced(subtree = this.root) {
    // return true if the tree is balanced or false otherwise
    if (!subtree) return 0;
    const leftHeight = this.height(subtree.left);
    const rightHeight = this.height(subtree.right);

    return Math.abs(leftHeight - rightHeight) < 2;
  }

  rebalance() {
    // rebalance tree
    const arr = [];
    const getArr = (node) => {
      arr.push(node.value);
    };
    this.inorder(getArr);
    this.root = this.buildTree(arr);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

export { Tree, prettyPrint };
