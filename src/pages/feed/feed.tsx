import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from '../../services/store';
import { selectFeedOrders, selectFeedLoading, fetchFeeds } from '@slices';
import { selectIngredients, fetchIngredients } from '@slices';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectFeedOrders);
  const isLoading = useSelector(selectFeedLoading);
  const ingredients = useSelector(selectIngredients);
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (!hasLoaded.current && !isLoading) {
      hasLoaded.current = true;
      dispatch(fetchFeeds());
    }
  }, []);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, []);

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  if (isLoading || !ingredients.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
