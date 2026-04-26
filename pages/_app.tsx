import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ReduxProvider, store } from '@/store';
import * as authActions from '@/store/actions/authActions';
import { theme } from '@/styles/theme';
import '@/services/mockUtils'; // Initialize mock utilities
import '@/styles/globals.css';

function AppWrapper({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();

  // Initialize auth from localStorage on app load
  useEffect(() => {
    const initializeAuth = () => {
      const authToken = localStorage.getItem('authToken');
      const refreshToken = localStorage.getItem('refreshToken');
      const userStr = localStorage.getItem('user');

      if (authToken && refreshToken && userStr) {
        try {
          const user = JSON.parse(userStr);
          dispatch(
            authActions.restoreSession({
              user,
              authToken,
              refreshToken,
            }) as any
          );
        } catch (error) {
          // Invalid stored data, clear it
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
        }
      }
    };

    initializeAuth();
  }, [dispatch]);

  return (
    <>
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </>
  );
}

export default function App(props: AppProps) {
  return (
    <ReduxProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppWrapper {...props} />
      </ThemeProvider>
    </ReduxProvider>
  );
}
