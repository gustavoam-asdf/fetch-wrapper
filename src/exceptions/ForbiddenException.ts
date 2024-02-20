import { RequestException } from "./RequestException.js"

type Params = {
	url: string
	payload: unknown | null
}

export class ForbiddenException extends RequestException {
	constructor({ url, payload }: Params) {
		super({
			message: "Forbidden",
			url,
			payload: payload,
			statusCode: 403,
			responseBody: null
		})
	}
}