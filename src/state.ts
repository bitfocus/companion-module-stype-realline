import type { TrackerInfo } from './types.js'

export class StateManager {
	trackers: TrackerInfo[] = []
	wsConnected = false
	timecode = ''

	private readonly onChange: () => void

	constructor(onChange: () => void) {
		this.onChange = onChange
	}

	updateTrackers(trackers: TrackerInfo[]): void {
		this.trackers = trackers
		this.onChange()
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
