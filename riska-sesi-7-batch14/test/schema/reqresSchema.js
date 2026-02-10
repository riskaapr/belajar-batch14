const schema_showuser = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Generated schema for Root",
  "type": "object",
  "properties": {
    "status": {
      "type": "number"
    },
    "users": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "userId": {
            "type": "string"
          },
          "username": {
            "type": "string"
          },
          "age": {
            "type": "number"
          },
          "protected": {
            "type": "boolean"
          }
        },
        "required": [
          "userId",
          "username",
          "age"
        ]
      }
    }
  },
  "required": [
    "status",
    "users"
  ]
}

export default schema_showuser;