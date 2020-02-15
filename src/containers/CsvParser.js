export function splitLine(line) {
  const re = /(?:"([^"]*)",?|([^,]*),?)/g;

  const record = [];

  for (const match of line.matchAll(re)) {
    console.log(match);
    const [_, quotedField, unquotedField] = match;
    const { index, input } = match;

    if (index === input.length) {
      if (input[index - 1] === ",") {
        record.push(null);
      }
    } else {
      record.push(quotedField || unquotedField || null);
    }
  }

  return record;
}
