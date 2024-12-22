const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  _add(node, data) {
    if (node.data === data) return;

    if (data < node.data) {
      if (node.left) {
        this._add(node.left, data);
      } else {
        node.left = new Node(data);
      }
    } else {
      if (node.right) {
        this._add(node.right, data);
      } else {
        node.right = new Node(data);
      }
    }
  }

  add(data) {
    if (!this._root) return (this._root = new Node(data));

    this._add(this._root, data);
  }

  has(data) {
    return this._find(this._root, data) ? true : false;
  }

  _find(node, data) {
    if (!node) return null;

    if (node.data === data) return node;

    if (data < node.data) {
      return this._find(node.left, data);
    } else {
      return this._find(node.right, data);
    }
  }

  find(data) {
    return this._find(this._root, data);
  }

  _remove(prevNode, node, data) {
    if (!node) return;

    if (data < node.data) return this._remove(node, node.left, data);

    if (data > node.data) return this._remove(node, node.right, data);

    let replaceWithNode = null;

    if (node.right && !node.left) {
      replaceWithNode = node.right;
    }

    if (node.left && !node.right) {
      replaceWithNode = node.left;
    }

    if (node.left && node.right) {
      replaceWithNode = this._max(node.left);
      this._remove(node, node.left, replaceWithNode.data);

      replaceWithNode.left = node.left;
      replaceWithNode.right = node.right;
    }

    if (prevNode.left === node) {
      prevNode.left = replaceWithNode;
    } else {
      prevNode.right = replaceWithNode;
    }
  }

  remove(data) {
    if (!this._root) return;
    const node = new Node(0);
    node.right = this._root;

    this._remove(node, this._root, data);

    this._root = node.right;
  }

  _min(root) {
    let min = root;

    while (min.left) {
      min = min.left;
    }

    return min;
  }

  min() {
    if (!this._root) return null;

    return this._min(this._root).data;
  }

  _max(root) {
    let max = root;

    while (max.right) {
      max = max.right;
    }

    return max;
  }

  max() {
    if (!this._root) return null;

    return this._max(this._root).data;
  }
}

module.exports = {
  BinarySearchTree,
};
