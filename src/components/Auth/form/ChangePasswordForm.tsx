import changePassword from "@/yap/app/actions/auth/changePassword";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import ErrorInfoList from "../../error/ErrorInfoList";
import { useRouter } from "next/navigation";
import SuccessInfoGoBack from "../SuccessInfoWithButton";

type ChangePasswordFormProps = {
    tokenInfo: {
        id: string,
        token: string,
    }
};


export default function ChangePasswordForm({ tokenInfo } : ChangePasswordFormProps) {
    const router = useRouter();
    const [formState, action] = useFormState(changePassword, undefined);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (formState && formState.success)
            setSuccess(true);
    }, [formState]);

    return (
        <>
            {success ?  <SuccessInfoGoBack text="Password changed successfully" buttonText="OK" onClick={() => router.replace('/')}></SuccessInfoGoBack> :
                <form className="flex flex-col p-2 gap-8 text-black" action={action}>
                    <div className="flex flex-col gap-4">
                        <ErrorInfoList errors={formState?.errors._form}></ErrorInfoList>
                        <input type="hidden" name="tokenId" defaultValue={tokenInfo.id}></input>
                        <input type="hidden" name="token" defaultValue={tokenInfo.token}></input>
                        <input type='password' name='password' id='password' className="p-2 text-black" placeholder="Password" required></input>
                        <ErrorInfoList errors={formState?.errors.password}></ErrorInfoList>
                        <input type='password' name='confirm-password' id='confirm-password' className="p-2 text-black" placeholder="Confirm-password" required></input>
                        <ErrorInfoList errors={formState?.errors.confirmPassword}></ErrorInfoList>
                    </div>
                    <button type="submit" className="bg-amber-500 text-white rounded-md w-min text-nowrap ml-2 py-2 px-4">Submit</button>
                </form>
            }
        </>

    );
}