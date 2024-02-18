import { RequestException } from "./RequestException.js"

type Params = {
	url: string
	payload: unknown | null
}

export class UnauthorizedException extends RequestException {
	constructor({ url, payload }: Params) {
		super({
			message: "Unauthorized",
			url,
			payload: payload,
			statusCode: 401,
			responseBody: null
		})
	}
}