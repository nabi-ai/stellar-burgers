import { ProfileUI } from '@ui-pages';
import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from '../../services/store';
import {
  selectCurrentUser,
  updateUser,
  selectAuthLoading,
  selectAuthError
} from '@slices';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  const [updateError, setUpdateError] = useState<string>('');

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  useEffect(() => {
    if (error) {
      setUpdateError(error);
    }
  }, [error]);

  const isFormChanged =
    formValue.name !== (user?.name || '') ||
    formValue.email !== (user?.email || '') ||
    !!formValue.password;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setUpdateError('');

    if (user) {
      const result = await dispatch(
        updateUser({
          name: formValue.name,
          email: formValue.email,
          password: formValue.password || undefined
        })
      );

      if (updateUser.rejected.match(result)) {
        setUpdateError(result.payload as string);
      } else if (updateUser.fulfilled.match(result)) {
        setFormValue((prev) => ({ ...prev, password: '' }));
      }
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
    setUpdateError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
    if (updateError) {
      setUpdateError('');
    }
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      updateUserError={updateError}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
