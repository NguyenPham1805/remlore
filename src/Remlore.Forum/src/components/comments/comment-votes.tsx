'use client';

import { usePrevious } from '@mantine/hooks';
import { Icons } from '@remlore/components/icons';
import { Button } from '@remlore/components/ui/button';
import { toast } from '@remlore/components/ui/use-toast';
import { EReaction } from '@remlore/enums';
import { useCustomToasts } from '@remlore/hooks/use-custom-toasts';
import { cn } from '@remlore/lib/utils';
import { type CommentReactionRequest } from '@remlore/lib/validators/reaction';
import { CommentReaction } from '@remlore/types/reaction';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';

type PartialReaction = Pick<CommentReaction, 'type'>;

interface CommentReactionsProps {
  commentId: string;
  currentReaction?: PartialReaction;
  reactionCount: number;
}

export function CommentReactions({
  commentId,
  currentReaction: _currentReaction,
  reactionCount: _reactionCount,
}: CommentReactionsProps) {
  const [reactionCount, setReactionCount] = useState<number>(_reactionCount);
  const [currentReaction, setCurrentReaction] = useState<PartialReaction | undefined>(
    _currentReaction
  );

  const { loginToast } = useCustomToasts();
  const prevReaction = usePrevious(currentReaction);

  const { mutate: vote } = useMutation({
    mutationFn: async (type: EReaction) => {
      const payload: CommentReactionRequest = {
        reactionType: type,
        commentId,
      };

      await axios.patch('/api/subreddit/post/comment/vote', payload);
    },

    onError: (err, reactionType) => {
      if (reactionType === EReaction.LIKE) setReactionCount((prev) => prev - 1);
      else setReactionCount((prev) => prev + 1);

      // Reset current vote
      setCurrentReaction(prevReaction);

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: 'Something went wrong.',
        description: 'Your vote was not registered. Please try again.',
        variant: 'destructive',
      });
    },

    onMutate: (type: EReaction) => {
      if (currentReaction?.type === type) {
        // RemloreUser is voting the same way again, so remove their vote
        setCurrentReaction(undefined);

        if (type === EReaction.LIKE) setReactionCount((prev) => prev - 1);
        else if (type === EReaction.DISLIKE) setReactionCount((prev) => prev + 1);
      } else {
        // RemloreUser is voting in the opposite direction, so subtract 2
        setCurrentReaction({ type });

        if (type === EReaction.LIKE) setReactionCount((prev) => prev + (currentReaction ? 2 : 1));
        else if (type === EReaction.DISLIKE)
          setReactionCount((prev) => prev - (currentReaction ? 2 : 1));
      }
    },
  });

  return (
    <div className="flex gap-1">
      <Button onClick={() => vote(EReaction.LIKE)} size="sm" variant="ghost" aria-label="upvote">
        <Icons.upvote
          className={cn('h-5 w-5 text-secondary-foreground', {
            'fill-emerald-500 text-emerald-500': currentReaction?.type === EReaction.LIKE,
          })}
        />
      </Button>

      {/* Reactions */}
      <p className="px-1 py-2 text-center text-xs font-medium text-secondary-foreground">
        {reactionCount}
      </p>

      <Button
        onClick={() => vote(EReaction.DISLIKE)}
        size="sm"
        className={cn({
          'text-emerald-500': currentReaction?.type === EReaction.DISLIKE,
        })}
        variant="ghost"
        aria-label="downvote"
      >
        <Icons.downvote
          className={cn('h-5 w-5 text-secondary-foreground', {
            'fill-red-500 text-red-500': currentReaction?.type === EReaction.DISLIKE,
          })}
        />
      </Button>
    </div>
  );
}
