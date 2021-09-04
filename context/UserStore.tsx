import { createContext, Dispatch, ReactNode, useState } from 'react';

import { UserType } from '../interfaces';

export const UserStoreContext = createContext<{
  UserStore: UserType | null;
  setUserStore: Dispatch<UserType>;
}>({
  UserStore: null,
  setUserStore: () => undefined
});

interface Props {
  children: ReactNode | ReactNode[];
}

export const UserStoreProvider = ({ children }: Props) => {
  const [UserStore, setUserStore] = useState<UserType | null>(null);

  return (
    <UserStoreContext.Provider value={{ UserStore, setUserStore }}>
      {children}
    </UserStoreContext.Provider>
  );
};
