import Link from "next/link";
import { Icons } from "@remlore/components/icons";
import { ModeToggle } from "@remlore/components/mode-toggle";
import { SearchBar } from "@remlore/components/search-bar";
import { buttonVariants } from "@remlore/components/ui/button";
import { UserAccountNav } from "@remlore/components/user-account-nav";
import { getServerAuthSession } from "@remlore/server/auth";

export async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <div className="fixed inset-x-0 top-0 z-[10] h-fit border-b bg-inherit py-2">
      <div className="container mx-auto flex h-full max-w-7xl items-center justify-between gap-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" />
          <span className="hidden text-sm font-medium md:block">Remlore</span>
        </Link>

        {/* Search Bar */}
        <SearchBar />

        {/* Actions */}
        <div className="flex justify-between gap-2">
          <ModeToggle />

          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <Link href="/login" className={buttonVariants()}>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
