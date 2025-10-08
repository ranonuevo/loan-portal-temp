import { z, ZodObject, ZodRawShape } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Resolver } from "react-hook-form";
import type { FieldConfig } from "./index";

/**
 * Conditional Zod Resolver for React Hook Form
 * - If a field is disabled, its schema becomes optional at runtime.
 */
export function conditionalZodResolver<
  T extends ZodObject<ZodRawShape>
>(schema: T, formConfig: FieldConfig[]): Resolver<z.infer<T>> {
  return async (values, context, options) => {
    // keep it typed as generic ZodObject so .safeExtend/.merge is available
    let dynamicSchema: ZodObject<any> = schema as unknown as ZodObject<any>;

    for (const field of formConfig) {
      if (!field.isDisabled) continue;

      const disabled =
        typeof field.isDisabled === "function"
          ? field.isDisabled(values, field.name, undefined)
          : field.isDisabled === true;

      if (disabled) {
        // ✅ prefer safeExtend if your Zod version supports it
        if (typeof (dynamicSchema as any).safeExtend === "function") {
          dynamicSchema = (dynamicSchema as any).safeExtend({
            [field.name]: z.any().optional(),
          });
        } else {
          // fallback: use merge with a fresh object schema
          dynamicSchema = dynamicSchema.merge(
            z.object({
              [field.name]: z.any().optional(),
            })
          );
        }
      }
    }

    const resolver = (zodResolver(dynamicSchema as any) as unknown) as Resolver<
      z.infer<T>
    >;

    return resolver(values, context, options);
  };
}


export const isEqual = (value1: any, value2: any): boolean => {
  // Check if the two values are of different types
  if (typeof value1 !== typeof value2) {
    return false
  }
  
  // Check if the two values are null or undefined
  if (value1 === null || value1 === undefined || value2 === null || value2 === undefined) {
    return value1 === value2
  }
  
  // Check if the two values are primitives
  if (typeof value1 === 'number' || typeof value1 === 'boolean' || typeof value1 === 'string' || typeof value1 === 'symbol') {
    return value1 === value2
  }
  
  // Check if the two values are arrays
  if (Array.isArray(value1) && Array.isArray(value2)) {
    if (value1.length !== value2.length) {
      return false
    }
    
    for (let i = 0; i < value1.length; i++) {
      if (!isEqual(value1[i], value2[i])) {
        return false
      }
    }
    
    return true
  }
  
  // Check if the two values are objects
  if (typeof value1 === 'object' && typeof value2 === 'object') {
    const value1Keys = Object.keys(value1)
    const value2Keys = Object.keys(value2)
    
    if (value1Keys.length !== value2Keys.length) {
      return false
    }
    
    for (const key of value1Keys) {
      if (!isEqual(value1[key], value2[key])) {
        return false
      }
    }
    
    return true
  }
  
  // If we reach this point, the two values are not equal
  return false
}

export const containsObject = (list: any[], obj: any) => {
  let i

  for (i = 0; i < list.length; i++) {
    if (isEqual(list[i], obj)) {
      return true
    }
  }

  return false
}