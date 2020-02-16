export function parseCsvLine(line) {
  const re = /"((?:\\"|[^"])*)"|([^,]+)|(,)/g;

  const record = [];
  let index = 0;
  for (const match of line.matchAll(re)) {
    const [_, quoted, unquoted, fieldSeperator] = match;
    if (fieldSeperator) {
      record.push("");
      index++;
    } else {
      record[index] = (quoted && quoted.replace(/\\"/g, '"')) || unquoted;
    }
  }

  return record;
}

export function mapRecord(headers, record) {
  if (record.length != headers.length) {
    console.log("Invalid record or headers", record, headers)
    throw "Invalid record or headers";
  }

  const entries = headers.map((header, i) => [header, record[i]]);

  return Object.fromEntries(entries);
}

function parseHeaders(matches) {
  const { value: [_, line] } = matches.next();
  return parseCsvLine(line)
}

export function parseCsvX(data) {
  const re = /\r\n|([^]+?)(?=\r\n|$)/g
  const matches = data.matchAll(re)
  const headers = parseHeaders(matches)

  const csv = []
  for (const [_, line] of matches) {
    if (line) {
      const record = parseCsvLine(line)
      csv.push(mapRecord(headers, record))
    }
  }

  return csv
}

export function parseCsv(data) {
  const lines = data.split("\r\n");
  const records = lines.map(parseCsvLine);
  const headers = records.shift()

  const csv = []
  for (const record of records) {
    if (record.length) {
      csv.push(mapRecord(headers, record))
    }
  }

  return csv
}
