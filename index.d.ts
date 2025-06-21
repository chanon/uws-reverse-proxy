import { TemplatedApp, AppOptions, HttpRequest, HttpResponse, RecognizedString } from 'uWebSockets.js';

// Re-export types from uWebSockets.js for convenience
export type UWSTemplatedApp = TemplatedApp;
export type UWSAppOptions = AppOptions;
export type UWSRequest = HttpRequest;
export type UWSResponse = HttpResponse;
export type UWSRecognizedString = RecognizedString;

// HTTP Client configuration options
export interface UWSClientOpts {
	/** Enable pipelining. False is not supported yet. @default true */
	pipelining?: boolean;
	/** Number of reconnection attempts for each Connection. @default 3 */
	reconnectionAttempts?: number;
	/** Delay in ms between each reconnection attempt for each Connection. @default 1000 */
	reconnectionDelay?: number;
	/** Keep alive timeout in ms. @default 5000 */
	keepAlive?: number;
	/** Keep alive initial delay in ms. @default 1000 */
	keepAliveInitialDelay?: number;
	/** Timeout in ms for a connection to be considered as dead. @default 5000 */
	connectionTimeout?: number;
	/** Max number of connections by host. @default 10 */
	maxConnectionsByHost?: number;
	/** Interval in ms to check for dead connections. @default 1000 */
	connectionWatcherInterval?: number;
	/** Max number of pipelined requests by connection. @default 100000 */
	maxPipelinedRequestsByConnection?: number;
	/** Max number of stacked buffers under backpressure when sending request body to the target server. @default 4096 */
	maxStackedBuffers?: number;
}

// Decoded uWebSockets.js HttpRequest
export interface UWSDecodedRequest {
	/** Called URL */
	url: string;
	/** HTTP method (get, post, put, delete, etc.) */
	method: string;
	/** Request's query string (part after ?) */
	query: string;
	/** Request headers */
	headers: Record<string, string | string[]>;
}

// HTTP configuration options for UWSProxy's constructor
export interface UWSProxyHTTPConfigOpts {
	/** Server protocol @default "http" */
	protocol?: 'http' | 'https';
	/** Private port the HTTP server must listen to @default 35974 */
	port?: number;
	/** HTTP host. Default is the loop-back address @default "127.0.0.1" */
	host?: string;
	/** Disable configuration warning printing @default false */
	quiet?: boolean;
	/** HTTP client configuration */
	client?: UWSClientOpts;
}

// UWSProxy actual configuration for HTTP
export interface UWSProxyHTTPConfig {
	/** Raw configuration passed to UWSProxy.createHTTPConfig */
	config: UWSProxyHTTPConfigOpts;
	/** HTTP protocol */
	protocol: 'http' | 'https';
	/** Listening port */
	port: number;
	/** HTTP host */
	host: string;
	/** HTTP client configuration */
	client: UWSClientOpts;
}

// uWebSockets.js configuration options for UWSProxy's constructor
export interface UWSProxyUWSConfigOpts {
	/** If true, inform the Proxy that traffic is encrypted @default null */
	ssl?: boolean | null;
	/** Public port uWebSocket server is listening to @default 443 */
	port?: number;
	/** Disable configuration warning printing @default false */
	quiet?: boolean;
	/** uWebSockets.js AppOptions @default {} */
	config?: UWSAppOptions;
}

// UWSProxy actual configuration for uWebSockets.js
export interface UWSProxyUWSConfig {
	/** SSL enabled */
	ssl: boolean;
	/** Port */
	port: number;
	/** Raw configuration */
	config: UWSProxyUWSConfigOpts;
	/** uWebSockets.js server instance */
	server: UWSTemplatedApp;
}

// Error response object
export interface UWSProxyErrorResponse {
	/** HTTP status */
	status: string;
	/** Response headers */
	headers: Record<string, string | string[]>;
	/** Response body */
	body: UWSRecognizedString;
}

// Error handler callback
export type UWSProxyErrorHandler = (
	error: Error,
	decodedRequest: UWSDecodedRequest
) => UWSProxyErrorResponse | void | Promise<UWSProxyErrorResponse | void>;

// Callbacks dictionary used by UWSProxy
export interface UWSProxyCallbacks {
	/** Called on request error */
	error?: UWSProxyErrorHandler;
}

// UWSProxy configuration options
export interface UWSProxyOpts {
	/** Timeout in MS before an attempt to reach the proxied server will abort @default 300000 */
	timeout?: number;
	/** Collection of optional callbacks */
	on?: UWSProxyCallbacks;
}

// Main UWSProxy class
export declare class UWSProxy {
	/**
	 * Create a valid HTTP configuration
	 * @param config Configuration object
	 * @returns Valid HTTP configuration
	 */
	static createHTTPConfig(config?: UWSProxyHTTPConfigOpts): UWSProxyHTTPConfig;

	/**
	 * Creates a valid uWebSockets.js configuration
	 * @param uWebSocket uWebSockets.js instance or TemplatedApp
	 * @param opts Configuration options
	 * @returns Valid uWebSockets.js configuration
	 */
	static createUWSConfig(
		uWebSocket: any,
		opts?: UWSProxyUWSConfigOpts
	): UWSProxyUWSConfig;

	/**
	 * UWSProxy constructor
	 * @param uwsConfig uWebSockets.js configuration
	 * @param httpConfig HTTP configuration of the target HTTP server
	 * @param opts Proxy configuration options
	 */
	constructor(
		uwsConfig: UWSProxyUWSConfig,
		httpConfig: UWSProxyHTTPConfig,
		opts?: UWSProxyOpts
	);

	/**
	 * A shallow copy of the uWebSocket configuration
	 * @returns uWebSocket configuration
	 */
	uws(): UWSProxyUWSConfig;

	/**
	 * A shallow copy of the http configuration
	 * @returns HTTP configuration
	 */
	http(): UWSProxyHTTPConfig;
}

// Main module exports
declare const _default: {
	UWSProxy: typeof UWSProxy;
	createUWSConfig: typeof UWSProxy.createUWSConfig;
	createHTTPConfig: typeof UWSProxy.createHTTPConfig;
};

export default _default;
export { UWSProxy, UWSProxy as default };
export const createUWSConfig: typeof UWSProxy.createUWSConfig;
export const createHTTPConfig: typeof UWSProxy.createHTTPConfig;
