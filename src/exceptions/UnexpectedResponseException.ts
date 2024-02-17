type Params = {
	url: string
	content: unknown
}

export class UnexpectedResponseException extends Error {
	url: string
	content: unknown

	constructor({ url, content }: Params) {
		super("Unexpected response content from server")
		this.url = url
		this.content = content
	}
}