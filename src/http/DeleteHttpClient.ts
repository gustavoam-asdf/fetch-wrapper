import { ClientConfigWithData } from "../ClientConfig.js"
import { HttpClient } from "../HttpClient.js"
import { statusCodeExceptionsMap } from "../exceptions/statusCodeExceptionsMap.js"

export class DeleteHttpClient extends HttpClient {
	async connect<T, R>({ data, ...config }: ClientConfigWithData<T, R>) {
		const response = await fetch(`${this.url}`, {
			...config,
			method: "DELETE",
			body: JSON.stringify(data),
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