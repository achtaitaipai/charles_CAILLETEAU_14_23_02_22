import { useState } from 'react'
import DropDown from '../dropdown/DropDown'
import { StyledDateInput } from './style'

export default function DateInput() {
	const monthName = n => {
		const date = new Date(0, n, 0)
		return date.toLocaleDateString('fr-FR', { month: 'long' })
	}
	const dayNames = Array.from({ length: 7 }, (x, index) => {
		const date = new Date(0, 0, (index + 1) % 7)
		return date.toLocaleDateString('fr-FR', { weekday: 'long' }).substring(0, 2)
	})
	const daysInMonth = () => {
		return new Date(currentYear, currentMonth + 1, 0).getDate()
	}
	const firstDayInMonth = () => {
		const d = new Date(currentYear, currentMonth, 1).getDay() - 1
		return d === -1 ? 6 : d
	}
	const lastDayInMonth = () => {
		return new Date(currentYear, currentMonth, daysInMonth()).getDay() - 1
	}

	const [currentMonth, setCurrentMonth] = useState(1)
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
	const [selected, setSelected] = useState(null)

	const handleNextMonth = e => {
		e.preventDefault()
		if (currentMonth === 11) {
			setCurrentMonth(0)
			setCurrentYear(currentYear + 1)
		} else {
			setCurrentMonth(currentMonth + 1)
		}
	}
	const handlePrevMonth = e => {
		e.preventDefault()
		if (currentMonth === 0) {
			setCurrentMonth(11)
			setCurrentYear(currentYear - 1)
		} else {
			setCurrentMonth(currentMonth - 1)
		}
		console.log(currentYear)
	}

	const handleSelectYear = (id, value) => {
		setCurrentYear(value.toString())
	}

	const handleSelect = (e, date) => {
		e.preventDefault()
		console.log(date)
		setSelected({ day: date.toLocaleDateString({ day: 'numeric' }), month: date.getMonth(), year: date.getFullYear() })
		console.log(selected)
	}
	const compareDate = date => {
		if (selected === null) return false
		return selected.day === date.toLocaleDateString({ day: 'numeric' }) && selected.month === date.getMonth() && selected.year === date.getFullYear()
	}
	const buttonDay = date => {
		return (
			<button onClick={e => handleSelect(e, date)} className={compareDate(date) ? 'selected' : ''}>
				{date.toLocaleDateString('fr-FR', { day: 'numeric' })}
			</button>
		)
	}
	return (
		<StyledDateInput>
			<input type="date" />
			<div className="datePicker">
				<header>
					<div className="monthInput">
						<button onClick={handlePrevMonth}>
							<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
								<line x1="0" y1="5" x2="10" y2="0" stroke="black" strokeWidth={2} />
								<line x1="0" y1="5" x2="10" y2="10" stroke="black" strokeWidth={2} />
							</svg>
						</button>
						<span>{monthName(currentMonth + 1)}</span>
						<button onClick={handleNextMonth}>
							<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
								<line x1="10" y1="5" x2="0" y2="0" stroke="black" strokeWidth={2} />
								<line x1="10" y1="5" x2="0" y2="10" stroke="black" strokeWidth={2} />
							</svg>
						</button>
					</div>
					<DropDown
						className="yearInput"
						listItem={['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017']}
						selected={currentYear.toString()}
						handleSelect={handleSelectYear}
					/>
				</header>
				<div className="daysContainer">
					<ul className="daysNames">
						{dayNames.map((d, i) => {
							return <li key={i}>{d}</li>
						})}
					</ul>
					<ul className="daysInput">
						{Array.from({ length: firstDayInMonth() }, (x, i) => {
							let d = new Date(currentYear, currentMonth, i + 1)
							d.setDate(d.getDate() - firstDayInMonth())
							return (
								<li key={i} className="grey">
									{buttonDay(d)}
								</li>
							)
						})}
						{Array.from({ length: daysInMonth() }, (x, i) => {
							const d = new Date(currentYear, currentMonth, i + 1)
							return <li key={i}>{buttonDay(d)}</li>
						})}
						{Array.from({ length: 6 - lastDayInMonth() }, (x, i) => {
							let d = new Date(currentYear, currentMonth, i)
							d.setDate(d.getDate() + daysInMonth() + 1)
							return (
								<li key={i} className="grey">
									{buttonDay(d)}
								</li>
							)
						})}
					</ul>
				</div>
			</div>
		</StyledDateInput>
	)
}
