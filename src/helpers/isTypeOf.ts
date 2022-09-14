export const isTypeOf = <T>(
  valueToBeChecked: unknown,
  propertyToCheck: keyof T,
): valueToBeChecked is T =>
  (valueToBeChecked as T)[propertyToCheck] !== undefined;
