export default function ChangePasswordForm() {
    return (
        <form className="flex flex-col p-2 gap-8 text-black">
            <div className="flex flex-col gap-4">
                <input type='password' name='password' id='password' className="p-2 text-black" placeholder="Password" required></input>
                <input type='password' name='confirm-password' id='confirm-password' className="p-2 text-black" placeholder="Confirm-password" required></input>
            </div>
            <button type="submit" className="bg-amber-500 text-white rounded-md w-min text-nowrap ml-2 py-2 px-4">Submit</button>
        </form>
    );
}