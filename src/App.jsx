import React, { useState } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import CreateEmployee from './pages/CreateEmployee'
import EmployeeList from './pages/EmployeeList'
import { fakeEmployeeList } from './assets/fakeemployeeList'

export default function App() {
	const [employees, setEmployees] = useState(fakeEmployeeList)

	const addEmployee = newEmployee => {
		const arr = [...employees]
		arr.push(newEmployee)
		setEmployees(arr)
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<CreateEmployee handleSubmit={addEmployee} />}></Route>
				<Route path="/employee-list" element={<EmployeeList list={employees} />}></Route>
				<Route path="*" element={<h1>404</h1>}></Route>
			</Routes>
		</BrowserRouter>
	)
}
