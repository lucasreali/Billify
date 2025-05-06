'use client';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const formSchema = z
    .object({
        name: z.string().min(2, {
            message: 'Name must be at least 2 characters long',
        }),
        email: z.string().email({
            message: 'Invalid email address',
        }),
        password: z
            .string()
            .min(6, {
                message: 'Password must be at least 6 characters long',
            })
            .max(20, {
                message: 'Password must be at most 20 characters long',
            }),
        confirmPassword: z.string().min(6, {
            message: 'Password must be at least 6 characters long',
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'As senhas não coincidem',
        path: ['confirmPassword'],
    });

const RegisterForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    confirmPassword: data.confirmPassword,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Erro no cadastro:', errorData);
                // Aqui você pode adicionar lógica para exibir erro ao usuário
                return;
            }

            const result = await response.json();
            console.log('Cadastro realizado com sucesso:', result);
            // Aqui você pode adicionar redirecionamento após o cadastro bem-sucedido
        } catch (error) {
            console.error('Erro ao processar o cadastro:', error);
            // Tratamento de erros de rede
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-4'>
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder='Jhon Doe' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='mail@exemple.com'
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='*********'
                                        type='password'
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='confirmPassword'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='*********'
                                        type='password'
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type='submit'>Submit</Button>
                </div>
            </form>
        </Form>
    );
};

export default RegisterForm;
