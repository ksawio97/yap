import { User } from "@prisma/client";
var bcrypt = require('bcryptjs');

export function verifyUser(user: User, password: string): boolean {
    return bcrypt.compareSync(password, user.password);
}