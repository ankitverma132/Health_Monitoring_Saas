import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  Box,
  Container,
  Stack,
  Typography,
  Card,
  CardContent,
  AppBar,
  Toolbar,
} from '@mui/material';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f9fafb' }}>
      {/* Header */}
      <AppBar position="static" sx={{ bgcolor: 'background.paper', color: 'text.primary' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={3}>
          {/* Welcome Card */}
          <Card>
            <CardContent>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
                Welcome, {user?.first_name}!
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                This is your health monitoring dashboard. More features coming soon.
              </Typography>
            </CardContent>
          </Card>

          {/* Profile Information Card */}
          <Card>
            <CardContent>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 2 }}>
                Profile Information
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ display: 'grid', gridTemplateColumns: '200px 1fr' }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                    Email:
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.primary' }}>
                    {user?.email}
                  </Typography>
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: '200px 1fr' }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                    Name:
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.primary' }}>
                    {user?.first_name} {user?.last_name}
                  </Typography>
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: '200px 1fr' }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                    Auth Provider:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.primary', textTransform: 'capitalize' }}
                  >
                    {user?.auth_provider}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}
