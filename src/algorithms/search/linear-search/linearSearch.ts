import Comparator from '../../../utils/comparator/Comparator';

/**
 * Linear search implementation.
 *
 * @param {*[]} array
 * @param {*} seekElement
 * @param {function(a, b)} [comparatorCallback]
 * @return {number[]}
 */
export default function linearSearch(array: Array<number>[], seekElement: any, comparatorCallback: Function) {
  const comparator = new Comparator(comparatorCallback);
  let foundIndices: Array<number> = [];

  array.forEach((element, index) => {
    if (comparator.equal(element[0], seekElement)) {
      foundIndices.push(index);
    }
  });

  return foundIndices;
}
