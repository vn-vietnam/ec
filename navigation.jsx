import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import CartScreen from "./screens/CartScreen";
import PreparingOrder from "./screens/PreparingOrder";
import DeliverScreen from "./screens/DeliverScreen";

const Stack = createNativeStackNavigator();

function Navigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Restaurant" component={RestaurantScreen} />
				<Stack.Screen
					name="Cart"
					options={{ presentation: "modal", headerShown: false }}
					component={CartScreen}
				/>
				<Stack.Screen
					name="PreparingOrder"
					options={{ presentation: "fullScreenModal", headerShown: false }}
					component={PreparingOrder}
				/>
				<Stack.Screen
					name="Delivery"
					options={{ presentation: "fullScreenModal", headerShown: false }}
					component={DeliverScreen}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default Navigation;