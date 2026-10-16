import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { SEO } from '../components/SEO';

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <SEO />
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#F7F8FA' },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="order" />
          <Stack.Screen name="tracking" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="contact" />
          <Stack.Screen name="terms" />
          <Stack.Screen name="admin" />
          <Stack.Screen name="notifications" />
          <Stack.Screen name="rating" />
        </Stack>
      </AuthProvider>
    </ErrorBoundary>
  );
}
