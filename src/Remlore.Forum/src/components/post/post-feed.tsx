'use client';

import { useIntersection } from '@mantine/hooks';
import { Icons } from '@remlore/components/icons';
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@remlore/config';
import { EReaction } from '@remlore/enums';
import { RemlorePost } from '@remlore/types';
import { type ExtendedPost } from '@remlore/types/db';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import { Post } from './post';

interface PostFeedProps {
  initialPosts: ExtendedPost[];
  subredditName?: string;
}

export function PostFeed({ initialPosts, subredditName }: PostFeedProps) {
  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });
  const { data: session } = useSession();

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<RemlorePost[]>(
    ['infinite-query'],

    async ({ pageParam = 1 }) => {
      const query =
        `/api/v1/posts?pageSize=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}` +
        (!!subredditName ? `&subredditName=${subredditName}` : '');

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { data } = await axios.get(query);
      return data as ExtendedPost[];
    },

    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initialPosts], pageParams: [1] },
    }
  );

  useEffect(() => {
    if (entry?.isIntersecting) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchNextPage(); // Load more posts when the last post comes into view
    }
  }, [entry, fetchNextPage]);

  const posts = data?.pages.flatMap((page) => page) ?? [];

  return (
    <div className="col-span-2 flex flex-col space-y-6">
      {posts.map((post, index) => {
        const reactionCount = post.reactions.reduce((acc, vote) => {
          if (vote.type === EReaction.LIKE) return acc + 1;
          if (vote.type === EReaction.DISLIKE) return acc - 1;
          return acc;
        }, 0);

        const currentReaction = post.reactions.find((vote) => vote.userId === session?.user.id);

        return index === posts.length - 1 ? (
          // Add a ref to the last post in the list
          <div key={post.id} ref={ref}>
            <Post
              post={post}
              commentCount={post.comments.length}
              reactionCount={reactionCount}
              currentReaction={currentReaction}
            />
          </div>
        ) : (
          <div key={post.id}>
            <Post
              post={post}
              commentCount={post.comments.length}
              reactionCount={reactionCount}
              currentReaction={currentReaction}
            />
          </div>
        );
      })}

      {isFetchingNextPage && (
        <div className="flex justify-center">
          <Icons.spinner className="h-6 w-6 animate-spin text-zinc-500" />
        </div>
      )}
    </div>
  );
}
