export async function decodeHunter(encoded: string, mask: string, charCodeOffset: number, delimiterOffset: number) {
  const delimiter = mask[delimiterOffset];
  const chunks = encoded.split(delimiter).filter((chunk) => chunk);
  const decoded = chunks
    .map((chunk) => {
      const charCode = chunk.split('').reduceRight((c, value, index) => {
        return c + mask.indexOf(value) * delimiterOffset ** (chunk.length - 1 - index);
      }, 0);
      return String.fromCharCode(charCode - charCodeOffset);
    })
    .join('');
  return decoded;
}
