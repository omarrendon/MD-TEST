import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from '../screens';
import {Locations} from '../screens/Locations';
import {colors} from '../theme/AppTheme';
import {Platform} from 'react-native';

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#9E9E9E',
        tabBarStyle: {
          borderTopColor: colors.secondary,
          borderTopWidth: 0.2,
          elevation: 0,
          marginBottom: Platform.OS === 'ios' ? 0 : 10,
        },
        tabBarLabelStyle: {
          fontSize: 17,
          marginBottom: Platform.OS === 'ios' ? 0 : 5,
        },
        tabBarIconStyle: {
          display: 'none',
        },
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Locations} />
    </Tab.Navigator>
  );
};
