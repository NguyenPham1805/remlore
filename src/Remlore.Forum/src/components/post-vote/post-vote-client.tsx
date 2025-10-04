'use client';

import { usePrevious } from '@mantine/hooks';
import { Icons } from '@remlore/components/icons';
import { Button } from '@remlore/components/ui/button';
import { toast } from '@remlore/components/ui/use-toast';
import { EReaction } from '@remlore/enums';
import { useCustomToasts } from '@remlore/hooks/use-custom-toasts';
import { cn } from '@remlore/lib/utils';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

interface PostVoteClientProps {
  postId: string;
  initialReactionCount: number;
  initialReaction?: EReaction | null;
}

export function PostVoteClient({
  postId,
  initialReactionCount,
  initialReaction,
}: PostVoteClientProps) {
  const [voteCount, setVoteCount] = useState<number>(initialReactionCount);
  const [currentVote, setCurrentVote] = useState(initialReaction);
  const prevVote = usePrevious(currentVote);
  const { loginToast } = useCustomToasts();

  // Ensure client component is in sync with server after `initialReaction` is populated
  useEffect(() => {
    setCurrentVote(initialReaction);
  }, [initialReaction]);

  const { mutate: vote } = useMutation({
    mutationFn: async (reactionType: EReaction) => {
      await axios.patch(`/api/posts/${postId}vote`, { reactionType });
    },

    onError: (err, reactionType) => {
      if (reactionType === EReaction.LIKE) setVoteCount((prev) => prev - 1);
      else setVoteCount((prev) => prev + 1);

      // reset current vote
      setCurrentVote(prevVote);

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

    onMutate: (reactionType) => {
      if (currentVote === reactionType) {
        // RemloreUser is voting the same way again, so remove their vote
        setCurrentVote(undefined);
        if (reactionType === EReaction.LIKE) setVoteCount((prev) => prev - 1);
        else if (reactionType === EReaction.DISLIKE) setVoteCount((prev) => prev + 1);
      } else {
        // RemloreUser is voting in the opposite direction, so subtract 2
        setCurrentVote(reactionType);
        if (reactionType === EReaction.LIKE) setVoteCount((prev) => prev + (currentVote ? 2 : 1));
        else if (reactionType === EReaction.DISLIKE)
          setVoteCount((prev) => prev - (currentVote ? 2 : 1));
      }
    },
  });

  return (
    <div className="flex flex-col gap-4 pb-4 pr-6 sm:w-20 sm:gap-0 sm:pb-0">
      {/* Upvote */}
      <Button onClick={() => vote(EReaction.LIKE)} size="sm" variant="ghost" aria-label="upvote">
        <Icons.upvote
          className={cn('h-5 w-5 text-secondary-foreground', {
            'fill-emerald-500 text-emerald-500': currentVote === EReaction.LIKE,
          })}
        />
      </Button>

      {/* Votes */}
      <p className="py-2 text-center text-sm font-medium text-secondary-foreground">{voteCount}</p>

      {/* Downvote */}
      <Button
        onClick={() => vote(EReaction.DISLIKE)}
        size="sm"
        className={cn({
          'text-emerald-500': currentVote === EReaction.DISLIKE,
        })}
        variant="ghost"
        aria-label="downvote"
      >
        <Icons.downvote
          className={cn('h-5 w-5 text-secondary-foreground', {
            'fill-red-500 text-red-500': currentVote === EReaction.DISLIKE,
          })}
        />
      </Button>
    </div>
  );
}
