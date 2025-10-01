import { FC, useMemo } from 'react';
import { useSelector } from '../../services/store';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '@ui';
import {
  selectFeedOrders,
  selectFeedTotal,
  selectFeedTotalToday
} from '@slices';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useSelector(selectFeedOrders);
  const total = useSelector(selectFeedTotal);
  const totalToday = useSelector(selectFeedTotalToday);

  // Используем useMemo для оптимизации вычислений
  const { readyOrders, pendingOrders } = useMemo(
    () => ({
      readyOrders: getOrders(orders, 'done'),
      pendingOrders: getOrders(orders, 'pending')
    }),
    [orders]
  );

  const feed = useMemo(
    () => ({
      orders,
      total,
      totalToday
    }),
    [orders, total, totalToday]
  );

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
