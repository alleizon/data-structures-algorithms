import { Tree, prettyPrint } from "./index.js";

const arr1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree1 = new Tree(arr1);
prettyPrint(tree1.root);

const logTreeFact = () => {
  const arr = [];
  return (node) => {
    arr.push(node.value);
    return arr;
  };
};

const preorderCB = logTreeFact();
const inorderCB = logTreeFact();
const postorderCB = logTreeFact();
const levelOrderCB = logTreeFact();

const isBalanced = tree1.isBalanced();
const level = tree1.levelOrder(levelOrderCB);
const pre = tree1.preorder(preorderCB);
const ino = tree1.inorder(inorderCB);
const post = tree1.postorder(postorderCB);

console.log(isBalanced);
console.log(`levelOrder: ${level}
preOrder: ${pre} 
inOrder: ${ino} 
postOrder: ${post}`);

const toAdd = [];

for (let i = 0; i < 10; i += 1) {
  const newN = 100 + Math.floor(Math.random() * 10);
  toAdd.push(newN);
}

toAdd.forEach((n) => {
  tree1.insert(n);
});

const preorderCB2 = logTreeFact();
const inorderCB2 = logTreeFact();
const postorderCB2 = logTreeFact();
const levelOrderCB2 = logTreeFact();

prettyPrint(tree1.root);

console.log(tree1.isBalanced());
tree1.rebalance();
console.log(tree1.isBalanced());

const level2 = tree1.levelOrder(levelOrderCB2);
const pre2 = tree1.preorder(preorderCB2);
const ino2 = tree1.inorder(inorderCB2);
const post2 = tree1.postorder(postorderCB2);

console.log(`level2: ${level2}
preOrder2: ${pre2} 
inOrder2: ${ino2} 
postOrder2: ${post2}`);
