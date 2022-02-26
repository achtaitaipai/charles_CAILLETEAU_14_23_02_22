import styled from 'styled-components'

export const StyledDateInput = styled.div`
	* {
		box-sizing: border-box;
	}
	position: relative;
	margin-top: 1rem;
	input {
		width: 100%;
	}
	[type='date']::-webkit-inner-spin-button {
		display: none;
	}
	[type='date']::-webkit-calendar-picker-indicator {
		display: none;
	}
	ul {
		list-style: none;
		padding: 0;
		margin: 0.2rem 0;
	}
	.datePicker {
		position: absolute;
		top: 2rem;
		min-width: 200px;
		header {
			display: flex;
			background: #ededed;
			width: 100%;
			align-items: color-interpolation-filters;
			padding: 0.2rem;
		}
		.monthInput {
			display: flex;
			align-items: center;
			gap: 0.2rem;
			min-width: 110px;
			justify-content: space-between;
			button {
				width: 1.2rem;
				height: 1.2rem;
				display: grid;
				justify-content: center;
				align-items: center;
				cursor: pointer;
			}
			svg {
				width: 0.4rem;
				height: 0.4rem;
			}
		}
		.dropdown {
			margin-left: auto;
		}
		.daysContainer {
			padding: 0.2rem;
			border: 1px solid black;
			box-sizing: border-box;
			width: 100%;
			background: #ffff;
			.daysNames {
				display: grid;
				grid-template-columns: repeat(7, 1fr);
				gap: 0.2rem;
				li {
					text-align: center;
					margin: 0;
				}
			}

			.daysInput {
				display: grid;
				grid-template-columns: repeat(7, 1fr);
				place-items: center;
				gap: 2px;
				li {
					background: #d7ebff;
					width: 100%;
					border-radius: 2px;
					color: black;
				}
				li.grey {
					background: #ededed;
					color: grey;
				}
				button {
					width: 100%;
					background: none;
					border: none;
					cursor: pointer;
					color: inherit;
					&.selected {
						outline: 1px solid black;
					}
				}
			}
		}
	}
`
