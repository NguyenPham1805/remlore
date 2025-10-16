'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@remlore/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@remlore/components/ui/card';
import { Input } from '@remlore/components/ui/input';
import { Label } from '@remlore/components/ui/label';
import { toast } from '@remlore/components/ui/use-toast';
import { cn } from '@remlore/lib/utils';
import { UsernameValidator } from '@remlore/lib/validators/username';
import { RemloreUser } from '@remlore/types';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

type FormData = z.infer<typeof UsernameValidator>;

interface UsernameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<RemloreUser, 'id' | 'remloreUsername'> | null;
}

export function UsernameForm({ user, className, ...props }: UsernameFormProps) {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(UsernameValidator),
    defaultValues: {
      name: user?.remloreUsername ?? '',
    },
  });

  const { mutate: updateUsername, isLoading } = useMutation({
    mutationFn: async ({ name }: FormData) => {
      const payload: FormData = { name };

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { data } = await axios.patch('/api/remloreUsername', payload);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return data;
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: 'Username already taken.',
            description: 'Please choose another remloreUsername.',
            variant: 'destructive',
          });
        }
      }

      return toast({
        title: 'Something went wrong.',
        description: 'Your remloreUsername was not updated. Please try again.',
        variant: 'destructive',
      });
    },

    onSuccess: () => {
      toast({
        description: 'Your remloreUsername has been updated.',
      });
      router.refresh();
    },
  });

  return (
    <form
      className={cn(className)}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit((e) => updateUsername(e))}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>Your remloreUsername</CardTitle>
          <CardDescription>Please enter a display name you are comfortable with.</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="relative grid gap-1">
            <div className="absolute left-0 top-0 grid h-10 w-8 place-items-center">
              <span className="text-sm text-zinc-500">u/</span>
            </div>

            <Label className="sr-only" htmlFor="name">
              Username
            </Label>
            <Input id="name" className="w-[300px] pl-6" size={32} {...register('name')} />

            {errors?.name && <p className="px-1 text-xs text-destructive">{errors.name.message}</p>}
          </div>
        </CardContent>

        <CardFooter>
          <Button isLoading={isLoading}>Change remloreUsername</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
