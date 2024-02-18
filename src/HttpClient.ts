import { RequestClientConfig } from "./ClientConfig"
import { UnexpectedResponseException } from "./exceptions/UnexpectedResponseException"

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
			const content = await response.text()
				.catch(() => "Error getting response content")

			throw new UnexpectedResponseException({
				url: this.url,
				content,
			})
		}
	}
}