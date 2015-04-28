# compute-webprog

## Convention

- Database Name: `compute_nocamelcase`
- PHP: `$camelCase`
- PHP Class: `CapitalCamelCase`

## APIs

### `GET apis/challenges` - Get problems list

### `GET apis/challenges?id=1` - Get problem

### `POST apis/submit` - Submit challange

**Request**

	{
		id: 1,
		turing: {
			states: [
				{
					id: "2ajdkci23",
					type: "<state, accepted, rejected, start>"
				},
				{...}
			], 
			transitions:  [
				{
					from: "f23jl0d",
					input: "z"
					to: "f3lml90",
					write: "x",
					direction: "<S, L, R>"
				}
			]
		}
	}

**Response**

Case: Right
	{
		status: right
	}

Case: Wrong
	{
		id: 1,
		input: "0111010101 110101110",
		expected: "<1010101011101, accepted, rejected>",
		actual: "<010101011101, accepted, rejected, loop>",
		status: wrong
	}

## PHP Classes



## Databases

### compute_challenges

- id: integer, auto_incr (PK)
- name: string
- description: text

### compute_example_testcases

- id: integer, auto_incr (PK)
- challange_id: integer (IDX)
- testnum: integer (IDX)
- input: string
- expected: string

### compute_testcases

- id: integer, auto_incr (PK)
- challange_id: integer (IDX)
- testnum: integer (IDX)
- input: string
- expected: string