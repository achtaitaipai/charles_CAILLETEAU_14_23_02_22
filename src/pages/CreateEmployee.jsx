import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../assets/style.css'
import DateInput from '../components/dateInput/DateInput'
import DropDown from '../components/dropdown/DropDown'
import { states } from '../assets/USstates'
import { Modal } from '@achtaitaipai/modal-reactjs-component'

export default function CreateEmployee({ handleSubmit }) {
	const statesNames = states.map(s => s.name)
	const stateAbbreviation = name => states.find(s => s.name === name)?.abbreviation

	const navigate = useNavigate()

	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [birthDate, setBirthDate] = useState('')
	const [startDate, setStartDate] = useState('')
	const [street, setStreet] = useState('')
	const [city, setCity] = useState('')
	const [state, setState] = useState(statesNames[0])
	const [zipCode, setZipCode] = useState('')
	const [department, setDepartment] = useState('Sales')
	const modalRef = useRef()

	return (
		<>
			<header>
				<h1>HRnet</h1>
				<Link to={'/employee-list'}>View Current Employees</Link>
				<h2>Create Employee</h2>
			</header>
			<main>
				<form
					onSubmit={e => {
						e.preventDefault()
						console.log(firstName, lastName, birthDate, startDate, street, city, state, zipCode, department)
						const newEmployee = {
							firstName,
							lastName,
							birthDate,
							startDate,
							street,
							city,
							state,
							zipCode,
							department,
						}
						handleSubmit(newEmployee)
						modalRef.current.open()
					}}
				>
					<label>
						First Name
						<input type="text" name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)}></input>
					</label>
					<label>
						Last Name
						<input type="text" name="lastName" value={lastName} onChange={e => setLastName(e.target.value)}></input>
					</label>
					<label>
						Date of Birth
						<DateInput
							handleChange={d => {
								setBirthDate(d)
							}}
						/>
					</label>
					<label>
						Start Date
						<DateInput
							handleChange={d => {
								setStartDate(d)
							}}
						/>
					</label>
					<fieldset>
						<legend>Adress</legend>
						<label>
							Street
							<input type="text" name="street" value={street} onChange={e => setStreet(e.target.value)}></input>
						</label>
						<label>
							City
							<input type="text" name="city" value={city} onChange={e => setCity(e.target.value)}></input>
						</label>
						<label>
							State
							<DropDown
								listItem={statesNames}
								selected={'2em'}
								handleSelect={(id, value) => {
									setState(stateAbbreviation(value))
								}}
							></DropDown>
						</label>
						<label>
							Zip Code
							<input type="number" name="zipCode" value={zipCode} onChange={e => setZipCode(e.target.value)}></input>
						</label>
					</fieldset>
					<label>
						Department
						<DropDown
							listItem={['Sales', 'Marketing', 'Engineering', 'Human Resources', 'Legal']}
							selected={'2em'}
							handleSelect={(id, value) => {
								setDepartment(value)
							}}
						></DropDown>
					</label>
					<input type="submit" value="Save" />
				</form>
				<Modal
					ref={modalRef}
					title="Création d'un employé"
					message={"L'employé a bien été ajouté à la liste"}
					onConfirm={() => navigate('/employee-list')}
					onClose={() => console.log('oe')}
				/>
			</main>
		</>
	)
}
