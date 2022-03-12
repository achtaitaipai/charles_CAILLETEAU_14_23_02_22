import styled from 'styled-components'

export const StyledDataTable = styled.div`
	width: 80%;
	margin: auto;
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row-gap;
		width: 100%;
		label {
			display: flex;
			flex-direction: row;
			align-items: center;
		}
	}
	table {
		width: 100%;
		border-collapse: collapse;
		margin-bottom: 1rem;
		th {
			.key {
				display: flex;
				font-weight: 700;
				gap: 1rem;
				justify-content: center;
				align-items: color-interpolation-filters;
			}
			.btns {
				display: flex;
				flex-direction: column;
			}
			button {
				padding: 0;
				margin: 0;
				width: 0.6rem;
				height: 0.6rem;
				display: grid;
				align-items: center;
				justify-items: center;
				background: none;
				border: none;
				cursor: pointer;
			}
			svg {
				width: 100%;
				height: 100%;
			}
			button:hover svg,
			button.active svg {
				filter: invert(34%) sepia(87%) saturate(3112%) hue-rotate(197deg) brightness(102%) contrast(107%);
			}
		}
		tbody {
			border: 1px solid black;
			border-left: 0;
			border-right: 0;
			tr {
				background: #f1f1f1;
			}
			tr:nth-child(2n + 1) {
				background: #fafafa;
			}
			tr:hover {
				background: #007fff;
				color: white;
			}
		}
		td {
			text-align: center;
			padding: 0.4rem;
		}
	}
	footer {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		.pages {
			display: flex;
			align-items: center;
			button {
				background: none;
				border: 0;
				cursor: pointer;
			}
			ul {
				display: flex;
				align-items: center;
				list-style: none;
				margin: 0;
				padding: 0;
			}
			.currentPage {
				border-radius: 50%;
				width: auto;
				aspect-ratio: 1;
				border: 1px solid black;
			}
		}
	}
`
