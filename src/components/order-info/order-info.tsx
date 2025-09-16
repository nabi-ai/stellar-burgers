import { FC, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from '../../services/store';
import { Preloader } from '@ui';
import { OrderInfoUI } from '@ui';
import { TIngredient } from '@utils-types';
import {
  selectCurrentOrder,
  selectOrderLoading,
  fetchOrderByNumber
} from '@slices';
import { selectIngredients, fetchIngredients } from '@slices';

export const OrderInfo: FC = () => {
  const { number, id } = useParams<{ number?: string; id?: string }>();
  const dispatch = useDispatch();
  const orderData = useSelector(selectCurrentOrder);
  const isLoading = useSelector(selectOrderLoading);
  const ingredients = useSelector(selectIngredients);

  const orderNumber = number || id;

  useEffect(() => {
    if (orderNumber) {
      dispatch(fetchOrderByNumber(parseInt(orderNumber)));
    }
  }, [orderNumber, dispatch]);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  const orderInfo = useMemo(() => {
    if (!orderData || ingredients.length === 0 || !orderData.ingredients)
      return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, itemId) => {
        const ingredient = ingredients.find((ing) => ing._id === itemId);
        if (!ingredient) return acc;

        if (!acc[itemId]) {
          acc[itemId] = {
            ...ingredient,
            count: 1
          };
        } else {
          acc[itemId].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (isLoading) {
    return <Preloader />;
  }

  if (!orderInfo) {
    return <Preloader />; // или компонент с ошибкой
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
