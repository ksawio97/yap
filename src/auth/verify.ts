import UserModel from "@/yap/db/models/UserModel";
var bcrypt = require('bcryptjs');

export function verifyUser(user: UserModel, password: string): boolean {
    return bcrypt.compareSync(password, user.password);
}