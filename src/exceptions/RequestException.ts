type Params = {
	message: string
	statusCode: number
	url: string
	payload: unknown | null
	responseBody: unknown | null
}

export abstract class RequestException extends Error {
	statusCode: number
	url: string
	payload: unknown | null
	responseBody: unknown | null

	constructor({ message, statusCode, url, payload, responseBody }: Params) {
		super(message)
		this.statusCode = statusCode
		this.url = url
		this.payload = payload
		this.responseBody = responseBody
	}
}