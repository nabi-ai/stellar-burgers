import { Routes, Route, useLocation } from 'react-router-dom';
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
import { IngredientDetailsUI } from '@ui';

const App = () => {
  const location = useLocation();
  const background = location.state?.background;

  return (
    <div className={styles.app}>
      <AppInit />
      <AppHeader />

      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />

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

        <Route path='/feed'>
          <Route index element={<Feed />} />
          <Route path=':id' element={<OrderInfo />} />
        </Route>

        <Route path='/ingredients/:id' element={<IngredientDetails />} />

        <Route path='/profile'>
          <Route
            index
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path='orders/:id'
            element={
              <ProtectedRoute>
                <OrderInfo />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title={'Детали ингредиента'}
                onClose={() => window.history.back()}
              >
                <IngredientDetailsUI />
              </Modal>
            }
          />
          <Route
            path='/feed/:id'
            element={
              <Modal title='' onClose={() => window.history.back()}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:id'
            element={
              <ProtectedRoute>
                <Modal title='' onClose={() => window.history.back()}>
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
