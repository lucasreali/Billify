import { ChevronsUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface UserInfoProps {
    user: {
        name: string;
        email: string;
        avatar: string;
    };
    showChevrons?: boolean;
}

const NavUserInfo = ({ user, showChevrons = false }: UserInfoProps) => {
    const userInitials = user.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .toUpperCase();

    return (
        <>
            <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className='rounded-lg'>
                    {userInitials}
                </AvatarFallback>
            </Avatar>
            <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>{user.name}</span>
                <span className='truncate text-xs'>{user.email}</span>
            </div>
            {showChevrons && <ChevronsUpDown className='ml-auto size-4' />}
        </>
    );
};

export default NavUserInfo