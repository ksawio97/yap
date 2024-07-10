import CheckIcon from "@/yap/components/Auth/CheckIcon";
import ContentAsPageWrapper from "@/yap/components/Wrappers/ContentAsPageWrapper"
import Link from "next/link";

export default function SignupSucess() {
    return (
        <ContentAsPageWrapper>
            <div className="h-auto w-auto flex items-center justify-center">
                <div className="md:size-40 size-16">
                    <CheckIcon></CheckIcon>
                </div>
            </div>
            <div className="text-center">
                <Link href="/auth/signin" className="md:text-2xl text-xl">Your account has been created successfully! <span className="text-emerald-300 text-nowrap">Sign in</span></Link>
            </div>
        </ContentAsPageWrapper>
    );
}