import Link from "next/link";

export default function Settings() {
    return (
        <main>
          <Link href='/auth/reset/password'><span className="text-emerald-300 text-nowrap bg-teal-900 p-4 rounded-md">Reset password</span></Link>
        </main>
    );
} 