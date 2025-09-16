import React, { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { fetchUser, initialize } from '@slices';
import { getCookie } from '../../utils/cookie';
import { fetchIngredients } from '@slices';

export const AppInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    dispatch(fetchIngredients());

    if (accessToken && refreshToken) {
      dispatch(fetchUser()).catch(() => {
        dispatch(initialize());
      });
    } else {
      dispatch(initialize());
    }
  }, []);

  return null;
};
