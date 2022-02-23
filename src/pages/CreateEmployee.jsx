import { Link } from 'react-router-dom'
import '../assets/style.css'
import DropDown from '../components/DropDown'

export default function CreateEmployee() {
	return (
		<>
			<header>
				<h1>HRnet</h1>
				<Link to={'/employee-list'}>View Current Employees</Link>
				<h2>Create Employee</h2>
			</header>
			<main>
				<form>
					<DropDown listItem={['1er', '2em', '3em', '4em']} selected={'2em'} handleSelect={(id, value) => alert(id + ' ' + value)}></DropDown>
					<label>
						First Name
						<input type="text" name="firstName"></input>
					</label>
					<label>
						Last Name
						<input type="text" name="lastName"></input>
					</label>
					<label>
						Date of Birth
						<input type="date" name="dateOfBirth"></input>
					</label>
					<label>
						Start Date
						<input type="date" name="startDate"></input>
					</label>
					<fieldset>
						<legend>Adress</legend>
						<label>
							Street
							<input type="text" name="street"></input>
						</label>
						<label>
							City
							<input type="text" name="city"></input>
						</label>
						<label>
							State
							<select name="state">
								<option value="alabama">Alabama</option>
								<option value="newyork">NewYork</option>
							</select>
						</label>
						<label>
							Zip Code
							<input type="number" name="zipCode"></input>
						</label>
					</fieldset>
					<label>
						Department
						<select name="department">
							<option value="sales">Sales</option>
							<option value="marketing">Marketing</option>
						</select>
					</label>
					<input type="submit" value="Save" />
				</form>
			</main>
		</>
	)
}
