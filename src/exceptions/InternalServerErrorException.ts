import { RequestException } from "./RequestException"

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