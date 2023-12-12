import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { featured } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../slices/restaurantSlice";
import {
	removeFromBasket,
	selectBasketItems,
	selectBasketTotal,
} from "../slices/basketSlice";
import { urlFor } from "../sanity";

const CartScreen = () => {
	const restaurant = useSelector(selectRestaurant);
	const [groupedItems, setGroupedItems] = useState([]);
	const basketItems = useSelector(selectBasketItems);
	const basketTotal = useSelector(selectBasketTotal);

	const dispatch = useDispatch();
	const navigation = useNavigation();
	const deliveryFee = 2;
	// console.log(basketItems);

	const itemData = basketItems
		// .sort((a, b) => a.name.localeCompare(b.name))
		.reduce((accumulator, current) => {
			const existingItem = accumulator.find((item) => item.id === current.id);

			if (existingItem) {
				existingItem.number += 1; // Increment the count for duplicates
			} else {
				accumulator.push({ ...current, number: 1 });
			}

			return accumulator;
		}, []);
		// console.log(itemData)
	return (
		<SafeAreaView className=" bg-white flex-1">
			<StatusBar style="auto" />
			{/* top button */}
			<View className="relative py-4 shadow-sm">
				<TouchableOpacity
					style={{ backgroundColor: "red" }}
					onPress={navigation.goBack}
					className="absolute z-10 rounded-full p-1 shadow top-5 left-2"
				>
					<Icon.ArrowLeft strokeWidth={3} stroke="white" />
				</TouchableOpacity>
				<View>
					<Text className="text-center font-bold text-xl">Your cart</Text>
					<Text className="text-center text-gray-500">
						{/* {resturant.title} */}
						{restaurant.name}
					</Text>
				</View>
			</View>
			{/* time delivery */}
			<View
				style={{  }}
				className="bg-gray-200 flex-row px-4 items-center"
			>
				<Image
					source={require("../assets/bikeGuy.png")}
					className="w-20 h-20 rounded-full"
				/>
				<Text className="flex-1 pl-4">Deliver in 20-30 minutes</Text>
				<TouchableOpacity>
					<Text style={{ color: "yellow" }} className="font-bold">
						Change
					</Text>
				</TouchableOpacity>
			</View>
			{/* Dishes */}
			<ScrollView
				showsVerticalScrollIndicator={false}
				className=" pt-5"
				contentContainerStyle={{
					paddingBottom: 50,
				}}
			>
				{itemData.map((item) => {
					return (
						<View
							key={item.id}
							className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md"
						>
							<Text style={{ color: "red" }} className="font-bold">
								{item.number} x
							</Text>
							<Image className="h-14 w-14 rounded-full"  source={{ uri: urlFor(item.image).url() }} />
							<Text className="flex-1 font-bold text-gray-700">
								{item.name}
							</Text>
							<Text className="font-semibold text-base">
								${item.price * item.number}
							</Text>
							<TouchableOpacity
								className="p-1 rounded-full"
								style={{ backgroundColor: "red" }}
								onPress={() => dispatch(removeFromBasket({ id: item.id }))}
							>
								<Icon.Minus
									strokeWidth={2}
									height={20}
									width={20}
									stroke="white"
								/>
							</TouchableOpacity>
						</View>
					);
				})}
			</ScrollView>
			{/* totals */}
			<View
				style={{  }}
				className="border-gray-400y border-[1px] p-6 px-8 rounded-t-3xl space-y-4"
			>
				<View className="flex-row justify-between">
					<Text className="text-gray-700">Subtotal</Text>
					<Text className="text-gray-700">${basketTotal}</Text>
				</View>
				<View className="flex-row justify-between">
					<Text className="text-gray-700">Delivery Fee</Text>
					<Text className="text-gray-700">$2</Text>
				</View>
				<View className="flex-row justify-between">
					<Text className="font-extrabold">Order Total</Text>
					<Text className="font-extrabold">${basketTotal+deliveryFee}</Text>
				</View>
				<View>
					<TouchableOpacity
						style={{ backgroundColor: "red" }}
						onPress={() => navigation.navigate("PreparingOrder")}
						className="p-3 rounded-full"
					>
						<Text className="text-white text-center font-bold text-lg">
							Place Order
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default CartScreen;

// {Object.entries(groupedItems).map((item, key) => {
// 	{/* console.log(item) */}
// 	return (
// 		<View
// 			key={key}
// 			className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md"
// 		>
// 			<Text style={{ color: "red" }} className="font-bold">
// 				{item.length} x
// 			</Text>
// 			{/* <Image className="h-14 w-14 rounded-full"  source={{ uri: urlFor(item[0]?.image).url() }} /> */}
// 			<Text className="flex-1 font-bold text-gray-700">
// 				{item.name}
// 			</Text>
// 			<Text className="font-semibold text-base">${item.price}</Text>
// 			<TouchableOpacity
// 				className="p-1 rounded-full"
// 				style={{ backgroundColor: "red" }}
// 				onPress={() => dispatch(removeFromBasket({ id: item[0]?.id }))}
// 			>
// 				<Icon.Minus
// 					strokeWidth={2}
// 					height={20}
// 					width={20}
// 					stroke="white"
// 				/>
// 			</TouchableOpacity>
// 		</View>
// 	);
// })}
