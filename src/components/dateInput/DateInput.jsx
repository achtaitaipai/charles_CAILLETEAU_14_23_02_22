import { useRef, useState } from 'react'
import DropDown from '../dropdown/DropDown'
import { StyledDateInput } from './style'

export default function DateInput({ min, max }) {
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

	const minDate = new Date(min)
	const maxDate = new Date(max)

	const years = Array.from({ length: maxDate.getFullYear() - minDate.getFullYear() + 1 }, (x, i) => (maxDate.getFullYear() - i).toString())

	const inputRef = useRef(null)

	const [currentMonth, setCurrentMonth] = useState(1)
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
	const [displayYear, setDisplayYear] = useState(new Date().getFullYear())
	const [selected, setSelected] = useState(null)

	const compareDate = date => {
		if (selected === null) return false
		return selected.day === date.getDate() && selected.month === date.getMonth() && selected.year === date.getFullYear()
	}

	const dateIsValid = date => {
		return date >= minDate && date <= maxDate
	}

	const formatDate = date => {
		const twoDigits = num => {
			const str = num.toString()
			return str.length < 2 ? '0' + str : str
		}
		const day = twoDigits(date.getDate())
		const month = twoDigits(date.getMonth() + 1)
		const year = twoDigits(date.getFullYear())
		return year + '-' + month + '-' + day
	}

	const handleNextMonth = e => {
		e.preventDefault()
		if (currentMonth === 11) {
			setCurrentMonth(0)
			const newYear = currentYear + 1
			setCurrentYear(newYear)
			setDisplayYear(newYear)
		} else {
			setCurrentMonth(currentMonth + 1)
		}
	}
	const handlePrevMonth = e => {
		e.preventDefault()
		if (currentMonth === 0) {
			setCurrentMonth(11)
			const newYear = currentYear - 1
			setCurrentYear(newYear)
			setDisplayYear(newYear)
		} else {
			setCurrentMonth(currentMonth - 1)
		}
	}

	const handleSelectYear = (id, value) => {
		setCurrentYear(value.toString())
	}

	const handleSelect = (e, date) => {
		e.preventDefault()
		if (dateIsValid(date)) {
			setSelected({ day: date.getDate(), month: date.getMonth(), year: date.getFullYear() })
			inputRef.current.value = formatDate(date)
		}
	}

	const handleChange = e => {
		const date = new Date(e.target.value)
		if (dateIsValid(date)) {
			setSelected({ day: date.getDate(), month: date.getMonth(), year: date.getFullYear() })
			setCurrentMonth(date.getMonth())
			setCurrentYear(date.getFullYear())
			setDisplayYear(date.getFullYear())
			console.log('date change', e.target.value)
		}
	}

	const buttonDay = date => {
		return (
			<button onClick={e => handleSelect(e, date)} className={compareDate(date) ? 'selected' : ''}>
				{date.getDate()}
			</button>
		)
	}

	return (
		<StyledDateInput>
			<input type="date" onChange={handleChange} ref={inputRef} />
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
					<DropDown className="yearInput" listItem={years} selected={displayYear.toString()} handleSelect={handleSelectYear} />
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
								<li key={i} className={dateIsValid(d) ? 'grey' : 'invalid'}>
									{buttonDay(d)}
								</li>
							)
						})}
						{Array.from({ length: daysInMonth() }, (x, i) => {
							const d = new Date(currentYear, currentMonth, i + 1)
							return (
								<li key={i} className={dateIsValid(d) ? '' : 'invalid'}>
									{buttonDay(d)}
								</li>
							)
						})}
						{Array.from({ length: 6 - lastDayInMonth() }, (x, i) => {
							let d = new Date(currentYear, currentMonth, i)
							d.setDate(d.getDate() + daysInMonth() + 1)
							return (
								<li key={i} className={dateIsValid(d) ? 'grey' : 'invalid'}>
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
