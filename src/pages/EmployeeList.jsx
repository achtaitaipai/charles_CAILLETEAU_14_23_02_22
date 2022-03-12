import { Link } from 'react-router-dom'
import Table from '../components/Table/Table'

export default function EmployeeList({ list }) {
	return (
		<>
			<h1>Current Employees</h1>
			<Table
				list={list}
				keys={['firstName', 'lastName', 'startDate', 'department', 'birthDate', 'street', 'city', 'state', 'zipCode']}
				labels={['First Name', 'Last Name', 'Start Date', 'Department', 'Date of Birth', 'Street', 'City', 'State', 'Zip Code']}
			/>
			<Link to="/" className="home">
				Home
			</Link>
		</>
	)
}
