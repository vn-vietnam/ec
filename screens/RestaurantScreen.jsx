import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as Icon from "react-native-feather";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { StatusBar } from "expo-status-bar";
import { setRestaurant, selectRestaurant } from "../slices/restaurantSlice";
import { useDispatch, useSelector } from "react-redux";
import { emptyBasket } from "../slices/basketSlice";
import { urlFor } from "../sanity";
function RestaurantScreen() {
	const {
		params: {
			id,
			name,
			image,
			rating,
			address,
			description,
			dishes,
			lng,
			category,
			reviews,
			lat,
		},
	} = useRoute();
	const restaurant = useSelector(selectRestaurant);
	// console.log(restaurant);
	const navigation = useNavigation();
	const dispatch = useDispatch();
	useEffect(() => {
		if (restaurant && restaurant.id != id) {
			dispatch(emptyBasket());
		}
		dispatch(
			setRestaurant({
				id,
				name,
				image,
				rating,
				address,
				description,
				dishes,
				lng,
				category,
				reviews,
				lat,
			})
		);
	}, []);
	return (
		<View className="">
			<BasketIcon />
			<StatusBar style="light" />

			<ScrollView>
				<View className="relative">
					<Image
						className="w-full h-72"
						source={{ uri: urlFor(image.asset._ref).url() }}
					/>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						className="absolute top-14 left-4 bg-white p-2 rounded-full shadow"
					>
						<Icon.ArrowLeft strokeWidth={3} stroke="red" />
					</TouchableOpacity>
				</View>
				<View
					className="bg-white -mt-12 pt-6"
					style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
				>
					<View className="px-5">
						{/* name */}
						<Text className="text-3xl my-1 font-bold">{name}</Text>
						{/* information */}
						<View className="flex-row space-x-2 my-1 flex-wrap gap-0.5">
							<View className=" flex-row items-center  space-x-1 justify-start">
								<Text className="text-xs my-2">
									<Text className="">{rating}</Text>
									<Image
										source={require("../assets/fullStar.png")}
										className="h-4 w-4"
									/>
									<Text className="">
										{reviews} reviews{" "}
										<Text className="font-semibold">{category}</Text>
									</Text>
								</Text>
							</View>
							<View className="flex-row items-center space-x-1">
								<Icon.MapPin width="15" height="15" color="gray" />
								<Text className="text-gray-400">Nearby - {address}</Text>
							</View>
						</View>
						{/* description */}
						<Text className="text-gray-400 mt-2">{description}</Text>
					</View>
				</View>
				<View className=" pb-20 bg-white">
					<Text className="px-4 py-4 text-2xl font-bold">Menu</Text>
					{dishes.map((dish) => (
						<DishRow
							key={dish._id}
							id={dish._id}
							name={dish.name}
							description={dish.description}
							price={dish.price}
							image={dish.image}
						/>
					))}
				</View>
			</ScrollView>
		</View>
	);
}

export default RestaurantScreen;
