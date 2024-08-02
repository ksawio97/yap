import { z } from 'zod';

export const emailValidator = z.string().email({ message: 'Invalid email address' });
export const passwordValidator = z.string().min(8).max(26);
export const nameValidator =  z.string().min(5).max(26).regex(/^[a-zA-Z0-9_-]+$/, {
    message: 'Name must contain only a-z, A-Z, 0-9, -, and _ characters',
});