import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';
import {
  fetchIngredients,
  fetchOrderByNumber,
  selectIngredients
} from '@slices';
import styles from './ingredient-details.module.css';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredients);

  // Находим ингредиент по ID из URL параметра
  const ingredientData = ingredients.find((item) => item._id === id);

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [dispatch]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <div className={styles.container}>
      <IngredientDetailsUI ingredientData={ingredientData} />
    </div>
  );
};
