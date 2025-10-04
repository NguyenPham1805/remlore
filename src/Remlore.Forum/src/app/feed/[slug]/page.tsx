import { CommentSection, Icons } from '@remlore/components';
import { EditorOutput } from '@remlore/components/editor-output';
import { formatTimeToNow } from '@remlore/lib/utils';
import { RemlorePost } from '@remlore/types';
import axios from 'axios';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

interface PostDetailPageProps {
  params: {
    id: string;
  };
}

export default async function PostDetailPage({ params: { id } }: PostDetailPageProps) {
  const { data: post } = await axios.get<RemlorePost>(`/posts/${id}`);

  return (
    <div>
      <div className="flex h-full flex-col items-center justify-between sm:flex-row sm:items-start">
        <div className="w-full flex-1 rounded-sm bg-card p-4 sm:w-0">
          <p className="mt-1 max-h-40 truncate text-xs text-muted-foreground">
            <span>Posted by {post?.author.displayName} •</span>{' '}
            {formatTimeToNow(new Date(post?.createdAt))}
          </p>

          <h1 className="py-2 text-xl font-semibold leading-6 text-primary">{post?.title}</h1>

          <EditorOutput content={post?.content} />

          <Suspense fallback={<Icons.spinner className="h-5 w-5 animate-spin text-zinc-500" />}>
            <CommentSection postId={post?.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
