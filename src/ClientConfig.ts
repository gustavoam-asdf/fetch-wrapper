export type BodyParser<R> = (response: Response) => Promise<R>

export type ClientConfigWithData<T, R> = Omit<RequestInit, "method" | "body"> & {
	throwOnConnectionFailure?: boolean
	bodyParser?: BodyParser<R>
	data: T
}

export type ClientConfigWithDataWithoutBody<T, R> = Omit<ClientConfigWithData<T, R>, "bodyParser">

export type ClientConfig<R> = Omit<ClientConfigWithData<never, R>, "data">

export type ClientConfigWithoutBody<R> = Omit<ClientConfig<R>, "bodyParser">

export type RequestClientConfig<T, R> = ClientConfig<R>
	| ClientConfigWithoutBody<R>
	| ClientConfigWithData<T, R>
	| ClientConfigWithDataWithoutBody<T, R>