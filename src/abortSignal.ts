type Params = {
	waitMsTime: number
}

export function createAbortSignal({ waitMsTime }: Params) {
	const controller = new AbortController()

	const timer = setTimeout(() => controller.abort(), waitMsTime)

	return {
		signal: controller.signal,
		clearSignal: () => clearTimeout(timer)
	}
}