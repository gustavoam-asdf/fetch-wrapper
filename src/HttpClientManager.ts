import { ClientConfig, ClientConfigWithData } from "./http/HttpClient.js"

import { DeleteHttpClient } from "./http/DeleteHttpClient.js"
import { GetHttpClient } from "./http/GetHttpClient.js"
import { HeadHttpClient } from "./http/HeadHttpClient.js"
import { PatchHttpClient } from "./http/PatchHttpClient.js"
import { PostHttpClient } from "./http/PostHttpClient.js"
import { PutHttpClient } from "./http/PutHttpClient.js"

type Params = {
	baseUrl: string
	config?: ClientConfig<never>
}

export class HttpClientManager {
	#baseUrl: string
	#config?: ClientConfig<never>

	constructor({ baseUrl, config }: Params) {
		this.#baseUrl = baseUrl
		this.#config = config
	}

	#mergeConfig<R>(config: ClientConfig<R>): ClientConfig<R> {
		return {
			...this.#config,
			...config,
			headers: {
				...this.#config?.headers,
				...config?.headers,
			},
		}
	}

	#mergeConfigWithData<T, R>(config: ClientConfigWithData<T, R>): ClientConfigWithData<T, R> {
		return {
			...this.#config,
			...config,
			headers: {
				...this.#config?.headers,
				...config?.headers,
			},
		}
	}

	async get<R>(url: string, config: ClientConfig<R>) {
		const client = new GetHttpClient({
			url: `${this.#baseUrl}${url}`,
		})

		const mergedConfig = this.#mergeConfig(config)

		return await client.request<never, R>(mergedConfig)
	}

	async head<R>(url: string, config: ClientConfig<R>) {
		const client = new HeadHttpClient({
			url: `${this.#baseUrl}${url}`,
		})

		const mergedConfig = this.#mergeConfig(config)

		return await client.request<never, R>(mergedConfig)
	}

	async post<T, R>(url: string, config: ClientConfigWithData<T, R>) {
		const client = new PostHttpClient({
			url: `${this.#baseUrl}${url}`,
		})

		const mergedConfig = this.#mergeConfigWithData(config)

		return await client.request<T, R>(mergedConfig)
	}

	async patch<T, R>(url: string, config: ClientConfigWithData<T, R>) {
		const client = new PatchHttpClient({
			url: `${this.#baseUrl}${url}`,
		})

		const mergedConfig = this.#mergeConfigWithData(config)

		return await client.request<T, R>(mergedConfig)
	}

	async put<T, R>(url: string, config: ClientConfigWithData<T, R>) {
		const client = new PutHttpClient({
			url: `${this.#baseUrl}${url}`,
		})

		const mergedConfig = this.#mergeConfigWithData(config)

		return await client.request<T, R>(mergedConfig)
	}

	async delete<T, R>(url: string, config: ClientConfigWithData<T, R>) {
		const client = new DeleteHttpClient({
			url: `${this.#baseUrl}${url}`,
		})

		const mergedConfig = this.#mergeConfigWithData(config)

		return await client.request<T, R>(mergedConfig)
	}
}