const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this._size = 0;
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if (this.root){
			let detached = this.detachRoot();
			this.restoreRootFromLastInsertedNode(detached);
			this.shiftNodeDown(this.root);
			if (detached == this.root) this.root = null;
			return detached.data;
		}
	}

	detachRoot() {
		let detached = this.root;
		this.root = null;
		const index = this.parentNodes.indexOf(detached);
		if (index != -1) this.parentNodes.splice(index,1);
		this._size--;
		return detached;
	}

	restoreRootFromLastInsertedNode(detached) {
		let lastNode = this.parentNodes.pop();
		if(!lastNode) lastNode = detached;
		this.root = lastNode;
		if (lastNode == detached || lastNode.parent == detached) this.parentNodes.unshift(lastNode);
		else if (lastNode.parent && lastNode.parent.right == lastNode) this.parentNodes.unshift(lastNode.parent);
		lastNode.remove();
		lastNode.left = detached.left;
		if (detached.left) detached.left.parent = lastNode;
		lastNode.right = detached.right;
		if (detached.right) detached.right.parent = lastNode;
	}

	size() {
		return this._size;
	}

	isEmpty() {
		return !Boolean(this.root);
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this._size = 0;
	}

	insertNode(node) {
		if (this.root == null) {
			this.root = node;
			this.parentNodes.push(node);
			this._size++;
		}
		else {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			if (this.parentNodes[0].right && this.parentNodes[0].left) this.parentNodes.shift();
			this._size++;
		}
	}

	shiftNodeUp(node) {
		if (node.parent) {
			if (node.priority > node.parent.priority) {
				let index = this.parentNodes.indexOf(node);
				let parentIndex = this.parentNodes.indexOf(node.parent);
				if (index != -1) {
					if(parentIndex != -1){
						[this.parentNodes[index], this.parentNodes[parentIndex]] = [node.parent, node];
					}
					else {
						this.parentNodes[index] = node.parent;
					}
				}
				node.swapWithParent();
				this.shiftNodeUp(node);
			}
		}
		else {
			this.root = node;
		}
	}

	shiftNodeDown(node) {
		let higher;
		if(node.left && node.right) {
			higher = node.left.priority > node.right.priority ? node.left : node.right;
		}
		else {
			higher = node.left;
		}
		if(higher && higher.priority > node.priority) {
			if (node == this.root) {
				this.root = higher;
			}
			let index = this.parentNodes.indexOf(node);
			let childIndex = this.parentNodes.indexOf(higher);
			if (childIndex != -1) {
				if (index != -1) {
					[this.parentNodes[index], this.parentNodes[childIndex]] = [higher, node];
				}
				else {
					this.parentNodes[childIndex] = node;
				}
			}
			higher.swapWithParent();
			this.shiftNodeDown(node);
		}
	}
}

module.exports = MaxHeap;
