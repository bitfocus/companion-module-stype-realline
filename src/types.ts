export interface TrackerInfo {
	id: number
	name: string
	index: number
	recording: boolean
	previewing: boolean
	frozen: boolean
	hasWarning: boolean
}

export interface ModuleConfig {
	host: string
	port: number
	reconnect_interval: number
}

// ── Inbound WS events (RealLine → module) ──────────────────────────────────

export interface WsStateEvent {
	event: 'state'
	trackers: TrackerInfo[]
}

export interface WsPongEvent {
	event: 'pong'
}

export interface WsTrackerNamesEvent {
	event: 'tracker_names'
	names: string[]
}

export interface WsActiveCountEvent {
	event: 'active_count'
	count: number
}

export interface WsTrackerStateEvent extends TrackerInfo {
	event: 'tracker_state'
}

export interface WsErrorEvent {
	event: 'error'
	message: string
}

export type WsEvent = WsStateEvent | WsPongEvent | WsTrackerNamesEvent | WsActiveCountEvent | WsTrackerStateEvent | WsErrorEvent
