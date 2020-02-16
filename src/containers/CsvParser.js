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

export function mapRecord(headers, record) {
  if (record.length != headers.length) {
    raise("Invalid record or headers", record, headers);
  }

  const entries = headers.map((header, i) => [header, record[i]])

  return Object.fromEntries(entries)
}
