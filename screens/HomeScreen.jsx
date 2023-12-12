import { StatusBar } from "expo-status-bar";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Icon from "react-native-feather";
import Categories from "../components/Categories";
import { featured } from "../constants";
import Featured from "../components/Featured";
import { useNavigation } from "@react-navigation/native";
import { getFeaturedRestaurants } from "../api";
function HomeScreen() {
	const [featuredCategories, setFeaturedCategories] = useState([]);
	const navigation = useNavigation();
	useLayoutEffect(() => {
		navigation.setOptions({ headerShown: false });
	}, []);
	useEffect(() => {
		getFeaturedRestaurants().then((data) => {
			setFeaturedCategories(data);
		});
	}, []);
	return (
		<SafeAreaView>
			{/* color bar */}
			<StatusBar style="auto" />
			{/* search */}
			<View className="flex-row items-center space-x-2 px-4 pb-2 ">
				<View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
					<Icon.Search height="25" width="25" stroke="gray" />
					<TextInput
						placeholder="Restaurant"
						className="ml-2 flex-1"
						keyboardType="default"
					/>
					<View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
						<Icon.MapPin height="20" width="20" stroke="gray" />
						<Text className="text-gray-600">New York, NYC</Text>
					</View>
				</View>
				<View className="p-3 rounded-full bg-red-400">
					<Icon.Sliders height={20} width={20} stroke="white" />
				</View>
			</View>
			{/* main */}
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 50 }}
			>
				{/* Categoriess */}
				<Categories />
				{/* Featured */}
				<View className="mt-5">
					{featuredCategories?.map((category) => {
						return (
							<Featured
								key={category._id}
								id={category._id}
								title={category.name}
								restaurants={category?.restaurants}
								description={category.description}
								featuredCategory={category._type}
							/>
						);
					})}
					{/* {[featured, featured, featured].map((item, index) => {
						return (
							<Featured
								key={index}
								title={item.title}
								description={item.description}
								restaurants={item.restaurants}
							/>
						);
					})} */}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default HomeScreen;
