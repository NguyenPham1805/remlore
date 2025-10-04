import { EReaction } from '@remlore/enums';
import { z } from 'zod';

export const postReactionValidator = z.object({
  postId: z.string(),
  reactionType: z.enum([
    EReaction.LIKE,
    EReaction.DISLIKE,
    EReaction.LOVE,
    EReaction.HAHA,
    EReaction.WOW,
    EReaction.SAD,
    EReaction.ANGRY,
  ]),
});

export const commentReactionValidator = z.object({
  commentId: z.string(),
  reactionType: z.enum([
    EReaction.LIKE,
    EReaction.DISLIKE,
    EReaction.LOVE,
    EReaction.HAHA,
    EReaction.WOW,
    EReaction.SAD,
    EReaction.ANGRY,
  ]),
});

export type PostReactionRequest = z.infer<typeof postReactionValidator>;
export type CommentReactionRequest = z.infer<typeof commentReactionValidator>;
