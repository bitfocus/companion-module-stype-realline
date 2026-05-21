import type { SessionInfo, TrackerInfo, WsStateEvent } from './types.js'

export class StateManager {
	trackers: TrackerInfo[] = []
	wsConnected = false
	projectName = ''
	sessionName = ''
	sceneNo = ''
	takeNo = ''
	timecode = ''

	private readonly onChange: () => void

	constructor(onChange: () => void) {
		this.onChange = onChange
	}

	updateTrackers(trackers: TrackerInfo[]): void {
		this.trackers = trackers
		this.onChange()
	}

	updateState(msg: WsStateEvent): void {
		if (msg.trackers) this.trackers = msg.trackers
		this.updateSession({
			projectName: msg.projectName ?? msg.session?.projectName,
			sessionName: msg.sessionName ?? msg.session?.sessionName,
			sceneNo: msg.sceneNo ?? msg.session?.sceneNo,
			takeNo: msg.takeNo ?? msg.session?.takeNo,
			timecode: msg.timecode ?? msg.session?.timecode,
		})
		this.onChange()
	}

	updateSession(session: SessionInfo): void {
		this.projectName = session.projectName ?? this.projectName
		this.sessionName = session.sessionName ?? this.sessionName
		this.sceneNo = session.sceneNo ?? this.sceneNo
		this.takeNo = session.takeNo ?? this.takeNo
		this.timecode = session.timecode ?? this.timecode
	}

	updateTracker(tracker: TrackerInfo): void {
		const idx = this.trackers.findIndex((t) => t.id === tracker.id)
		if (idx !== -1) {
			this.trackers[idx] = tracker
		} else {
			this.trackers.push(tracker)
		}
		this.onChange()
	}

	getTracker(nameOrId: string | number): TrackerInfo | undefined {
		if (typeof nameOrId === 'number') return this.trackers.find((t) => t.id === nameOrId)
		return this.trackers.find((t) => t.name === nameOrId)
	}

	getTrackerChoices(): { id: string; label: string }[] {
		return this.trackers.map((t) => ({ id: t.name, label: t.name }))
	}

	trackersHash(): string {
		return this.trackers.map((t) => t.name).join(',')
	}
}
