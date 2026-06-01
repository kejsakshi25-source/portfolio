import { Anton_400Regular } from '@expo-google-fonts/anton';
import {
  BricolageGrotesque_400Regular,
  BricolageGrotesque_500Medium,
  BricolageGrotesque_600SemiBold,
  BricolageGrotesque_700Bold,
  BricolageGrotesque_800ExtraBold,
} from '@expo-google-fonts/bricolage-grotesque';
import { InstrumentSerif_400Regular_Italic } from '@expo-google-fonts/instrument-serif';
import { Lora_400Regular_Italic } from '@expo-google-fonts/lora';
import { PTMono_400Regular } from '@expo-google-fonts/pt-mono';
import {
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as SystemUI from 'expo-system-ui';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';

import { BlobBackground } from '@/src/components/decor/BlobBackground';
import { ContentProvider } from '@/src/data/ContentProvider';
import { ThemeProvider } from '@/src/theme/ThemeProvider';
import { colors } from '@/src/theme/tokens';

// Keep the (sand-colored) splash up until fonts are ready — avoids FOUT.
SplashScreen.preventAutoHideAsync();
void SystemUI.setBackgroundColorAsync(colors.sand);

const navigationTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    background: 'transparent',
    card: 'transparent',
  },
};

/**
 * Root layout — loads the five brand fonts, gates render on them, then
 * provides the theme. Single light theme; the portfolio has no dark mode.
 * Phase 2 adds the ContentProvider here.
 */
export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    BricolageGrotesque_400Regular,
    BricolageGrotesque_500Medium,
    BricolageGrotesque_600SemiBold,
    BricolageGrotesque_700Bold,
    BricolageGrotesque_800ExtraBold,
    InstrumentSerif_400Regular_Italic,
    Anton_400Regular,
    PTMono_400Regular,
    Lora_400Regular_Italic,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Hold the splash while fonts load; still render if a font fails (don't hard-block).
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ContentProvider>
          {/* Sand base + drifting blob layer behind every screen — the RN port
              of the source's flat sand bg + animated `.blobs`. Rendered on web
              too, so web parity matches native (and the bg is never blank). */}
          <NavigationThemeProvider value={navigationTheme}>
            <View style={{ flex: 1, backgroundColor: colors.sand }}>
              <BlobBackground />
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: 'transparent' },
                }}
              />
            </View>
          </NavigationThemeProvider>
          <StatusBar style="dark" />
        </ContentProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
