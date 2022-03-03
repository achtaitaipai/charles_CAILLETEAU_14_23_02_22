const firstNames = [
	'John',
	'michel',
	'andré',
	'paul',
	'pierre',
	'martin',
	'naoufel',
	'adam',
	'christope',
	'mohamed',
	'fanny',
	'raphaelle',
	'jennifer',
	'sarah',
	'tanguy',
	'thierry',
	'léa',
	'emily',
	'desir',
]

const lastNames = [
	'rachid',
	'ardisson',
	'pitt',
	'damon',
	'vandam',
	'hachour',
	'baffy',
	'martin',
	'klee',
	'douillet',
	'mcluhan',
	'gogh',
	'gainsbourg',
	'dalle',
	'kaito',
	'alizon',
	'youcef',
	'johnson',
]

const states = [
	{
		name: 'Alabama',
		abbreviation: 'AL',
	},
	{
		name: 'Alaska',
		abbreviation: 'AK',
	},
	{
		name: 'American Samoa',
		abbreviation: 'AS',
	},
	{
		name: 'Arizona',
		abbreviation: 'AZ',
	},
	{
		name: 'Arkansas',
		abbreviation: 'AR',
	},
	{
		name: 'California',
		abbreviation: 'CA',
	},
	{
		name: 'Colorado',
		abbreviation: 'CO',
	},
	{
		name: 'Connecticut',
		abbreviation: 'CT',
	},
	{
		name: 'Delaware',
		abbreviation: 'DE',
	},
	{
		name: 'District Of Columbia',
		abbreviation: 'DC',
	},
	{
		name: 'Federated States Of Micronesia',
		abbreviation: 'FM',
	},
	{
		name: 'Florida',
		abbreviation: 'FL',
	},
	{
		name: 'Georgia',
		abbreviation: 'GA',
	},
	{
		name: 'Guam',
		abbreviation: 'GU',
	},
	{
		name: 'Hawaii',
		abbreviation: 'HI',
	},
	{
		name: 'Idaho',
		abbreviation: 'ID',
	},
	{
		name: 'Illinois',
		abbreviation: 'IL',
	},
	{
		name: 'Indiana',
		abbreviation: 'IN',
	},
	{
		name: 'Iowa',
		abbreviation: 'IA',
	},
	{
		name: 'Kansas',
		abbreviation: 'KS',
	},
	{
		name: 'Kentucky',
		abbreviation: 'KY',
	},
	{
		name: 'Louisiana',
		abbreviation: 'LA',
	},
	{
		name: 'Maine',
		abbreviation: 'ME',
	},
	{
		name: 'Marshall Islands',
		abbreviation: 'MH',
	},
	{
		name: 'Maryland',
		abbreviation: 'MD',
	},
	{
		name: 'Massachusetts',
		abbreviation: 'MA',
	},
	{
		name: 'Michigan',
		abbreviation: 'MI',
	},
	{
		name: 'Minnesota',
		abbreviation: 'MN',
	},
	{
		name: 'Mississippi',
		abbreviation: 'MS',
	},
	{
		name: 'Missouri',
		abbreviation: 'MO',
	},
	{
		name: 'Montana',
		abbreviation: 'MT',
	},
	{
		name: 'Nebraska',
		abbreviation: 'NE',
	},
	{
		name: 'Nevada',
		abbreviation: 'NV',
	},
	{
		name: 'New Hampshire',
		abbreviation: 'NH',
	},
	{
		name: 'New Jersey',
		abbreviation: 'NJ',
	},
	{
		name: 'New Mexico',
		abbreviation: 'NM',
	},
	{
		name: 'New York',
		abbreviation: 'NY',
	},
	{
		name: 'North Carolina',
		abbreviation: 'NC',
	},
	{
		name: 'North Dakota',
		abbreviation: 'ND',
	},
	{
		name: 'Northern Mariana Islands',
		abbreviation: 'MP',
	},
	{
		name: 'Ohio',
		abbreviation: 'OH',
	},
	{
		name: 'Oklahoma',
		abbreviation: 'OK',
	},
	{
		name: 'Oregon',
		abbreviation: 'OR',
	},
	{
		name: 'Palau',
		abbreviation: 'PW',
	},
	{
		name: 'Pennsylvania',
		abbreviation: 'PA',
	},
	{
		name: 'Puerto Rico',
		abbreviation: 'PR',
	},
	{
		name: 'Rhode Island',
		abbreviation: 'RI',
	},
	{
		name: 'South Carolina',
		abbreviation: 'SC',
	},
	{
		name: 'South Dakota',
		abbreviation: 'SD',
	},
	{
		name: 'Tennessee',
		abbreviation: 'TN',
	},
	{
		name: 'Texas',
		abbreviation: 'TX',
	},
	{
		name: 'Utah',
		abbreviation: 'UT',
	},
	{
		name: 'Vermont',
		abbreviation: 'VT',
	},
	{
		name: 'Virgin Islands',
		abbreviation: 'VI',
	},
	{
		name: 'Virginia',
		abbreviation: 'VA',
	},
	{
		name: 'Washington',
		abbreviation: 'WA',
	},
	{
		name: 'West Virginia',
		abbreviation: 'WV',
	},
	{
		name: 'Wisconsin',
		abbreviation: 'WI',
	},
	{
		name: 'Wyoming',
		abbreviation: 'WY',
	},
]

const citys = ['newyork', 'gotham', 'disney', 'alfortville', 'nantes', 'paris', 'lille', 'pekin', 'seoul', 'londre', 'ars', 'marlygaumont']

const department = ['Sales', 'Marketing', 'Engineering', 'Human Resources', 'Legal']

const randItem = arr => arr[Math.floor(Math.random() * arr.length)]

const randomDate = (start, end = new Date()) => {
	const twoDigits = num => {
		const str = num.toString()
		return str.length < 2 ? '0' + str : str
	}
	const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
	const day = twoDigits(date.getDate())
	const month = twoDigits(date.getMonth() + 1)
	const year = twoDigits(date.getFullYear())
	return year + '-' + month + '-' + day
}

function createEmployee(n) {
	const employee = {
		firstName: randItem(firstNames),
		lastName: randItem(lastNames),
		birthDate: randomDate(new Date(1950, 0, 1)),
		startDate: randomDate(new Date(1950, 0, 1)),
		street: n,
		city: randItem(citys),
		state: randItem(states).abbreviation,
		zipCode: Math.floor(Math.random() * 1000),
		department: randItem(department),
	}
	return employee
}

export const fakeEmployeeList = Array.from({ length: 94 }, (el, i) => createEmployee(i))
