import type { CompanionActionDefinitions, SomeCompanionActionInputField } from '@companion-module/base'
import type { RealLineInstance } from './main.js'

function trackerDropdown(choices: { id: string; label: string }[]): SomeCompanionActionInputField {
	return {
		type: 'dropdown',
		id: 'tracker',
		label: 'Tracker',
		default: choices[0]?.id ?? '',
		choices,
		allowCustom: true,
	}
}

export function getActions(instance: RealLineInstance): CompanionActionDefinitions {
	const choices = instance.state.getTrackerChoices()

	return {
		preview_start_all: {
			name: 'Start Preview — All Trackers',
			options: [],
			callback: () => instance.ws.send({ cmd: 'preview_start_all' }),
		},

		preview_stop_all: {
			name: 'Stop Preview — All Trackers',
			options: [],
			callback: () => instance.ws.send({ cmd: 'preview_stop_all' }),
		},

		record_start_all: {
			name: 'Start Recording — All Trackers',
			options: [],
			callback: () => instance.ws.send({ cmd: 'record_start_all' }),
		},

		record_stop_all: {
			name: 'Stop Recording — All Trackers',
			options: [],
			callback: () => instance.ws.send({ cmd: 'record_stop_all' }),
		},

		preview_start: {
			name: 'Start Preview — Tracker',
			options: [trackerDropdown(choices)],
			callback: (action) => instance.ws.send({ cmd: 'preview_start', tracker: String(action.options['tracker'] ?? '') }),
		},

		preview_stop: {
			name: 'Stop Preview — Tracker',
			options: [trackerDropdown(choices)],
			callback: (action) => instance.ws.send({ cmd: 'preview_stop', tracker: String(action.options['tracker'] ?? '') }),
		},

		record_start: {
			name: 'Start Recording — Tracker',
			options: [trackerDropdown(choices)],
			callback: (action) => instance.ws.send({ cmd: 'record_start', tracker: String(action.options['tracker'] ?? '') }),
		},

		record_stop: {
			name: 'Stop Recording — Tracker',
			options: [trackerDropdown(choices)],
			callback: (action) => instance.ws.send({ cmd: 'record_stop', tracker: String(action.options['tracker'] ?? '') }),
		},

		toggle_record_all: {
			name: 'Toggle Recording — All Trackers',
			options: [],
			callback: () => {
				const allRecording = instance.state.trackers.length > 0 && instance.state.trackers.every((t) => t.recording)
				instance.ws.send({ cmd: allRecording ? 'record_stop_all' : 'record_start_all' })
			},
		},

		refresh_state: {
			name: 'Refresh State',
			options: [],
			callback: () => instance.ws.send({ cmd: 'get_state' }),
		},
	}
}
