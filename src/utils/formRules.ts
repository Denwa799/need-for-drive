export const formRules = {
  required: (message: string) => ({
    required: true,
    message,
  }),
  type: (type: any, message: string) => ({
    type,
    message,
  }),
};
