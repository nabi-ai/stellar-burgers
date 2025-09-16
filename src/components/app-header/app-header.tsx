import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AppHeaderUI } from '@ui';
import { selectCurrentUser } from '@slices';

export const AppHeader: FC = () => {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  const { isConstructorActive, isFeedActive, isProfileActive } = {
    isConstructorActive: location.pathname === '/',
    isFeedActive: location.pathname === '/feed',
    isProfileActive: location.pathname.startsWith('/profile')
  };

  return (
    <AppHeaderUI
      userName={user?.name}
      isConstructorActive={isConstructorActive}
      isFeedActive={isFeedActive}
      isProfileActive={isProfileActive}
    />
  );
};
