import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import CreateEmployee from './pages/CreateEmployee'
import EmployeeList from './pages/EmployeeList'

ReactDOM.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<CreateEmployee />}></Route>
			<Route path="/employee-list" element={<EmployeeList />}></Route>
			<Route path="*" element={<h1>404</h1>}></Route>
		</Routes>
	</BrowserRouter>,
	document.getElementById('root')
)
