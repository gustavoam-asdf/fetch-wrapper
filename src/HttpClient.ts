import { RequestClientConfig } from "./ClientConfig.js"
import { UnexpectedResponseException } from "./exceptions/UnexpectedResponseException.js"

type Params = {
	url: string
}

type HttpResponse<R> = {
	status: number
	headers: Headers
	body?: R
}

export abstract class HttpClient {
	protected url: string

	constructor({ url }: Params) {
		this.url = url
	}

	protected abstract connect<T, R>(config: RequestClientConfig<T, R>): Promise<Response>

	async request<T, R>(config: RequestClientConfig<T, R>): Promise<HttpResponse<R>> {
		const response = await this.connect(config)

		if (!("bodyParser" in config)) {
			return {
				status: response.status,
				headers: response.headers,
			}
		}

		if (!config.bodyParser) {
			return {
				status: response.status,
				headers: response.headers,
			}
		}

		try {
			const body = await config.bodyParser(response)
			return {
				status: response.status,
				headers: response.headers,
				body,
			}
		} catch (error) {
			if (!(error instanceof Error)) {
				throw error
			}

			const content = await response.text()
				.catch(async () => {
					if (!response.body) {
						return "No response body."
					}
					const bodyReader = response.body.getReader()
					const rawBody = await bodyReader.read()
						.catch(() => {
							undefined
						})

					if (!rawBody) {
						return "Error getting response content"
					}

					const decoder = new TextDecoder()

					return decoder.decode(rawBody.value)
				})



			throw new UnexpectedResponseException({
				url: this.url,
				content: content ?? "Error getting response content",
				cause: error,
			})
		}
	}
}