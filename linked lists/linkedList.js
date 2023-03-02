class Node {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(value) {
    // adds a new node containing "value" to the end of the list
    if (!this.head) {
      this.head = new Node(value);
    } else {
      let cur = this.head;
      while (cur.next) {
        cur = cur.next;
      }
      const newNode = new Node(value);
      cur.next = newNode;
    }
  }

  prepend(value) {
    // adds a new node containing "value" to the start of the list
    if (!this.head) {
      this.head = new Node(value);
    } else {
      const newNode = new Node(value);
      const headCopy = this.head;
      this.head = newNode;
      newNode.next = headCopy;
    }
  }

  size() {
    // returns the total number of nodes in the list
    if (!this.head) return 0;

    let nodes = 0;
    let cur = this.head;
    while (cur) {
      nodes += 1;
      cur = cur.next;
    }
    return nodes;
  }

  tail() {
    // returns the last node in the list
    if (!this.head) return null;

    let cur = this.head;
    while (cur.next) {
      cur = cur.next;
    }
    return cur;
  }

  at(index) {
    // returns the node at the given "index"
    if (!this.head) return `index ${index} doesn't exist`;

    let i = 0;
    let cur = this.head;
    while (i !== index) {
      if (cur.next === null) {
        return `index ${index} doesn't exist`;
      }

      cur = cur.next;
      i += 1;
    }
    return cur;
  }

  pop() {
    // removes the last element from the list
    if (!this.head) return "list is empty";

    let secondLast = this.head;

    while (secondLast.next.next) {
      secondLast = secondLast.next;
    }
    const removed = secondLast.next;
    secondLast.next = null;

    return removed;
  }

  contains(value) {
    // returns true if the passed in value is in the list and otherwise returns false.
    if (!this.head) return false;

    let cur = this.head;
    while (cur) {
      if (cur.value === value) return true;
      cur = cur.next;
    }
    return false;
  }

  find(value) {
    // returns the index of the node containing value, or null if not found.
    if (!this.head) return null;

    let index = 0;
    let cur = this.head;

    while (cur) {
      if (cur.value === value) return index;
      cur = cur.next;
      index += 1;
    }

    return null;
  }

  toString() {
    // represents your LinkedList objects as strings,
    // so you can print them out and preview them in the console.
    // The format should be: ( value ) -> ( value ) -> ( value ) -> null
    if (!this.head) return "null";

    let cur = this.head;
    let string = "";
    while (cur) {
      string += `( ${cur.value} ) -> `;
      cur = cur.next;
    }
    string += "null";
    return string;
  }

  // EXTRA

  insertAt(value, index) {
    // that inserts a new node with the provided "value" at the given "index".
    if (index < 0) return "indexing starts at 0";
    if (!this.head && index !== 0) return "index range exceeded";
    if (index === 0) return this.prepend(value);

    let cur = this.head;
    let i = 0;

    while (i !== index - 1) {
      if (!cur) return "index range exceeded";
      cur = cur.next;
      i += 1;
    }

    const newNode = new Node(value);
    newNode.next = cur.next;
    cur.next = newNode;

    return newNode;
  }

  removeAt(index) {
    // that removes the node at the given "index".
    if (!this.head) return "list is empty";
    if (index === 0) {
      const removed = this.head;
      this.head = this.head.next;
      return removed;
    }

    let cur = this.head;
    let i = 0;

    while (i !== index - 1) {
      cur = cur.next;
      i += 1;
    }
    if (!cur.next) return "index range exceeded";

    const removed = cur.next;
    cur.next = cur.next.next;

    return removed;
  }
}
