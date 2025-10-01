import React, { FC } from 'react';
import { IngredientDetailsUI } from '@ui';
import styles from './ingredient-details.module.css';

export const IngredientDetails: FC = () => (
  <div className={styles.container}>
    <div className={`${styles.title} text text_type_main-large mt-2 mb-4`}>
      Детали ингредиента
    </div>
    <IngredientDetailsUI />
  </div>
);
