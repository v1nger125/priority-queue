class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.right = null;
		this.left = null;
	}

	appendChild(node) {
		if (this.left == null) {
			this.left = node;
			node.parent = this;
		}
		else if (this.right == null) {
			this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if (this.right == node) {
			this.right.parent = null;
			this.right = null;
		}
		else if (this.left == node) {
			this.left.parent = null;
			this.left = null;
		}
		else throw new Error("Passed node it's not a child");
	}

	remove() {
		if (this.parent != null) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent != null){
			if (this.parent.parent != null){
				if (this.parent.parent.left == this.parent) {
					this.parent.parent.left = this;
				}
				else if (this.parent.parent.right == this.parent) {
					this.parent.parent.right = this;
				}
			}
			let buf;
			if (this.parent.left == this) {
				this.parent.left = this.left;
				if (this.left != null) this.left.parent = this.parent;
				this.left = this.parent;
				this.parent = this.left.parent;
				this.left.parent = this;
				buf = this.right;
				this.right = this.left.right;
				if (this.right != null) this.right.parent = this;
				this.left.right = buf;
				if (this.left.right != null) this.left.right.parent = this.left;
			}
			else if (this.parent.right == this) {
				this.parent.right = this.right;
				if (this.right != null) this.right.parent = this.parent;
				this.right = this.parent;
				this.parent = this.right.parent;
				this.right.parent = this;
				buf = this.left;
				this.left = this.right.left;
				if (this.left != null) this.left.parent = this;
				this.right.left = buf;
				if (this.right.left != null) this.right.left.parent = this.right;
			}
		}
	}
}

module.exports = Node;
