import { ClientConfigWithoutBody } from "../ClientConfig.js"
import { HttpClient } from "../HttpClient.js"
import { statusCodeExceptionsMap } from "../exceptions/statusCodeExceptionsMap.js"

export class HeadHttpClient extends HttpClient {
	async connect<R>(config: ClientConfigWithoutBody<R>) {
		const response = await fetch(`${this.url}`, {
			...config,
			method: "HEAD",
		})

		const requestException = statusCodeExceptionsMap.get(response.status)

		if (requestException && config?.throwOnConnectionFailure) {
			const responseBody = await response.json().catch(() => "Request response with non json body")
			throw new requestException({
				url: this.url,
				payload: null,
				responseBody,
			})
		}

		return response
	}
}