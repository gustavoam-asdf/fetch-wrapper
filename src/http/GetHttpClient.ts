import { ClientConfig } from "../ClientConfig"
import { HttpClient } from "../HttpClient"
import { statusCodeExceptionsMap } from "../exceptions/statusCodeExceptionsMap"

export class GetHttpClient extends HttpClient {
	async connect<R>(config: ClientConfig<R>) {
		const response = await fetch(`${this.url}`, {
			...config,
			method: "GET",
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