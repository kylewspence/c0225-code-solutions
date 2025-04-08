import { BinarySearchTree, TreeNode } from './lib/bst';

/**
 * Returns the values in the BST in numerical order, smallest to largest.
 */
export function traverse(bst: BinarySearchTree): number[] {
  return traverseRecursive(bst.root);
}

function traverseRecursive(node: TreeNode | undefined): number[] {
  if (!node) return [];

  const left = traverseRecursive(node.left);
  const current = [node.value];
  const right = traverseRecursive(node.right);

  return [...left, ...current, ...right];
}
