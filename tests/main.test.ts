import { beforeAll, describe, expect, test } from 'vitest'

import { GetHttpClient } from '../src/http/GetHttpClient.js'
import { HttpClientManager } from '../src/HttpClientManager.js'

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


test('should return a response', async () => {
	const response = await httpClient.get("/todos/1")
	console.log(response)
	expect(response).toBeDefined()
})