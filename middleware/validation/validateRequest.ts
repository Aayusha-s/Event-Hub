export const validateRequest = <T>(payload: unknown, validator: (value: unknown) => T): T => {
	return validator(payload);
};
