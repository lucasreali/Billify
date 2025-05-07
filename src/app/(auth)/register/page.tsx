

import AuthOptins from '@/components/auth/auth-options';
import RegisterForm from '@/components/auth/register-form';
import Separetor from '@/components/auth/separetor';
import Terms from '@/components/auth/terms';
import Link from '@/components/next/link';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

const RegisterPage = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen bg-muted gap-5'>
            <Card className='w-[400px]'>
                <CardHeader className='text-center'>
                    <CardTitle className='text-xl'>Welcome back</CardTitle>
                    <CardDescription>
                        Enter with your Apple or Google account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AuthOptins />
                    <Separetor />
                    <RegisterForm />
                </CardContent>
                <CardFooter>
                    <div className='text-center text-sm w-full'>
                        Don&apos;t have an account?{' '}
                        <Link href='/signin' className='underline underline-offset-4'>
                            Sign in
                        </Link>
                    </div>
                </CardFooter>
            </Card>
            <Terms />
        </div>
    );
};

export default RegisterPage;
