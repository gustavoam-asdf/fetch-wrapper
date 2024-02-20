import { BodyParser, ClientConfig, ClientConfigWithData, ClientConfigWithDataWithoutBody, ClientConfigWithoutBody } from "./ClientConfig.js"

import { DeleteHttpClient } from "./http/DeleteHttpClient.js"
import { GetHttpClient } from "./http/GetHttpClient.js"
import { HeadHttpClient } from "./http/HeadHttpClient.js"
import { PatchHttpClient } from "./http/PatchHttpClient.js"
import { PostHttpClient } from "./http/PostHttpClient.js"
import { PutHttpClient } from "./http/PutHttpClient.js"

type ClientManagerConfig = Omit<ClientConfig<never>, "bodyParser">

type Params = {
	baseUrl: string
	defaultBodyParser: BodyParser<unknown>
	config?: ClientManagerConfig
}

export class HttpClientManager {
	#baseUrl: string
	#bodyParser: BodyParser<unknown>
	#config?: ClientManagerConfig

	constructor({ baseUrl, defaultBodyParser, config }: Params) {
		this.#baseUrl = baseUrl
		this.#bodyParser = defaultBodyParser
		this.#config = config
	}

	#mergeConfig(config?: ClientConfig<unknown> | ClientConfigWithoutBody<unknown>): ClientConfig<unknown> | ClientConfigWithoutBody<unknown> {
		if (!config) return {
			...this.#config,
			bodyParser: this.#bodyParser,
			headers: {
				...this.#config?.headers,
			},
		}

		if ("bodyParser" in config) {
			return {
				...this.#config,
				...config,
				bodyParser: config.bodyParser ?? this.#bodyParser,
				headers: {
					...this.#config?.headers,
					...config?.headers,
				},
			}
		}

		return {
			...this.#config,
			...config,
			bodyParser: this.#bodyParser,
			headers: {
				...this.#config?.headers,
				...config?.headers,
			},
		}
	}

	#mergeConfigWithData<T>(config?: ClientConfigWithData<T, unknown> | ClientConfigWithDataWithoutBody<T, unknown>): ClientConfigWithData<T, unknown> | ClientConfigWithDataWithoutBody<T, unknown> {
		if (!config) return {
			...this.#config,
			data: null as T,
			bodyParser: this.#bodyParser,
			headers: {
				...this.#config?.headers,
			},
		}

		if ("bodyParser" in config) {
			return {
				...this.#config,
				...config,
				bodyParser: config.bodyParser ?? this.#bodyParser,
				headers: {
					...this.#config?.headers,
					...config?.headers,
				},
			}
		}

		return {
			...this.#config,
			...config,
			bodyParser: this.#bodyParser,
			headers: {
				...this.#config?.headers,
				...config?.headers,
			},
		}
	}

	async get<R>(url: string, config?: ClientConfig<R>) {
		const client = new GetHttpClient({
			url: `${this.#baseUrl}${url}`,
		})

		const mergedConfig = this.#mergeConfig(config)

		return await client.request<never, R>(mergedConfig)
	}

	async head<R>(url: string, config?: ClientConfig<R>) {
		const client = new HeadHttpClient({
			url: `${this.#baseUrl}${url}`,
		})

		const mergedConfig = this.#mergeConfig(config)

		return await client.request<never, R>(mergedConfig)
	}

	async post<T, R>(url: string, config?: ClientConfigWithData<T, R>) {
		const client = new PostHttpClient({
			url: `${this.#baseUrl}${url}`,
		})

		const mergedConfig = this.#mergeConfigWithData(config)

		return await client.request<T, R>(mergedConfig)
	}

	async patch<T, R>(url: string, config?: ClientConfigWithData<T, R>) {
		const client = new PatchHttpClient({
			url: `${this.#baseUrl}${url}`,
		})

		const mergedConfig = this.#mergeConfigWithData(config)

		return await client.request<T, R>(mergedConfig)
	}

	async put<T, R>(url: string, config?: ClientConfigWithData<T, R>) {
		const client = new PutHttpClient({
			url: `${this.#baseUrl}${url}`,
		})

		const mergedConfig = this.#mergeConfigWithData(config)

		return await client.request<T, R>(mergedConfig)
	}

	async delete<T, R>(url: string, config?: ClientConfigWithData<T, R>) {
		const client = new DeleteHttpClient({
			url: `${this.#baseUrl}${url}`,
		})

		const mergedConfig = this.#mergeConfigWithData(config)

		return await client.request<T, R>(mergedConfig)
	}
}