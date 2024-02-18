import { RequestException } from "./RequestException"

type Params = {
	url: string
	responseBody: unknown
}

export class NotFoundException extends RequestException {
	constructor({ url, responseBody }: Params) {
		super({
			message: "Not Found",
			url,
			payload: null,
			statusCode: 404,
			responseBody,
		})
	}
}