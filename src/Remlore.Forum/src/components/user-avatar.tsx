import { type AvatarProps } from '@radix-ui/react-avatar';
import { Icons } from '@remlore/components/icons';
import { Avatar, AvatarFallback } from '@remlore/components/ui/avatar';
import { RemloreUser } from '@remlore/types';
import Image from 'next/image';

interface UserAvatarProps extends AvatarProps {
  user: Pick<RemloreUser, 'avatar' | 'displayName'>;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.avatar ? (
        <div className="relative aspect-square h-full w-full">
          <Image fill src={user.avatar} alt="profile picture" referrerPolicy="no-referrer" />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.displayName}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
