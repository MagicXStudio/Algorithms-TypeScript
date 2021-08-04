import LinkedList from '../linked-list/LinkedList';
import LinkedListNode from '../linked-list/LinkedListNode';

type Keys = {
  [key: string]: number;

};

// Hash table size directly affects on the number of collisions.
// The bigger the hash table size the less collisions you'll get.
// For demonstrating purposes hash table size is small to show how collisions
// are being handled.
const defaultHashTableSize = 32;

export default class HashTable<T> {
  /**
   * @param {number} hashTableSize
   */
  buckets: Array<LinkedList<T>>;
  keys: Keys;
  constructor(hashTableSize: number = defaultHashTableSize) {
    // Create hash table of certain size and fill each bucket with empty linked list.
    this.buckets = Array(hashTableSize).fill(null).map(() => new LinkedList((x: number, y: number) => { return x >= y; }));

    // Just to keep track of all actual keys in a fast way.
    this.keys = {};
  }

  /**
   * Converts key string to hash number.
   *
   * @param {string} key
   * @return {number}
   */
  hash(key: string): number {
    // For simplicity reasons we will just use character codes sum of all characters of the key
    // to calculate the hash.
    //
    // But you may also use more sophisticated approaches like polynomial string hash to reduce the
    // number of collisions:
    //
    // hash = charCodeAt(0) * PRIME^(n-1) + charCodeAt(1) * PRIME^(n-2) + ... + charCodeAt(n-1)
    //
    // where charCodeAt(i) is the i-th character code of the key, n is the length of the key and
    // PRIME is just any prime number like 31.
    const hash = Array.from(key).reduce(
      (hashAccumulator, keySymbol) => (hashAccumulator + keySymbol.charCodeAt(0)),
      0,
    );

    // Reduce hash number so it would fit hash table size.
    return hash % this.buckets.length;
  }

  /**
   * @param {string} key
   * @param {*} value
   */
  set(key: string, value: LinkedListNode<T>) {
    const keyHash = this.hash(key);
    this.keys[key] = keyHash;
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find(value, (nodeValue: LinkedListNode<T>) => nodeValue.toString(null) === key);

    if (!node) {
      // Insert new node.
      bucketLinkedList.append(value);
    } else {
      // Update value of existing node.
      node.value!.value = value;
    }
  }

  /**
   * @param {string} key
   * @return {*}
   */
  delete(key: string) {
    const keyHash = this.hash(key);
    delete this.keys[key];
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find(null, (nodeValue: LinkedListNode<T>) => nodeValue.toString(null) === key);

    if (node) {
      return bucketLinkedList.delete(node.value!);
    }

    return null;
  }

  /**
   * @param {string} key
   * @return {*}
   */
  get(key: string) {
    const bucketLinkedList = this.buckets[this.hash(key)];
    const node = bucketLinkedList.find(null, (nodeValue: LinkedListNode<T>) => nodeValue.key === key);

    return node ? node.value!.value : undefined;
  }

  /**
   * @param {string} key
   * @return {boolean}
   */
  has(key: string) {
    return Object.hasOwnProperty.call(this.keys, key);
  }

  /**
   * @return {string[]}
   */
  getKeys() {
    return Object.keys(this.keys);
  }

  /**
   * Gets the list of all the stored values in the hash table.
   *
   * @return {*[]}
   */
  getValues() {
    return this.buckets.reduce((values: Array<LinkedListNode<T>>, bucket) => {
      const bucketValues = bucket.toArray().map((linkedListNode: LinkedListNode<T> | null) => linkedListNode!.value!.value);

      let result = values!.concat([]!);//bucketValues
      return result;
    }, []);
  }
}
