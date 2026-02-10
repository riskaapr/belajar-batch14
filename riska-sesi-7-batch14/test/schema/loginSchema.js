const schema_loginuser = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Generated schema for Root",
  "type": "object",
  "properties": {
    "status": {
      "type": "number"
    },
    "token": {
      "type": "string"
    },
    "message": {
      "type": "string"
    }
  },
  "required": [
    "status",
    "token",
    "message"
  ]
}

export default schema_loginuser;