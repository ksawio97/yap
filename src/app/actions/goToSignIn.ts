'use server'
import { signIn } from '../../auth/auth';

export default async function goToSignIn() {
    await signIn();
}