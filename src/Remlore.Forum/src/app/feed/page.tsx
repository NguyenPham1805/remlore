import { MiniCreatePost, PostFeed } from "@remlore/components";
import { getServerAuthSession } from "@remlore/server/auth";

export default async function SubredditPage() {
  const session = await getServerAuthSession();

  return (
    <>
      <MiniCreatePost session={session} />
      <PostFeed initialPosts={[]} subredditName={"subreddit.name"} />
    </>
  );
}
