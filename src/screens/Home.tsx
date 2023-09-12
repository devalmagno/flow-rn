import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import PodcastScreen from './PodcastScreen';
import History from './History';

import DataProvider from '../contexts/DataContext';
import Loading from '../components/Loading';
import MiniPlayer from '../components/MiniPlayer';
import Menu from '../components/Menu';
import colors from '../globals/colors';
import Downloads from './Downloads';

const Tab = createBottomTabNavigator();

export default function Home() {
    return (
        <DataProvider>
                <Tab.Navigator screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        justifyContent: 'space-around',
                        backgroundColor: colors.background,
                        height: 64,
                        borderTopWidth: 0,
                        paddingBottom: 14,
                        paddingHorizontal: 10,
                    },
                    tabBarLabelStyle: {
                        fontFamily: 'Inter600',
                        fontSize: 12,
                    },
                    tabBarActiveTintColor: colors.primary,
                }}>
                    <Tab.Screen
                        name="PodcastScreen"
                        component={PodcastScreen}
                        options={{
                            tabBarLabel: 'Episódios',
                            tabBarIcon: ({ color }) => (
                                <Feather name="headphones" size={18} color={color} />
                            ),
                        }}
                    />

                    <Tab.Screen
                        name="History"
                        component={History}
                        options={{
                            tabBarLabel: 'Histórico',
                            tabBarIcon: ({ color }) => (
                                <FontAwesome5 name="history" size={16} color={color} />
                            ),
                        }}
                    />

                    <Tab.Screen
                        name="Downloads"
                        component={Downloads}
                        options={{
                            tabBarLabel: 'Downloads',
                            tabBarIcon: ({ color }) => (
                                <Feather name="download" size={16} color={color} />
                            ),
                        }}
                    />

                </Tab.Navigator>

                <MiniPlayer />
                <Menu />
                <Loading />
        </DataProvider>
    )
}