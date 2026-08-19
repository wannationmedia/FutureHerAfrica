import type { JsonSchema } from "@/lib/ai/types";

export class SchemaValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SchemaValidationError";
  }
}

export function assertSchema(schema: JsonSchema, value: unknown, path = "$"): void {
  if (schema.anyOf && schema.anyOf.length > 0) {
    const errors: string[] = [];
    for (const option of schema.anyOf) {
      try {
        assertSchema(option, value, path);
        return;
      } catch (error) {
        errors.push(error instanceof Error ? error.message : "invalid");
      }
    }
    throw new SchemaValidationError(`${path}: no matching schema (${errors.join("; ")})`);
  }

  if (schema.enum && !schema.enum.includes(value as string | number)) {
    throw new SchemaValidationError(`${path}: must be one of ${schema.enum.join(", ")}`);
  }

  switch (schema.type) {
    case "object":
      assertObject(schema, value, path);
      return;
    case "string":
      assertString(schema, value, path);
      return;
    case "integer":
    case "number":
      assertNumber(schema, value, path, schema.type === "integer");
      return;
    case "boolean":
      if (typeof value !== "boolean") {
        throw new SchemaValidationError(`${path}: expected boolean`);
      }
      return;
    case "array":
      if (!Array.isArray(value)) {
        throw new SchemaValidationError(`${path}: expected array`);
      }
      if (schema.items) {
        value.forEach((item, index) => assertSchema(schema.items as JsonSchema, item, `${path}[${index}]`));
      }
      return;
    case "null":
      if (value !== null) {
        throw new SchemaValidationError(`${path}: expected null`);
      }
      return;
    default:
      return;
  }
}

function assertObject(schema: JsonSchema, value: unknown, path: string): void {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new SchemaValidationError(`${path}: expected object`);
  }
  const record = value as Record<string, unknown>;
  const properties = schema.properties ?? {};
  for (const key of schema.required ?? []) {
    if (!(key in record) || record[key] === undefined) {
      throw new SchemaValidationError(`${path}.${key}: required`);
    }
  }
  if (schema.additionalProperties === false) {
    for (const key of Object.keys(record)) {
      if (!(key in properties)) {
        throw new SchemaValidationError(`${path}.${key}: unexpected property`);
      }
    }
  }
  for (const [key, propertySchema] of Object.entries(properties)) {
    if (record[key] !== undefined) {
      assertSchema(propertySchema, record[key], `${path}.${key}`);
    }
  }
}

function assertString(schema: JsonSchema, value: unknown, path: string): void {
  if (typeof value !== "string") {
    throw new SchemaValidationError(`${path}: expected string`);
  }
  if (schema.minLength !== undefined && value.length < schema.minLength) {
    throw new SchemaValidationError(`${path}: minLength ${schema.minLength}`);
  }
  if (schema.maxLength !== undefined && value.length > schema.maxLength) {
    throw new SchemaValidationError(`${path}: maxLength ${schema.maxLength}`);
  }
  if (schema.pattern && !new RegExp(schema.pattern).test(value)) {
    throw new SchemaValidationError(`${path}: pattern mismatch`);
  }
}

function assertNumber(schema: JsonSchema, value: unknown, path: string, integer: boolean): void {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new SchemaValidationError(`${path}: expected number`);
  }
  if (integer && !Number.isInteger(value)) {
    throw new SchemaValidationError(`${path}: expected integer`);
  }
  if (schema.minimum !== undefined && value < schema.minimum) {
    throw new SchemaValidationError(`${path}: minimum ${schema.minimum}`);
  }
  if (schema.maximum !== undefined && value > schema.maximum) {
    throw new SchemaValidationError(`${path}: maximum ${schema.maximum}`);
  }
}
