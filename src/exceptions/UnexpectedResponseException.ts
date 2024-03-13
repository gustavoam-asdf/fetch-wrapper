type Params = {
	url: string
	content: unknown
	cause: Error
}

export class UnexpectedResponseException extends Error {
	url: string
	content: unknown
	cause: Error

	constructor({ url, content, cause }: Params) {
		super("Unexpected response content from server")
		this.url = url
		this.content = content
		this.cause = cause
	}
}