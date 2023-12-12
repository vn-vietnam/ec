import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import * as Icon from "react-native-feather";
import { urlFor } from "../sanity";
import {
	addToBasket,
	makeSelectBasketItemsById,
	removeFromBasket,
	selectBasketItemsById,
} from "../slices/basketSlice";
import { useDispatch, useSelector } from "react-redux";
const DishRow = ({ name, description, id, price, image }) => {
	const dispatch = useDispatch();

	const basketItems = useSelector((state) => selectBasketItemsById(state, id));
	// console.log(basketItems);
	// const basketItems = useSelector(
	// 	(state) => selectBasketItemsById(state, id),
	// );
	// const selectBasketItemsById = makeSelectBasketItemsById();

	// const basketItems = createSelector((state) => selectBasketItemsById(state, id));
	// const basketItemsNumber = useSelector(selectBasketItems);
	//  useSelector(state=> selectBasketItemsById(state, id));
	const handleIncrease = () => {
		dispatch(
			addToBasket({ id, name, price, image: image.asset._ref, description })
		);
		// console.log(image.asset._ref);
	};
	const handleDecrease = () => {
		dispatch(removeFromBasket({ id }));
	};
	return (
		<View className="flex-row items-center bg-white border-gray-500 border-[1px]   p-3 rounded-3xl shadow-2xl mb-3 mx-2">
			{/* <Text>DishRow</Text> */}
			<Image
				className=""
				source={{ uri: urlFor(image.asset._ref).url() }}
				style={{ height: 100, width: 100 }}
			/>
			<View className="flex flex-1 space-y-3">
				<View className="pl-3">
					<Text className="text-xl">{name}</Text>
					<Text className="text-gray-700">{description}</Text>
				</View>
				<View className="flex-row pl-3 justify-between items-center">
					<Text className="text-gray-700 text-lg font-bold">${price}</Text>
					<View className="flex-row items-center">
						<TouchableOpacity
							onPress={handleDecrease}
							disabled={!basketItems.length}
							className="p-1 rounded-full"
							style={{ backgroundColor: "red" }}
						>
							<Icon.Minus
								strokeWidth={2}
								height={20}
								width={20}
								stroke="white"
							/>
						</TouchableOpacity>
						<Text className="px-3">{basketItems.length}</Text>

						<TouchableOpacity
							onPress={handleIncrease}
							className="p-1 rounded-full"
							style={{ backgroundColor: "red" }}
						>
							<Icon.Plus
								strokeWidth={2}
								height={20}
								width={20}
								stroke="white"
							/>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
};

export default DishRow;
