export function splitLine(line) {
  const re = /"((?:\\"|[^"])*)"|([^,]+)|(,)/g;

  const record = [];
  let index = 0;
  for (const match of line.matchAll(re)) {
    const [_, quoted, unquoted, fieldSeperator] = match;
    if (fieldSeperator) {
      record.push("")
      index++
    }
    else {
      record[index] = (quoted && quoted.replace(/\\"/g, '"')) || unquoted
    }
  }

  return record;
}
