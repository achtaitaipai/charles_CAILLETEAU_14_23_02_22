import { useEffect, useRef, useState } from 'react'
import DropDown from '../dropdown/DropDown'
import { StyledDateInput } from './style'

export default function DateInput({ min, max = new Date(), handleChange }) {
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
	let minDate
	if (min) {
		minDate = new Date(min)
		minDate.setDate(minDate.getDate() - 1)
	} else {
		minDate = new Date(max)
		minDate.setFullYear(minDate.getFullYear() - 100)
	}
	const maxDate = new Date(max)

	const years = Array.from({ length: maxDate.getFullYear() - minDate.getFullYear() + 1 }, (x, i) => (maxDate.getFullYear() - i).toString())

	const inputRef = useRef(null)

	const [currentMonth, setCurrentMonth] = useState(dateIsValid(new Date()) ? new Date().getMonth() : 0)
	const year = dateIsValid(new Date()) ? new Date().getFullYear() : maxDate.getFullYear()
	const [currentYear, setCurrentYear] = useState(year)
	const [displayYear, setDisplayYear] = useState(year)
	const [selected, setSelected] = useState(null)
	const [expanded, setExpanded] = useState(false)

	const dateInputRef = useRef(null)

	useEffect(() => {
		const handleClickOutside = e => {
			if (dateInputRef.current && !dateInputRef.current.contains(e.target)) {
				setExpanded(false)
			}
		}
		document.addEventListener('click', handleClickOutside, true)
		return () => {
			document.removeEventListener('click', handleClickOutside, true)
		}
	}, [])

	const handleNextMonth = e => {
		e.preventDefault()
		let newYear = currentYear
		let newMonth = currentMonth
		if (currentMonth === 11) {
			newMonth = 0
			newYear = parseInt(currentYear) + 1
		} else {
			newMonth = currentMonth + 1
		}
		const date = new Date(newYear, newMonth, 1)
		if (date <= maxDate) {
			setCurrentYear(newYear.toString())
			setDisplayYear(newYear.toString())
			setCurrentMonth(newMonth)
		}
	}
	const handlePrevMonth = e => {
		e.preventDefault()
		let newYear = currentYear
		let newMonth = currentMonth
		if (currentMonth === 0) {
			newMonth = 11
			newYear = currentYear - 1
		} else {
			newMonth = currentMonth - 1
		}
		const lastDay = new Date(newYear, newMonth, 0).getDate()
		const date = new Date(newYear, newMonth, lastDay)
		if (date >= minDate) {
			setCurrentYear(newYear)
			setDisplayYear(newYear)
			setCurrentMonth(newMonth)
		}
	}

	const handleSelectYear = (id, value) => {
		setCurrentYear(value.toString())
		const minimum = new Date(value.toString(), currentMonth, 1)
		if (minimum < minDate) {
			setCurrentMonth(minDate.getMonth())
		}
		const maximum = new Date(value.toString(), currentMonth, new Date(currentYear, currentMonth + 1, 0).getDate())
		if (maximum < maxDate) {
			setCurrentMonth(maxDate.getMonth())
		}
	}

	const handleSelect = (e, date) => {
		e.preventDefault()
		if (dateIsValid(date)) {
			setSelected({ day: date.getDate(), month: date.getMonth(), year: date.getFullYear() })
			inputRef.current.value = formatDate(date)
			if (handleChange) {
				handleChange(date)
			}
		}
	}

	const handleInputChange = e => {
		const date = new Date(e.target.value)
		if (dateIsValid(date)) {
			setSelected({ day: date.getDate(), month: date.getMonth(), year: date.getFullYear() })
			setCurrentMonth(date.getMonth())
			setCurrentYear(date.getFullYear())
			setDisplayYear(date.getFullYear())
			if (handleChange) {
				handleChange(date)
			}
		}
	}

	const open = e => {
		e.preventDefault()
		setExpanded(true)
	}

	const handleKeyDown = e => {
		if (e.code === 'Escape') {
			setExpanded(false)
		}
	}

	const handleToday = e => {
		e.preventDefault()
		const today = new Date()
		setCurrentMonth(today.getMonth())
		setCurrentYear(today.getFullYear())
		setDisplayYear(today.getFullYear())
		setSelected({ day: today.getDate(), month: today.getMonth(), year: today.getFullYear() })
		inputRef.current.value = formatDate(today)
	}

	const buttonDay = date => {
		return (
			<button onClick={e => handleSelect(e, date)} className={compareDate(date) ? 'selected' : ''}>
				{date.getDate()}
			</button>
		)
	}

	return (
		<StyledDateInput ref={dateInputRef} onKeyDown={handleKeyDown}>
			<input type="date" onChange={handleInputChange} onFocus={open} onClick={open} ref={inputRef} />
			{expanded && (
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
						{dateIsValid(new Date()) && (
							<button className="todayBtn" onClick={handleToday}>
								Aujourd'hui
							</button>
						)}
					</div>
				</div>
			)}
		</StyledDateInput>
	)
}
