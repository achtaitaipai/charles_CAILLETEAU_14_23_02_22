import styled from 'styled-components'

export const StyledDropDown = styled.div`
	position: relative;
	button {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.selected {
		position: relative;
		padding: 0.3125rem;
		background: #ededed;
		border: 1px solid #cccccc;
		border-radius: 3px;
		display: block;
		width: 100%;
		text-align: left;
		display: flex;
		align-items: center;
		cursor: pointer;
	}
	svg {
		height: 0.7em;
		margin-left: auto;
	}
	ul {
		width: 100%;
		box-sizing: border-box;
		list-style: none;
		display: flex;
		flex-direction: column;
		padding: 0;
		margin: 0;
		border: 1px solid #cccccc;
		border-top: none;
		position: absolute;
		background: white;
		max-height: 10em;
		overflow: auto;
		scrollbar-color: #999 #333;
	}
	ul::-webkit-scrollbar {
		width: 10px; /* Mostly for vertical scrollbars */
		height: 10px; /* Mostly for horizontal scrollbars */
	}
	ul::-webkit-scrollbar-thumb {
		/* Foreground */
		background: #cccccc;
		border-radius: 5px;
	}
	ul::-webkit-scrollbar-track {
		/* Background */
		background: none;
	}
	li [aria-selected='true'] {
		background: #007fff;
		color: white;
	}

	.itemBtn {
		display: block;
		background: none;
		border: none;
		outline: none;
		padding: 0;
		margin: 0;
		cursor: pointer;
		width: 100%;
		height: 100%;
		padding: 0.3125rem;
		text-align: left;
	}
`
