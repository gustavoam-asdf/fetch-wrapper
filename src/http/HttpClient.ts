import { UnexpectedResponseException } from "../exceptions/UnexpectedResponseException.js"

export type ClientConfigWithData<T, R> = Omit<RequestInit, "method" | "body"> & {
	throwOnConnectionFailure?: boolean
	bodyParser?: (response: Response) => Promise<R>
	data: T
}

export type ClientConfig<R> = Omit<ClientConfigWithData<never, R>, "data">

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

	protected abstract connect<T, R>(config: ClientConfigWithData<T, R> | ClientConfig<R>): Promise<Response>

	async request<T, R>(config: ClientConfigWithData<T, R> | ClientConfig<R>): Promise<HttpResponse<R>> {
		const response = await this.connect(config)

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