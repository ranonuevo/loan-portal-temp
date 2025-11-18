import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function flattenObject(obj: any, parentKey = '', result: Record<string, any> = {}) {
  // eslint-disable-next-line prefer-const
  for (let key in obj) {
    const value = obj[key];
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      flattenObject(value, newKey, result);
    } else {
      result[newKey] = Array.isArray(value) ? value.join(', ') : value;
    }
  }
  return result;
}