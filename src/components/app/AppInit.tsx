import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { fetchUser, initialize } from '@slices';
import { getCookie } from '../../utils/cookie';

export const AppInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      dispatch(fetchUser()).catch(() => {
        dispatch(initialize());
      });
    } else {
      dispatch(initialize());
    }
  }, [dispatch]);

  return null;
};
