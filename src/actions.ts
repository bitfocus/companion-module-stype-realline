import type { CompanionActionDefinitions, SomeCompanionActionInputField } from '@companion-module/base'
import type RealLineInstance from './main.js'
import type { TrackerInfo } from './types.js'

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

function optionToString(value: unknown): string {
	return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' ? String(value) : ''
}

export function getActions(instance: RealLineInstance): CompanionActionDefinitions {
	const choices = instance.state.getTrackerChoices()

	return {
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

		record_start: {
			name: 'Start Recording — Tracker',
			options: [trackerDropdown(choices)],
			callback: (action) =>
				instance.ws.send({ cmd: 'record_start', tracker: optionToString(action.options['tracker']) }),
		},

		record_stop: {
			name: 'Stop Recording — Tracker',
			options: [trackerDropdown(choices)],
			callback: (action) =>
				instance.ws.send({ cmd: 'record_stop', tracker: optionToString(action.options['tracker']) }),
		},

		toggle_record_all: {
			name: 'Toggle Recording — All Trackers',
			options: [],
			callback: () => {
				const allRecording =
					instance.state.trackers.length > 0 && instance.state.trackers.every((t: TrackerInfo) => t.recording)
				instance.ws.send({ cmd: allRecording ? 'record_stop_all' : 'record_start_all' })
			},
		},

		next_scene: {
			name: 'Next Scene',
			options: [],
			callback: () => instance.ws.send({ cmd: 'next_scene' }),
		},

		reset_take_number: {
			name: 'Reset Take No',
			options: [],
			callback: () => instance.ws.send({ cmd: 'reset_take_no' }),
		},

		refresh_state: {
			name: 'Refresh State',
			options: [],
			callback: () => instance.ws.send({ cmd: 'get_state' }),
		},
	}
}
