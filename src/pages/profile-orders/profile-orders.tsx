import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from '../../services/store';
import {
  selectProfileOrders,
  selectProfileOrdersLoading,
  selectProfileOrdersError,
  fetchProfileOrders
} from '@slices';
import { selectIngredients, fetchIngredients } from '@slices';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectProfileOrders);
  const isLoading = useSelector(selectProfileOrdersLoading);
  const error = useSelector(selectProfileOrdersError);
  const ingredients = useSelector(selectIngredients);

  useEffect(() => {
    dispatch(fetchProfileOrders());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Ошибка загрузки заказов: {error}</div>;
  }

  return <ProfileOrdersUI orders={orders} />;
};
