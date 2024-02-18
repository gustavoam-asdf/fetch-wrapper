import { RequestException } from "./RequestException"

type Params = {
	url: string
	payload: unknown
	responseBody: unknown
}

export class BadRequestException extends RequestException {
	constructor({ url, payload, responseBody }: Params) {
		super({
			message: "Bad Request",
			url,
			payload,
			statusCode: 400,
			responseBody
		})
	}
}