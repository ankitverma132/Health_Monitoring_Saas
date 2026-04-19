import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import * as authActions from '@/store/actions/authActions';
import toast from 'react-hot-toast';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  FormControl,
} from '@mui/material';
import { GitHub as GitHubIcon } from '@mui/icons-material';

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  // Show error toast
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email');
      return;
    }

    setIsSubmitting(true);
    dispatch(authActions.loginRequest(formData) as any);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom right, #f0f4ff, #e0e7ff)',
        py: 2,
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            p: 4,
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
              Health Monitor
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Sign in to your account
            </Typography>
          </Box>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
            <Stack spacing={2}>
              {/* Email */}
              <FormControl fullWidth>
                <TextField
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading || isSubmitting}
                  placeholder="you@example.com"
                  variant="outlined"
                  autoComplete="email"
                />
              </FormControl>

              {/* Password */}
              <FormControl fullWidth>
                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading || isSubmitting}
                  placeholder="••••••••"
                  variant="outlined"
                  autoComplete="current-password"
                />
              </FormControl>

              {/* Forgot Password Link */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link href="/forgot-password" style={{ textDecoration: 'none' }}>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{
                      color: 'primary.main',
                      '&:hover': { textDecoration: 'underline' },
                      fontWeight: 500,
                      cursor: 'pointer',
                    }}
                  >
                    Forgot password?
                  </Typography>
                </Link>
              </Box>

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading || isSubmitting}
                sx={{ mt: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
              >
                {loading || isSubmitting ? (
                  <>
                    <CircularProgress size={20} color="inherit" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </Stack>
          </Box>

          {/* Divider */}
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Or continue with
            </Typography>
          </Divider>

          {/* GitHub OAuth Button */}
          <Button
            fullWidth
            variant="outlined"
            size="large"
            startIcon={<GitHubIcon />}
            href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/auth/github/authorize`}
            sx={{ mb: 3, textTransform: 'none', fontWeight: 600 }}
          >
            GitHub
          </Button>

          {/* Sign Up Link */}
          <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
            Don't have an account?{' '}
            <Link href="/register" style={{ textDecoration: 'none' }}>
              <Typography
                component="span"
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  '&:hover': { textDecoration: 'underline' },
                  cursor: 'pointer',
                }}
              >
                Sign up
              </Typography>
            </Link>
          </Typography>
        </Card>
      </Container>
    </Box>
  );
}
