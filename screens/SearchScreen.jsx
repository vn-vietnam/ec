import {
	View,
	Text,
	TextInput,
	FlatList,
	ActivityIndicator,
	ScrollView,
	Image,
	TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { getRestaurants } from "../api";
import { StatusBar } from "expo-status-bar";
import * as Icon from "react-native-feather";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

const SearchScreen = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [data, setData] = useState([]);
	const [fullData, setFullData] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigation = useNavigation();
	const handleSearch = (query) => {
		setSearchQuery(query);
	};

	useEffect(() => {
		setLoading(true);
		getRestaurants()
			.then((e) => {
				setLoading(false);
				setFullData(e);
				setData(e);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		const filteredData = data.filter((item) =>
			item.name.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setFullData(filteredData);
	}, [searchQuery]);

	return (
		<SafeAreaView>
			<StatusBar style="auto" />
			<View className="flex-row items-center space-x-2 px-4 pb-2 ">
				<View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
					<Icon.Search height="25" width="25" stroke="gray" />
					<TextInput
						className="w-[80%]"
						placeholder="Search"
						clearButtonMode="always"
						autoCapitalize="none"
						autoCorrect={false}
						value={searchQuery}
						onChangeText={(query) => handleSearch(query)}
					/>
				</View>
			</View>
			<ScrollView
				showsVerticalScrollIndicator={false}
				// contentContainerStyle={{ paddingBottom: 50 }}
				className="overflow-hidden bg-gray-300 h-40"
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: 15 }}
			>
				{/* <Text>hello</Text> */}
				{loading ? (
					<>
						<ActivityIndicator size={"large"} color={"red"} />
					</>
				) : (
					<>
						<FlatList
							className="w-[100%]"
							data={fullData}
							keyExtractor={(item) => item._id.toString()}
							renderItem={({ item }) => (
								<TouchableWithoutFeedback
									className=""
									onPress={() => navigation.navigate("Restaurant", { ...item })}
								>
									<View className="flex flex-row gap-3 my-1">
										<Image
											style={{ width: 50, height: 50 }}
											className="rounded-full"
											source={{
												// uri: urlFor(cate.image.asset._ref).url(),
												uri: urlFor(item.image.asset._ref).url(),
											}}
										/>
										<View>
											<Text>{item.name}</Text>
											<Text>{item.description}</Text>
										</View>
									</View>
								</TouchableWithoutFeedback>
							)}
						/>
					</>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

export default SearchScreen;
