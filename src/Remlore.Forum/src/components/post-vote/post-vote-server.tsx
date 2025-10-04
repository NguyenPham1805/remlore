import { PostVoteClient } from '@remlore/components/post-vote/post-vote-client';
import { EReaction } from '@remlore/enums';
import { getServerAuthSession } from '@remlore/server/auth';
import { RemlorePost } from '@remlore/types';
import { notFound } from 'next/navigation';

interface PostVoteServerProps {
  postId: string;
  initialReactionCount?: number;
  initialReaction?: EReaction | null;
  getData?: () => Promise<RemlorePost | null>;
}

export async function PostVoteServer({
  getData,
  postId,
  initialReaction,
  initialReactionCount,
}: PostVoteServerProps) {
  const session = await getServerAuthSession();

  let voteCount = 0;
  let currentVote: EReaction | null | undefined = undefined;

  if (getData) {
    // Fetch post data in component
    const post = await getData();
    if (!post) return notFound();

    voteCount = post.reactions.reduce((acc, vote) => {
      if (vote.type === EReaction.LIKE) return acc + 1;
      if (vote.type === EReaction.DISLIKE) return acc - 1;
      return acc;
    }, 0);

    currentVote = post.reactions.find((vote) => vote.userId === session?.user?.id)?.type;
  } else {
    // Passed as props if we already have the data, otherwise
    // the `getData` function is passed and invoked above
    voteCount = initialReactionCount!;
    currentVote = initialReaction;
  }

  return (
    <PostVoteClient
      postId={postId}
      initialReaction={currentVote}
      initialReactionCount={voteCount}
    />
  );
}
