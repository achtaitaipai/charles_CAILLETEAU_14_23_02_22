import { useEffect, useRef, useState } from 'react'
import React from 'react'
import { StyledDropDown } from './style.js'

export default function DropDown({ listItem, selected = 0, handleSelect }) {
	const getSelected = slt => {
		if (typeof slt === 'string') {
			return listItem.find(el => el === slt) ? listItem.find(el => el === slt) : listItem[0]
		} else if (typeof slt === 'number') {
			return listItem[slt] ? listItem[slt] : listItem[0]
		}
		return listItem[0]
	}

	const dropDownRef = useRef(null)
	const selectedRef = useRef(null)
	const listBoxRef = useRef(null)
	const [selectedItem, setSelectedItem] = useState(getSelected(selected))
	const [currentItem, setCurrentItem] = useState(-1)
	const [expanded, setExpanded] = useState(false)

	const selectClick = e => {
		e.preventDefault()
		expanded ? close() : open()
	}
	const optionClick = e => {
		e.preventDefault()
		selectItem(parseInt(e.target.getAttribute('data-value')))
	}

	useEffect(() => {
		const handleClickOutside = e => {
			if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
				close()
			}
		}
		document.addEventListener('click', handleClickOutside, true)
		return () => {
			document.removeEventListener('click', handleClickOutside, true)
		}
	}, [])

	const handleKeyDown = e => {
		if (e.code === 'Tab' || e.code === 'Escape') {
			close()
		} else if (e.code === 'ArrowDown') {
			e.preventDefault()
			setCurrentItem(Math.min(currentItem + 1, listItem.length - 1))
		} else if (e.code === 'ArrowUp' && currentItem !== -1) {
			e.preventDefault()
			setCurrentItem(Math.max(currentItem - 1, 0))
		} else if (e.code === 'Space' || e.code === 'Enter') {
			e.preventDefault()
			if (currentItem >= 0) {
				selectItem(currentItem)
			}
			close()
		}
	}

	const handleMouseEnter = e => {
		setCurrentItem(parseInt(e.target.getAttribute('data-value')))
	}

	const open = () => {
		setExpanded(true)
		listBoxRef.current.focus()
	}
	const close = () => {
		setExpanded(false)
		setCurrentItem(-1)
	}
	const selectItem = id => {
		setSelectedItem(getSelected(id))
		close()
		handleSelect(id, listItem[id])
	}

	return (
		<StyledDropDown className="dropdown" ref={dropDownRef} onKeyDown={expanded ? handleKeyDown : null}>
			<button className="selected" ref={selectedRef} onClick={selectClick} aria-haspopup="listbox" aria-expanded={expanded}>
				{' '}
				{selectedItem}{' '}
				<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
					{expanded ? <polygon points="0 9, 10 9, 5 2" /> : <polygon points="0 1, 10 1, 5 8" />}
				</svg>
			</button>
			<ul role="listbox" tabIndex={-1} ref={listBoxRef} style={{ opacity: expanded ? '1' : '0' }}>
				{expanded &&
					listItem.map((item, id) => {
						return (
							<li key={id} role="option" className="dropdown__item">
								<button
									className="itemBtn"
									data-value={id}
									onClick={optionClick}
									tabIndex="-1"
									onMouseEnter={handleMouseEnter}
									aria-selected={id === currentItem}
								>
									{item}
								</button>
							</li>
						)
					})}
			</ul>
		</StyledDropDown>
	)
}
