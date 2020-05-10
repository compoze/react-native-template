export interface ValidationObject {
  fieldName: string;
  message: string;
}

export interface ObjectToValidate {
  key: string;
  value: string;
}

export function requiredFieldsEmpty(
  ...args: ObjectToValidate[]
): ValidationObject[] {
  const validationObject: ValidationObject[] = [];
  if (!args.length) {
    validationObject.push({
      fieldName: 'lenght',
      message: 'Is Empty',
    });
  }

  args.forEach((arg) => {
    if (!arg.value) {
      validationObject.push({
        fieldName: arg.key,
        message: `${arg.key} cannot be empty`,
      });
    }
  });
  return validationObject;
}
