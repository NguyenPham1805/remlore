import { CreateComment } from '@remlore/components/comments/create-comment';
import { PostComment } from '@remlore/components/comments/post-comment';
import { EReaction } from '@remlore/enums';
import { getServerAuthSession } from '@remlore/server/auth';
import { Comment } from '@remlore/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

interface CommentsSectionProps {
  postId: string;
}

export async function CommentSection({ postId }: CommentsSectionProps) {
  const session = await getServerAuthSession();

  const {
    data: comments,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<Comment[]>(['comments', postId], async ({ pageParam = 1 }) => {
    const { data } = await axios.get(`/api/v1/comments?postId=${postId}&page=${pageParam}`);
    return data;
  });

  return (
    <div className="mt-4 flex flex-col gap-y-4">
      <hr className="my-6 h-px w-full" />

      <CreateComment postId={postId} />

      <div className="mt-4 flex flex-col gap-y-6">
        {comments?.pages
          .flat()
          .filter((comment) => !comment.replyToId)
          .map((topLevelComment) => {
            const topLevelCommentReactionCount = topLevelComment.reactions.reduce((acc, vote) => {
              if (vote.type === EReaction.LIKE) return acc + 1;
              if (vote.type === EReaction.DISLIKE) return acc - 1;
              return acc;
            }, 0);

            const topLevelCommentReaction = topLevelComment.reactions.find(
              (vote) => vote.user.id === session?.user.id
            );

            return (
              <div key={topLevelComment.id} className="flex flex-col">
                {/* Render top-level comments */}
                <div className="mb-2">
                  <PostComment
                    postId={postId}
                    comment={topLevelComment}
                    currentReaction={topLevelCommentReaction}
                    reactionCount={topLevelCommentReactionCount}
                  />
                </div>

                {/* Render replies */}
                {topLevelComment.replies
                  .sort((a, b) => b.reactions.length - a.reactions.length) // Sort replies by most liked/disliked
                  .map((reply) => {
                    const replyVoteCount = reply.reactions.reduce((acc, vote) => {
                      if (vote.type === EReaction.LIKE) return acc + 1;
                      if (vote.type === EReaction.DISLIKE) return acc - 1;
                      return acc;
                    }, 0);

                    const replyVote = reply.reactions.find(
                      (vote) => vote.user.id === session?.user.id
                    );

                    return (
                      <div key={reply.id} className="ml-2 border-l-2 border-zinc-200 py-2 pl-4">
                        <PostComment
                          postId={postId}
                          comment={reply}
                          currentReaction={replyVote}
                          reactionCount={replyVoteCount}
                        />
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
}
