import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { categories } from "../constants";
import { getCategories } from "../api";
import {urlFor} from "../sanity";
function Categories() {
	const [activeCategory, setActiveCategory] = useState(null);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		getCategories().then((data) => {
			setCategories(data);
		});
	}, []);
	// console.log("got data", categories);
	return (
		<View className="mt-4">
			<ScrollView
				className="overflow-hidden"
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: 15 }}
			>
				{categories.map((cate, index) => {
					let isActive = cate._id === activeCategory;
					let btnClass = isActive ? "bg-blue-600" : "bg-red-800";
					let textClass = isActive
						? "font-semibold text-gray-800"
						: "text-gray-500";
					return (
						<View
							key={cate._id}
							className="flex justify-center items-center mr-6"
						>
							<TouchableOpacity
								className={`rounded-xl shadow bg-red-400 p-3 ${btnClass}`}
								onPress={() => setActiveCategory(cate._id)}
							>
								<Image
									style={{ width: 45, height: 45 }}
									source={{
										// uri: urlFor(cate.image.asset._ref).url(),
										uri: urlFor(cate.image.asset._ref).url(),
									}}
								/>
							</TouchableOpacity>
							<Text className={`text-sm ${textClass}`}>{cate.name}</Text>
						</View>
					);
				})}
			</ScrollView>
		</View>
	);
}

export default Categories;
