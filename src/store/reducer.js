const initialState = {
	user: {
		name: 'Micah',
		favorites: [
			161235,
			// 357314
		],
		darkMode: false,
	},
	pizzas: [
		{
			id: 161235,
			name: 'Pizza Margherita',
			description:
				'The typical Neapolitan pizza, made with San Marzano tomatoes, mozzarella cheese, fresh basil, salt and extra-virgin olive oil.',
			bought: 5,
			ingredients: ['tomatoes', 'mozzarella', 'basil', 'oil'],
		},
		{
			id: 67283,
			name: 'Pizza Napoletana',
			description:
				'Neapolitan pizza also known as Naples-style pizza, is a style of pizza made with tomatoes and mozzarella cheese.',
			bought: 2,
			ingredients: ['tomatoes', 'mozzarella', 'oil'],
		},
		{
			id: 357311,
			name: 'Pizza Bianca ',
			description:
				'White pizza, which omits tomato sauce from the equation, often substituting it with pesto or sour cream.',
			bought: 10,
			ingredients: ['ricotta', 'mozzarella', 'garlic'],
		},
		// {
		// 	id: 357314,
		// 	name: 'Pizza Hawaii',
		// 	description: 'The pizza for people who are not in their right mind',
		// 	bought: 15,
		// 	ingredients: ['ham', 'mozzarella', 'pineapple'],
		// },
	],
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case 'ADD_PIZZA': {
			// => Ask yourself: what is action.payload?
			return {
				...state,
				pizzas: [
					...state.pizzas,
					{
						id: action.payload.id,
						name: action.payload.name,
						description: action.payload.description,
						bought: 0,
					},
				],
			}
		}
		case 'TOGGLE_FAVORITE_PIZZA': {
			// => Ask yourself: what is action.payload?
			const id = action.payload
			let favorites = state.user.favorites
			if (favorites.includes(id)) {
				favorites.splice(favorites.indexOf(id), 1)
			} else {
				favorites.push(id)
			}
			return {
				...state,
				user: {
					...state.user,
					favorites,
					// because we want to show fav pizza of user
				},
			}
		}
		case 'TOGGLE_DARKMODE': {
			return {
				...state,
				user: { ...state.user, darkMode: !state.user.darkMode },
			}
		}
		default: {
			return state
		}
	}
}
