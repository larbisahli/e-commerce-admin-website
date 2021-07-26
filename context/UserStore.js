// import { useLocalStorage } from '../hooks';
import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

export const UserStoreContext = createContext();

export const UserStoreProvider = ({ children }) => {
  const [UserStore, setUserStore] = useState({
    account_uid: null,
    email: null,
    first_name: null,
    last_name: null,
    privileges: []
  });
  return (
    <UserStoreContext.Provider value={[UserStore, setUserStore]}>
      {children}
    </UserStoreContext.Provider>
  );
};

UserStoreProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
