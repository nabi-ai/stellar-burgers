import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectProfileUser,
  selectProfileIsEditing,
  selectProfileHasChanges,
  setUser,
  startEditing,
  cancelEditing,
  updateProfileData,
  saveProfileData,
  setProfileLoading,
  setProfileError
} from '@slices';
import { selectCurrentUser } from '@slices';
import { updateUserApi } from '@api';

export const useProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const profileUser = useSelector(selectProfileUser);
  const isEditing = useSelector(selectProfileIsEditing);
  const hasChanges = useSelector(selectProfileHasChanges);

  useEffect(() => {
    if (user && !profileUser) {
      dispatch(setUser(user));
    }
  }, [user, profileUser, dispatch]);

  const handleStartEditing = () => {
    dispatch(startEditing());
  };

  const handleCancelEditing = () => {
    dispatch(cancelEditing());
  };

  const handleUpdateUserData = (data: { name?: string; email?: string }) => {
    dispatch(updateProfileData(data)); // Исправленное название
  };

  const handleSaveUserData = async () => {
    if (!profileUser || !hasChanges) return;

    dispatch(setProfileLoading(true));
    dispatch(setProfileError(null));

    try {
      const updatedUser = await updateUserApi({
        name: profileUser.name,
        email: profileUser.email
      });

      dispatch(saveProfileData());
      dispatch(setUser(updatedUser.user));
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Ошибка при обновлении данных';
      dispatch(setProfileError(errorMessage));
    } finally {
      dispatch(setProfileLoading(false));
    }
  };

  return {
    user: profileUser,
    isEditing,
    hasChanges,
    handleStartEditing,
    handleCancelEditing,
    handleUpdateUserData,
    handleSaveUserData
  };
};
