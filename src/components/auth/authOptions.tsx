import { FaGithub, FaGoogle } from "react-icons/fa";
import { Button } from "../ui/button";

const AuthOptins = () => {
    return (
        <div className='flex flex-col gap-4'>
            <Button variant='outline' className='w-full'>
                <FaGithub />
                Enter with GitHub
            </Button>
            <Button variant='outline' className='w-full'>
                <FaGoogle />
                Enter with Google
            </Button>
        </div>
    );
};


export default AuthOptins;
