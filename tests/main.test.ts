import { beforeAll, describe, expect, expectTypeOf, test } from 'vitest'

import { HttpClientManager } from '../src/HttpClientManager.js'
import { throws } from 'assert'

let httpClient: HttpClientManager

beforeAll(() => {
	httpClient = new HttpClientManager({
		baseUrl: 'https://jsonplaceholder.typicode.com',
		defaultBodyParser(response) {
			return response.json()
		},
		config: {
			headers: {
				'Content-Type': 'application/json'
			}
		}
	})
})

type Todo = {
	userId: number
	id: number
	title: string
	completed: boolean
}


test('should return a response', async () => {
	const response = await httpClient.get<Todo>("/todos/1")

	expectTypeOf(response.status).toBeNumber()
	expectTypeOf(response.headers).toBeObject()
	expect(response.body).toBeDefined()
})