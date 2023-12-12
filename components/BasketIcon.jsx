import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../slices/basketSlice";

const BasketIcon = () => {
	const navigation = useNavigation();
    const basketItems = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal);
	if(!basketItems.length) return null;
	return (
		<View className="absolute bottom-5 w-full z-50">
			<TouchableOpacity	
				onPress={() => navigation.navigate("Cart")}
				style={{ backgroundColor: "red" }}
				className="flex-row justify-between items-center mx-5 rounded-full p-4 py-3 shadow-lg"
			>
				<View
					className="p-2 px-4 rounded-full"
					style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
				>
					<Text className="font-extrabold text-white text-lg">
						{basketItems.length}
					</Text>
				</View>

				<Text className="flex-1 text-center font-extrabold text-white text-lg">
					View Cart
				</Text>
				<Text className="font-extrabold text-white text-lg">
					${basketTotal}
					
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default BasketIcon;
