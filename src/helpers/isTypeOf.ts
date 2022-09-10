export const isTypeOf = <T>(
  valueToBeChecked: any,
  propertyToCheck: keyof T
): valueToBeChecked is T => (valueToBeChecked as T)[propertyToCheck] !== undefined;
