# compute-webprog

## Convention

- Database Name: `compute_nocamelcase`
- PHP: `$camelCase`
- PHP Class: `CapitalCamelCase`

## APIs

### `GET apis/challanges` - Get problems list

### `GET apis/challanges?id=1` - Get problem

### `POST apis/submit` - Submit challange

**Request**

	{
		id: 1,
		turing: {
			states: [
				{
					id: "2ajdkci23",
					type: "<state, accept, reject, start, block>",
					blockType: "<...>"
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

	{
		id: 1,
		input: "0111010101 110101110",
		expected: "<1010101011101, accept, reject>",
		actual: "<010101011101, accept, reject, loop>"
	}

## PHP Classes



## Databases

### compute_challanges

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