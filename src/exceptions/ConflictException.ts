import { RequestException } from "./RequestException.js"

type Params = {
	url: string
	payload: unknown
	responseBody: unknown
}

export class ConflictException extends RequestException {
	constructor({ url, payload, responseBody }: Params) {
		super({
			message: "Conflict",
			url,
			payload,
			statusCode: 409,
			responseBody
		})
	}
}