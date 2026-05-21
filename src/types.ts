export interface TrackerInfo {
	id: number
	name: string
	index: number
	recording: boolean
	previewing: boolean
	frozen: boolean
	hasWarning: boolean
}

export interface SessionInfo {
	projectName?: string
	sessionName?: string
	sceneNo?: string
	takeNo?: string
	timecode?: string
}

export interface ModuleConfig {
	[key: string]: string | number
	host: string
	port: number
	reconnect_interval: number
}

// ── Inbound WS events (RealLine → module) ──────────────────────────────────

export interface WsStateEvent {
	event: 'state'
	trackers?: TrackerInfo[]
	projectName?: string
	sessionName?: string
	sceneNo?: string
	takeNo?: string
	timecode?: string
	session?: SessionInfo
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

export interface WsTimecodeEvent {
	event: 'timecode'
	value: string
}

export interface WsErrorEvent {
	event: 'error'
	message: string
}

export type WsEvent =
	| WsStateEvent
	| WsPongEvent
	| WsTrackerNamesEvent
	| WsActiveCountEvent
	| WsTrackerStateEvent
	| WsTimecodeEvent
	| WsErrorEvent
