function filter(schema, json) {
    var newJson = {};

    if (schema.type === "object") {
    Object.keys(schema.properties).forEach(function(key) {
      if (json[key]) newJson[key] = json[key];
    });
  }
  return newJson;
}

module.exports = filter;
