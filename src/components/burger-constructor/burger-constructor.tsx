import { FC, useMemo } from 'react';
import { useSelector } from '../../services/store';
import { useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { BurgerConstructorUI } from '@ui';
import {
  selectConstructorBun,
  selectConstructorItems,
  selectCreatedOrder,
  selectShowOrderPreparingStarted,
  setShowOrderPreparingStarted
} from '@slices';
import { selectOrderLoading, selectCurrentOrder, createOrder } from '@slices';
import { selectCurrentUser } from '@slices';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bun = useSelector(selectConstructorBun);
  const items = useSelector(selectConstructorItems);
  const showOrderPreparingStarted = useSelector(
    selectShowOrderPreparingStarted
  );
  const isOrderLoading = useSelector(selectOrderLoading);
  const createdOrderModalData = useSelector(selectCreatedOrder);
  const user = useSelector(selectCurrentUser);

  const constructorItems = {
    bun,
    ingredients: items
  };

  const onOrderClick = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (
      !constructorItems.bun ||
      isOrderLoading ||
      !constructorItems.ingredients
    )
      return;

    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    await dispatch(createOrder(ingredientIds));
  };

  const closeOrderModal = () => {
    dispatch(setShowOrderPreparingStarted(false));
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      (constructorItems.ingredients
        ? constructorItems.ingredients.reduce((s: number, v) => s + v.price, 0)
        : 0),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      isOrderLoading={isOrderLoading}
      constructorItems={constructorItems}
      createdOrderModalData={createdOrderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      showOrderPreparingStarted={showOrderPreparingStarted}
    />
  );
};
