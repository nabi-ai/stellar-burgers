import { FC, ReactNode } from 'react';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import {
  selectCurrentUser,
  selectAuthInitialized,
  selectAuthLoading
} from '@slices';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: ReactNode;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyUnAuth = false
}) => {
  const user = useSelector(selectCurrentUser);
  const isInit = useSelector(selectAuthInitialized);
  const isLoading = useSelector(selectAuthLoading);
  const location = useLocation();

  // Показываем прелоадер пока инициализация не завершена
  if (!isInit || isLoading) {
    return <Preloader />;
  }

  // Если маршрут только для неавторизованных, а пользователь авторизован
  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} replace />;
  }

  // Если маршрут защищенный, а пользователь не авторизован
  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  // Все проверки пройдены - рендерим children
  return <>{children}</>;
};

// AuthRoute - это просто обертка над ProtectedRoute с onlyUnAuth=true
export const AuthRoute: FC<{ children: ReactNode }> = ({ children }) => (
  <ProtectedRoute onlyUnAuth>{children}</ProtectedRoute>
);
