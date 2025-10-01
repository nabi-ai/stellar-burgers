import React, { FC, memo, useEffect } from 'react';
import styles from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../../services/store';
import { fetchIngredients, selectIngredients } from '@slices';
import { Preloader } from '../preloader';

export const IngredientDetailsUI: FC = memo(() => {
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
  const { name, image_large, calories, proteins, fat, carbohydrates } =
    ingredientData;

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <img
          className={styles.img}
          alt='изображение ингредиента.'
          src={image_large}
        />
      </div>
      <h3 className='text text_type_main-medium mt-2 mb-4'>{name}</h3>
      <ul className={`${styles.nutritional_values} text_type_main-default`}>
        <li className={styles.nutritional_value}>
          <p className={`text mb-2 ${styles.text}`}>Калории, ккал</p>
          <p className={`text text_type_digits-default`}>{calories}</p>
        </li>
        <li className={styles.nutritional_value}>
          <p className={`text mb-2 ${styles.text}`}>Белки, г</p>
          <p className={`text text_type_digits-default`}>{proteins}</p>
        </li>
        <li className={styles.nutritional_value}>
          <p className={`text mb-2 ${styles.text}`}>Жиры, г</p>
          <p className={`text text_type_digits-default`}>{fat}</p>
        </li>
        <li className={styles.nutritional_value}>
          <p className={`text mb-2 ${styles.text}`}>Углеводы, г</p>
          <p className={`text text_type_digits-default`}>{carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
});
