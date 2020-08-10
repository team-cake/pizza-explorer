import React from 'react'
import PizzaList from './components/PizzaList'
import AddPizzaForm from './components/AddPizzaForm'
import './App.css'

function App() {
	return (
		<div className='App'>
			<center>
				<PizzaList />
        <br/>
        <AddPizzaForm />
			</center>
		</div>
	)
}

export default App
