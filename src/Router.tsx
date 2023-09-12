import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import Player from './screens/Player';
import PlayerProvider from './contexts/PlayerContext';
import PlayerLoading from './components/PlayerLoading';

const Stack = createNativeStackNavigator();

export default function Router() {

    return (
        <PlayerProvider>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: "#0E0E0E", },
                    headerTintColor: "#fff",
                    headerTitleStyle: { fontFamily: 'Inter600', fontSize: 14, },
                }}
            >
                <Stack.Screen
                    name='Home'
                    component={Home}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='Player'
                    component={Player}
                    options={{
                        headerTransparent: true,
                        headerStyle: {
                            backgroundColor: "transparent",
                        }
                    }}
                />

            </Stack.Navigator>

            <PlayerLoading />
        </PlayerProvider>
    );
}