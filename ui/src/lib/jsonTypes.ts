export type JsonPrimitive =
  | string
  | number
  | boolean;
export type JsonArray = Array<JsonPrimitive | JsonArray | JsonObject>
export type JsonObject = Map<string, JsonPrimitive | JsonObject | JsonArray>
export type JsonLike = JsonPrimitive | JsonArray | JsonObject;
