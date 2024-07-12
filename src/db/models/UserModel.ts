type UserModel = {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    emailVerifToken: string | null;
    image: string | null;
    password: string | null;
}

export default UserModel;