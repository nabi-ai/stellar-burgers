import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Modal, OrderInfo, IngredientDetails } from '@components';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';

import { ProtectedRoute, AuthRoute } from '@components';
import { AppHeader } from '@components';
import { AppInit } from './AppInit';

import '../../index.css';
import styles from './app.module.css';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.backgroundLocation;

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppInit />
      <AppHeader />

      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />

        <Route path='/feed'>
          <Route index element={<Feed />} />
          <Route path=':number' element={<OrderInfo />} />
        </Route>

        <Route path='/ingredients/:id' element={<IngredientDetails />} />

        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        >
          <Route index element={<Profile />} />
          <Route path='orders' element={<ProfileOrders />} />
          <Route
            path='orders/:number'
            element={
              <ProtectedRoute>
                <OrderInfo />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path='/login'
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        <Route
          path='/register'
          element={
            <AuthRoute>
              <Register />
            </AuthRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <AuthRoute>
              <ForgotPassword />
            </AuthRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <AuthRoute>
              <ResetPassword />
            </AuthRoute>
          }
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal title={'Детали заказа'} onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title={'Детали заказа'} onClose={handleModalClose}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
