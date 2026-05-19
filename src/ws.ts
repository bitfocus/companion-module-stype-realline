import WebSocket from 'ws'
import type { ModuleConfig, WsEvent } from './types.js'
import { getWsUrl } from './config.js'

export class WsClient {
	private ws: WebSocket | null = null
	private url: string
	private reconnectInterval: number
	private reconnectTimer: ReturnType<typeof setTimeout> | null = null
	private pingTimer: ReturnType<typeof setInterval> | null = null
	private destroyed = false

	private readonly onMessage: (msg: WsEvent) => void
	private readonly onConnected: () => void
	private readonly onDisconnected: () => void
	private readonly log: (level: 'debug' | 'info' | 'warn' | 'error', msg: string) => void

	constructor(
		config: ModuleConfig,
		handlers: {
			onMessage: (msg: WsEvent) => void
			onConnected: () => void
			onDisconnected: () => void
			log: (level: 'debug' | 'info' | 'warn' | 'error', msg: string) => void
		},
	) {
		this.url = getWsUrl(config)
		this.reconnectInterval = (config.reconnect_interval || 5) * 1000
		this.onMessage = handlers.onMessage
		this.onConnected = handlers.onConnected
		this.onDisconnected = handlers.onDisconnected
		this.log = handlers.log
	}

	connect(): void {
		if (this.destroyed) return
		this.cleanup()
		this.log('debug', `Connecting to ${this.url}`)

		try {
			this.ws = new WebSocket(this.url)
		} catch (e: unknown) {
			this.log('error', `WebSocket connect error: ${e instanceof Error ? e.message : String(e)}`)
			this.scheduleReconnect()
			return
		}

		this.ws.on('open', () => {
			this.log('info', `Connected to RealLine at ${this.url}`)
			this.onConnected()
			this.startPing()
		})

		this.ws.on('message', (data: WebSocket.Data) => {
			try {
				const msg = JSON.parse(data.toString()) as WsEvent
				this.log('debug', `RX: ${JSON.stringify(msg)}`)
				this.onMessage(msg)
			} catch (e: unknown) {
				this.log('debug', `Message parse error: ${e instanceof Error ? e.message : String(e)}`)
			}
		})

		this.ws.on('close', (code: number, reason: Buffer) => {
			this.log('info', `Disconnected: ${code} ${reason.toString()}`)
			this.stopPing()
			this.onDisconnected()
			this.scheduleReconnect()
		})

		this.ws.on('error', (err: Error) => {
			this.log('warn', `WebSocket error: ${err.message}`)
		})
	}

	send(msg: Record<string, unknown>): void {
		if (this.ws?.readyState === WebSocket.OPEN) {
			this.ws.send(JSON.stringify(msg))
		}
	}

	updateConfig(config: ModuleConfig): void {
		this.url = getWsUrl(config)
		this.reconnectInterval = (config.reconnect_interval || 5) * 1000
		this.connect()
	}

	isConnected(): boolean {
		return this.ws?.readyState === WebSocket.OPEN
	}

	destroy(): void {
		this.destroyed = true
		this.cleanup()
	}

	private cleanup(): void {
		this.stopPing()
		if (this.reconnectTimer) { clearTimeout(this.reconnectTimer); this.reconnectTimer = null }
		if (this.ws) {
			try { this.ws.removeAllListeners(); this.ws.close() } catch { /* ignore */ }
			this.ws = null
		}
	}

	private scheduleReconnect(): void {
		if (this.destroyed || this.reconnectTimer) return
		this.log('debug', `Reconnecting in ${this.reconnectInterval / 1000}s`)
		this.reconnectTimer = setTimeout(() => { this.reconnectTimer = null; this.connect() }, this.reconnectInterval)
	}

	private startPing(): void {
		this.stopPing()
		this.pingTimer = setInterval(() => { this.send({ cmd: 'ping' }) }, 25000)
	}

	private stopPing(): void {
		if (this.pingTimer) { clearInterval(this.pingTimer); this.pingTimer = null }
	}
}
