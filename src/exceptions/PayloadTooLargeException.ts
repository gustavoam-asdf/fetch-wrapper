import { RequestException } from "./RequestException.js"

type Params = {
	url: string
	payload: unknown
	responseBody: unknown
}

export class PayloadTooLargeException extends RequestException {
	constructor({ url, payload, responseBody }: Params) {
		super({
			message: "Payload Too Large",
			url,
			payload,
			statusCode: 413,
			responseBody
		})
	}
}