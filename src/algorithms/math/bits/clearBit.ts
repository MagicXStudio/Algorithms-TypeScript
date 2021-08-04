/**
 * @param {number} bitPosition - zero based.
*/
export default function clearBit(number: number, bitPosition: number): number {
  const mask = ~(1 << bitPosition);

  return number & mask;
}
