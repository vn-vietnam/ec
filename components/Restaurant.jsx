import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import React from "react";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { urlFor } from "../sanity";
const Restaurant = ({ restaurant }) => {
	const navigation = useNavigation();
	return (
		<TouchableWithoutFeedback
			onPress={() => navigation.navigate("Restaurant", { ...restaurant })}
		>
			<View
				className="mr-6 rounded-3xl shadow-lg bg-slate-300"
				style={{
					shadowColor: "red",
					shadowRadius: 100,
				}}
			>
				<Image className="h-36 w-64 rounded-3xl" source={{uri: urlFor(restaurant.image.asset._ref).url(),}} />
				<View className="px-3 pb-4 space-y-2">
					<Text className="text-lg font-bold pt-2">{restaurant.name}</Text>
					<View className=" flex-row items-center space-x-1 justify-start">
						<Text className="text-xs">
							<Text className="">{restaurant.rating}</Text>
						<Image
							source={require("../assets/fullStar.png")}
							className="h-4 w-4"
						/>
							<Text className=""> {" "}
								{restaurant.reviews} reviews -{" "}
								<Text className="font-semibold">{restaurant.type.name}</Text>
							</Text>
						</Text>
					</View>
					<View className="flex-row items-center space-x-1 flex-wrap">
						<Icon.MapPin width="15" height="15" color="gray" />
						<Text className="text-gray-400 max-w-2">{restaurant.address}</Text>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default Restaurant;
