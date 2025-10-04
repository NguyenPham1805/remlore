'use client';

import { Button } from '@remlore/components/ui/button';
import { Label } from '@remlore/components/ui/label';
import { Textarea } from '@remlore/components/ui/textarea';
import { toast } from '@remlore/components/ui/use-toast';
import { useCustomToasts } from '@remlore/hooks/use-custom-toasts';
import { type CommentRequest } from '@remlore/lib/validators/comment';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CreateCommentProps {
  postId: string;
  replyToId?: string;
}

export function CreateComment({ postId, replyToId }: CreateCommentProps) {
  const [input, setInput] = useState('');
  const router = useRouter();
  const { loginToast } = useCustomToasts();

  const { mutate: submitComment, isLoading } = useMutation({
    mutationFn: async (comment: CommentRequest) => {
      const { data } = await axios.patch('/api/subreddit/post/comment', comment);
      return data;
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: 'Something went wrong.',
        description: "Comment wasn't created successfully. Please try again.",
        variant: 'destructive',
      });
    },

    onSuccess: () => {
      router.refresh();
      setInput('');
    },
  });

  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="comment">Your comment</Label>

      <div className="mt-2">
        <Textarea
          id="comment"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          placeholder="What are your thoughts?"
        />

        <div className="mt-2 flex justify-end">
          <Button
            isLoading={isLoading}
            disabled={input.length === 0}
            onClick={() => submitComment({ postId, text: input, replyToId })}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}
