
import AuthOptins from '@/components/auth/auth-options';
import Separetor from '@/components/auth/separetor';
import SignInForm from '@/components/auth/signIn-form';
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

const SignInPage = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen bg-muted gap-5 w-full'>
            <Card className='w-[400px]'>
                <CardHeader className='text-center'>
                    <CardTitle className='text-xl'>
                        Welcome to Billify
                    </CardTitle>
                    <CardDescription>
                        Access your account to manage your bills
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AuthOptins />
                    <Separetor />
                    <SignInForm />
                </CardContent>
                <CardFooter>
                    <div className='text-center text-sm w-full'>
                        Don&apos;t have an account?{' '}
                        <Link
                            href='/register'
                            className='underline underline-offset-4'
                        >
                            Register
                        </Link>
                    </div>
                </CardFooter>
            </Card>
            <Terms />
        </div>
    );
};

export default SignInPage;
