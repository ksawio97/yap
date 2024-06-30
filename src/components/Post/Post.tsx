import ProfilePicture from "../Profile/ProfilePicture";
import Like from "./Icons/Like";
import HoverIcon from "./Icons/HoverIcon";
import Share from "./Icons/Share";
import Comment from "./Icons/Comment";

export default function Post() {
    // temporary
    const post = {
        user: {
            name: "Joe Bruda",
        },
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus accumsan suscipit orci, ac porta libero euismod non. Integer mollis eros eget accumsan sodales. Ut aliquet ornare justo, nec posuere velit pellentesque a. Nunc eros tortor, mattis eu finibus nec, imperdiet sit amet massa. Nulla luctus auctor purus, eget convallis purus tincidunt non. Etiam non bibendum nulla. Donec interdum, odio in auctor egestas, metus ante luctus lacus, eget sodales mi odio nec est. Mauris felis velit, faucibus at lacus id, posuere maximus libero. Proin sed ligula mauris. Ut at ornare ante, a consequat odio. Nulla varius at diam nec tempor. Sed feugiat nisi maximus, fringilla diam et, facilisis ipsum. Nullam lacinia vulputate ante sit amet placerat. Fusce dignissim, tortor non euismod egestas, ipsum nibh posuere neque, vitae ultricies diam velit vel nunc. Pellentesque ac mauris imperdiet, vehicula felis ut, dignissim elit. ',
    }


    return (
        <article className="w-full flex flex-row">
            <div className="w-14 p-2">
                <ProfilePicture></ProfilePicture>
            </div>
            <div className="flex flex-col w-full">
                <div className="w-full flex flex-row gap-2">
                    <h3 className="text-white font-bold">{post.user.name}</h3>
                    <p className="font-light text-gray-400">1 hour ago</p>
                </div>
                <p className="p-1">{post.content}</p>
                <div className="grid grid-cols-3 px-8 py-2 text-gray-500">
                    <HoverIcon color="#64748b" hoverColor="red" icon={<Like/>}></HoverIcon>
                    <HoverIcon color="#64748b" hoverColor="blue" icon={<Comment/>}></HoverIcon>
                    <HoverIcon color="#64748b" hoverColor="orange" icon={<Share/>}></HoverIcon>
                </div>
            </div>
        </article>
    )
}