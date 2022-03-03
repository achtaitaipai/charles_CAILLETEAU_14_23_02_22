import { useState } from 'react'
import DropDown from '../dropdown/DropDown'
import { StyledDataTable } from './style'
export default function Table({ list, keys, labels }) {
	const [sortedList, setSortedList] = useState(list)
	const [filteredList, setFilteredList] = useState(list)
	const [search, setSearch] = useState('')
	const [nEntrie, setNEntries] = useState(10)
	const [currentPage, setCurrentPage] = useState(1)

	const nPage = () => Math.ceil(filteredList.length / nEntrie)

	const filterSearch = (arr, str) =>
		arr.filter(el => {
			for (const key in el) {
				if (el[key].toString().toLowerCase().includes(str.toLowerCase())) {
					return true
				}
			}
			return false
		})

	const filter = value => {
		setSearch(value)
		const arr = filterSearch(sortedList, value)
		setFilteredList(arr)
		setCurrentPage(Math.min(currentPage, Math.ceil(arr.length / nEntrie)))
	}
	const sort = (k, dir = 1) => {
		const arr = [...list].sort((a, b) => dir * a[k].toString().localeCompare(b[k].toString()))
		setSortedList(arr)
		setFilteredList(filterSearch(arr, search))
	}
	const handleNEntries = value => {
		setNEntries(parseInt(value))
		setCurrentPage(Math.min(currentPage, Math.ceil(filteredList.length / parseInt(value))))
	}

	const handlePrev = () => {
		setCurrentPage(Math.max(1, currentPage - 1))
	}

	const handleNext = () => {
		setCurrentPage(Math.min(nPage(), currentPage + 1))
	}

	return (
		<StyledDataTable>
			<header>
				<label>
					Show
					<DropDown listItem={['10', '25', '50', '100']} handleSelect={(id, value) => handleNEntries(value)} />
					entries
				</label>
				<label>
					Search :
					<input
						type="search"
						value={search}
						onChange={e => {
							filter(e.target.value)
						}}
					/>
				</label>
			</header>
			<table>
				<thead>
					<tr className="keys">
						{labels.map((k, index) => {
							return (
								<th key={index}>
									<div className="key">
										{k}
										<div className="btns">
											<button onClick={() => sort(keys[index])} type="button">
												<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
													<polygon points="0 9, 10 9, 5 2" />
												</svg>
											</button>
											<button onClick={() => sort(keys[index], -1)} type="button">
												<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
													<polygon points="0 1, 10 1, 5 8" />
												</svg>
											</button>
										</div>
									</div>
								</th>
							)
						})}
					</tr>
				</thead>
				<tbody>
					{filteredList.slice((currentPage - 1) * nEntrie, (currentPage - 1) * nEntrie + nEntrie).map((itm, idx) => {
						return (
							<tr key={idx}>
								{keys.map((k, idx) => {
									return <td key={idx}>{itm[k]}</td>
								})}
							</tr>
						)
					})}
				</tbody>
			</table>
			<footer>
				<p>
					Showing {(currentPage - 1) * nEntrie + 1} to {Math.min((currentPage - 1) * nEntrie + nEntrie, filteredList.length)} of {filteredList.length} entries
					{search !== '' && ` (filtered from ${list.length} total entries)`}
				</p>
				<div className="pages">
					<button onClick={handlePrev} type="button" disabled={currentPage === 1}>
						Previous
					</button>
					<ul>
						{Array.from({ length: nPage() }, (itm, idx) => (
							<li key={idx}>
								<button className={currentPage === idx + 1 ? 'currentPage' : ''} onClick={() => setCurrentPage(idx + 1)}>
									{idx + 1}
								</button>
							</li>
						))}
					</ul>
					<button onClick={handleNext} type="button" disabled={currentPage === nPage()}>
						Next
					</button>
				</div>
			</footer>
		</StyledDataTable>
	)
}
