'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { UserAvatar } from './UserAvatar';
import { WorkspaceSwitcher } from './WorkspaceSwitcher';
import type { TUser } from '@/types/TUser';

type TSession = {
  session: {
    user: TUser | null;
  } | null;
};

export const UserInfo = (session: TSession) => {
  const user = session.session?.user;

  return (
    <AnimatePresence>
      {user && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          className="flex w-full items-center"
        >
          <hr className="mx-3 h-5 w-px rotate-12 bg-neutral-700" />

          <WorkspaceSwitcher username={user?.username} workspaces={user?.workspaces} />
          <UserAvatar photoURL={user?.photoURL} username={user?.username} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
