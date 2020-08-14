import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const selectUser = (reduxState) => {
	return reduxState.user
}

const selectPizzas = (reduxState) => {
	return reduxState.pizzas.slice().sort((a, b) => {
		return b.bought - a.bought
	})
}

const selectFavorites = (reduxState) => {
	return reduxState.user.favorites
}

const selectIngredients = (reduxState) => {
	return reduxState.pizzas.ingredients
}

export default function PizzaList() {
	const [filters, setFilters] = useState({})
	const [sort, set_sort] = useState('')
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	const pizzas = useSelector(selectPizzas)
	// const favorites = useSelector(selectFavorites)
	// const ingredients = useSelector(selectIngredients)
	// console.log('PizzaList -> ingredients', ingredients)

	const pizzaIngredients = pizzas.map((p) => p.ingredients) //new array with all the ingredients
	// console.log('PizzaList -> pizzaIngredients', pizzaIngredients)

	const uniqueIngredients = pizzaIngredients.reduce((acc, ings) => {
		//not sure what reduce does, but we create a new array with only unique ingredients.
		ings.forEach((ing) => !acc.includes(ing) && acc.push(ing))
		return acc
	})
	// console.log('PizzaList -> uniqueIngredients', uniqueIngredients)

	const onFilterClick = (name) => {
		//update the filter object
		const newFilter = {
			...filters,
			[name]: !filters[name],
		}
		setFilters(newFilter)
	}
	// console.log(filters)

	const activeFilters = Object.keys(filters).filter((name) => filters[name]) //return ingredient if it's true..
	// console.log(activeFilters)

	const filteredPizzas = !activeFilters.length
		? pizzas
		: pizzas.filter((p) => {
				return p.ingredients.some((ingredient) =>
					activeFilters.includes(ingredient)
				)
		  })
	console.log('PizzaList -> filteredPizzas', filteredPizzas)

	function compare_name(pizzaA, pizzaB) {
		return pizzaA.name.localeCompare(pizzaB.name)
	}

	function compare_health(pizzaA, pizzaB) {
		return pizzaA.id - pizzaB.id
	}
	function compare_pop(pizzaA, pizzaB) {
		return pizzaB.bought - pizzaA.bought
	}

	if (sort === 'name') {
		filteredPizzas.sort(compare_name)
	} else if (sort === 'pop') {
		filteredPizzas.sort(compare_pop)
	} else if (sort === 'health') {
		filteredPizzas.sort(compare_health)
	}

	//map inlcude by id...

	const change_sorting = (event) => {
		// console.log('new sort order', event.target.value)
		set_sort(event.target.value)
	}

	return (
		<div>
			<h1>Pizza Explorer</h1>
			<p>
				Welcome back, <strong>{user.name}</strong>! Your favorite pizzas:
			</p>
			<p>The list of pizza's</p>
			<p>Filter the pizza's based on ingredients!</p>
			<div>
				{uniqueIngredients.map((ing) => (
					<button key={ing} onClick={() => onFilterClick(ing)}>
						{ing}
					</button>
				))}
			</div>
			<br />
			<div>
				<select onChange={change_sorting}>
					<option value='sort'>Sort</option>
					<option value='name'>Name</option>
					<option value='pop'>Popularity</option>
					<option value='health'>Healthiness</option>
				</select>
			</div>
			<ul>
				{filteredPizzas.map((pizza) => {
					const toggle = () => {
						dispatch({
							type: 'TOGGLE_FAVORITE_PIZZA',
							payload: pizza.id,
						})
					}
					return (
						<li key={pizza.id}>
							<div>
								<ul>
									<b>{pizza.name}</b>{' '}
									<button onClick={toggle}>
										{user.favorites.includes(pizza.id) ? '♥' : '♡'}
									</button>{' '}
									- Ate this {pizza.bought} times.
								</ul>
								{pizza.description}
								<br />
								<br />
							</div>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
