class TreeNode {
  public value: number;
  public left: TreeNode | null = null;
  public right: TreeNode | null = null;

  constructor(value: number) {
    this.value = value;
  }
}

class BinarySearchTree {
  private root: TreeNode | null = null;

  public insert(value: number): void {
    const newNode = new TreeNode(value);
    if (this.root === null) {
      this.root = newNode;
      return;
    }
    this._insertNode(this.root, newNode);
  }

  private _insertNode(node: TreeNode, newNode: TreeNode): void {
    if (newNode.value < node.value) {
      if (node.left === null) node.left = newNode;
      else this._insertNode(node.left, newNode);
    } else if (newNode.value > node.value) {
      if (node.right === null) node.right = newNode;
      else this._insertNode(node.right, newNode);
    }
  }

  public search(value: number): boolean {
    return this._searchNode(this.root, value);
  }

  private _searchNode(node: TreeNode | null, value: number): boolean {
    if (node === null) return false;
    if (value === node.value) return true;
    return this._searchNode(value < node.value ? node.left : node.right, value);
  }

  public delete(value: number): void {
    this.root = this._deleteNode(this.root, value);
  }

  private _deleteNode(node: TreeNode | null, value: number): TreeNode | null {
    if (node === null) return null;

    if (value < node.value) {
      node.left = this._deleteNode(node.left, value);
    } else if (value > node.value) {
      node.right = this._deleteNode(node.right, value);
    } else {
      if (node.left === null && node.right === null) return null;
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      const minRightNode = node.right;
      const minValue = this._findMin(minRightNode).value;
      node.value = minValue;
      node.right = this._deleteNode(node.right, minValue);
    }
    return node;
  }

  private _findMin(node: TreeNode): TreeNode {
    let current: TreeNode = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  public update(oldValue: number, newValue: number): boolean {
    if (!this.search(oldValue)) return false;
    this.delete(oldValue);
    this.insert(newValue);
    return true;
  }

  public getHeight(): number {
    return this._getHeight(this.root);
  }

  private _getHeight(node: TreeNode | null): number {
    if (node === null) return 0;
    const leftH = this._getHeight(node.left);
    const rightH = this._getHeight(node.right);
    return 1 + Math.max(leftH, rightH);
  }
}