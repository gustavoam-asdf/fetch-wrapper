import { RequestException } from "./RequestException.js"

type Params = {
	url: string
}

export class InternalServerErrorException extends RequestException {
	constructor({ url }: Params) {
		super({
			message: "Internal Server Error",
			url,
			payload: null,
			statusCode: 500,
			responseBody: null
		})
	}
}