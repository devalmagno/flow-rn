import { useCallback } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import Router from './src/Router';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Inter400': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter500': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter600': require('./assets/fonts/Inter-SemiBold.ttf'),
    'Poppins400': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins500': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins600': require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded)
      await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;
  return (
    <NavigationContainer>
        <View onLayout={onLayoutRootView} style={styles.container}>
          <Router />
        </View>
      <StatusBar style='light' />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 38 : 0,
    backgroundColor: '#0E0E0E',
  },
});