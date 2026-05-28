import { configureStore, Middleware } from '@reduxjs/toolkit';
import authReducer from '../features/auth/store/authSlice';
import leadReducer from '../features/leads/store/leadSlice';
import loanFormReducer from '../features/loans/store/loanFormSlice';

const AUTH_ACTIONS = ['auth/login/fulfilled', 'auth/logout', 'auth/hydrate'];

const storageMiddleware: Middleware = (store) => (next) => (action: any) => {
  const result = next(action);
  if (typeof window !== 'undefined') {
    // Handle Auth Persistence
    if (AUTH_ACTIONS.includes(action.type)) {
      const user = store.getState().auth.user;
      if (user) {
        localStorage.setItem('auth_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('auth_user');
      }
    }
    
    // Handle Loan Form Persistence
    if (action.type.startsWith('loanForm/')) {
      const loanState = store.getState().loanForm;
      localStorage.setItem('loan_form_state', JSON.stringify(loanState));
    }
  }
  return result;
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    leads: leadReducer,
    loanForm: loanFormReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(storageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
