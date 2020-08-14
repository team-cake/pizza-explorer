import React from 'react'
import PizzaList from './components/PizzaList'
import AddPizzaForm from './components/AddPizzaForm'
import './App.css'
import { useDarkMode } from './store/selectors'
import { useSelector, useDispatch } from 'react-redux'

function App() {
	const isDarkmode = useSelector(useDarkMode)
	const dispatch = useDispatch()
	const background = isDarkmode
		? { backgroundColor: '#ffffff', color: 'black' }
		: { backgroundColor: '#000000', color: 'white' }

	const toggleDarkMode = () => {
		const action = {
			type: 'TOGGLE_DARKMODE',
		}
		dispatch(action)
	}
	return (
		<div className='App' style={background}>
			<div>
				<br />
				<button onClick={toggleDarkMode}>Dark mode or light mode</button>

				<center>
					<PizzaList />
					<br />
					<AddPizzaForm />
				</center>
			</div>
		</div>
	)
}

export default App
