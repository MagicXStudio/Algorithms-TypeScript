export default class LinkedListNode<T>{
  value: LinkedListNode<T> | null;
  next: LinkedListNode<T> | null;
  constructor(value: LinkedListNode<T> | null, next: LinkedListNode<T> | null) {
    this.value = value;
    this.next = next;
  }

  toString(callback: Function) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
