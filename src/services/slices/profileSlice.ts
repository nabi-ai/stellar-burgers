import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { RootState } from '../store';

type ProfileState = {
  userData: TUser | null;
  isEditing: boolean;
  originalData: TUser | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: ProfileState = {
  userData: null,
  isEditing: false,
  originalData: null,
  isLoading: false,
  error: null
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.userData = action.payload;
      state.originalData = action.payload;
    },
    startEditing: (state) => {
      state.isEditing = true;
      state.originalData = state.userData;
    },
    cancelEditing: (state) => {
      state.isEditing = false;
      if (state.originalData) {
        state.userData = state.originalData;
      }
    },
    updateProfileData: (state, action: PayloadAction<Partial<TUser>>) => {
      if (state.userData) {
        state.userData = { ...state.userData, ...action.payload };
      }
    },
    saveProfileData: (state) => {
      state.isEditing = false;
      state.originalData = state.userData;
      state.error = null;
    },
    setProfileLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setProfileError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearProfile: (state) => {
      state.userData = null;
      state.isEditing = false;
      state.originalData = null;
      state.error = null;
    }
  }
});

// export const {
//   setUser,
//   startEditing,
//   cancelEditing,
//   updateProfileData,
//   saveProfileData,
//   setProfileLoading,
//   setProfileError,
//   clearProfile
// } = profileSlice.actions;

export default profileSlice.reducer;

// export const selectProfileState = (state: RootState) => state.profile;
// export const selectProfileUser = (state: RootState) => state.profile.userData;
// export const selectProfileIsEditing = (state: RootState) =>
//   state.profile.isEditing;
export const selectProfileOriginalData = (state: RootState) =>
  state.profile.originalData;
export const selectProfileLoading = (state: RootState) =>
  state.profile.isLoading;
export const selectProfileError = (state: RootState) => state.profile.error;
export const selectProfileHasChanges = (state: RootState) => {
  const { userData, originalData } = state.profile;
  if (!userData || !originalData) return false;
  return (
    userData.name !== originalData.name || userData.email !== originalData.email
  );
};
