import React from 'react'
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

export default function PizzaList() {
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	const pizzas = useSelector(selectPizzas)
	const favorites = useSelector(selectFavorites)
	// console.log('fav', favorites)
	return (
		<div>
			<h1>Pizza Explorer</h1>
			<p>
				Welcome back, <strong>{user.name}</strong>! Your favorite pizzas:
			</p>
			<p>The list of pizza's</p>
			<br />
			<ul>
				{pizzas.map((pizza) => {
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
