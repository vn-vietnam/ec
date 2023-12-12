import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import Restaurant from "./Restaurant";

const Featured = ({ title, description, restaurants, id }) => {
	return (
		<View>
			<View className="flex-row justify-between items-center px-4">
				<View>
					<Text className="font-bold text-lg">{title}</Text>
					<Text className="text-gray-500 text-xs">{description}</Text>
				</View>
				<TouchableOpacity>
					<Text className="text-red-700 font-semibold">See All</Text>
				</TouchableOpacity>
			</View>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: 15 }}
				className="overflow-hidden py-5"
			>
				{restaurants.map((restaurant, index) => {
					return <Restaurant key={index} restaurant={restaurant} />;
				})}
			</ScrollView>
		</View>
	);
};

export default Featured;
