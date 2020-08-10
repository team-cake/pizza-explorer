import React from 'react'
import { useSelector } from 'react-redux'

const selectUser = (reduxState) => {
	return reduxState.user
}

const listOfPizza = (reduxState) => {
	return reduxState.pizzas
}

export default function PizzaList() {
	const user = useSelector(selectUser)
	const pizzas = useSelector(listOfPizza)
	console.log('what kind of pizza', pizzas)
	return (
		<div>
			<h1>Pizza Explorer</h1>
			<p>
				Welcome back, <strong>{user.name}</strong>! Your favorite pizzas:
			</p>
			<p>TODO: the list of pizzas</p>
			<br />
			<p>
                {pizzas.sort((a, b) => b.bought - a.bought)
                .map((pizza) => {
					return (
						<div>
							<ul><b>Name: {pizza.name}</b> - Ate {pizza.bought} of these!</ul> 
                            Description: {pizza.description} 
						</div>
					)
				})}
			</p>
		</div>
	)
}
