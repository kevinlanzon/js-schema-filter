var filter = require('../js/filter');

describe('JSON Filter', function() {

  var schema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "User",
    "description": "User data for language learning application",
    "type": "object",
    "properties": {
      "first_name":     {"type": "string"},
      "last_name":      {"type": "string"},
      "age": {
        "description": "Given in years",
        "type": "number",
        "minimum": 0
      },
      "contact_number": {"type": "string"},
      "email":          {"type": "string"},
      "address": {
        "type": "object",
        "properties": {
          "street_address": {"type": "string"},
          "city":           {"type": "string"},
          "state":          {"type": "string"},
          "country":        {"type": "string"}
        }
      },
      "languages": {
        "description": "Languages spoken fluently",
        "type": "array",
        "items": {"type": "string"}
      },
      "newsletter": {
        "description": "Has the user signed up for the newsletter?",
        "type": "boolean"
      }
    },
    "required": ["first_name", "last_name", "email"]
  }

  it('returns the complete json data', function() {
    var json = { "first_name" : "Kev" }
    var newJson = filter(schema, json);
    expect(newJson).toEqual(json);
  });

  it('returns matching schema keywords', function() {
    var json = {
      "first_name" : "Kevin",
      "last_name" : "Lanzon"
    }
    var newJson = filter(schema, json);
    expect(newJson).toEqual(json);
  });

  it('should not return non matching schema keywords', function() {
    var json = {
      "first_name" : "Kevin",
      "last_name" : "Lanzon",
      "contact_number": "123456789",
      "ignore": "this property"
    }
    var newJson = filter(schema, json);
    expect(newJson).toEqual({ "first_name" : "Kevin",
      "last_name" : "Lanzon", "contact_number": "123456789"});
  });
});
