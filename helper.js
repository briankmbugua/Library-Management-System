function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
}

function stringifyWithNestedObject(obj) {
    return JSON.stringify(obj, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        // Return only specific properties of the nested object
        return { nestedObject: value };
      }
      return value;
    }, 2);
  }

module.exports = {
    getOffset,
    emptyOrRows,
    stringifyWithNestedObject
}