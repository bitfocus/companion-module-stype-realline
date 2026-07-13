import { combineRgb } from '@companion-module/base'
import type { CompanionFeedbackDefinitions, SomeCompanionFeedbackInputField } from '@companion-module/base'
import { RECORD_ICON_PNG64, STOP_ICON_PNG64 } from './icons.js'
import type RealLineInstance from './main.js'
import type { TrackerInfo } from './types.js'

function trackerDropdown(choices: { id: string; label: string }[]): SomeCompanionFeedbackInputField {
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

export function getFeedbacks(instance: RealLineInstance): CompanionFeedbackDefinitions {
	const choices = instance.state.getTrackerChoices()

	return {
		recording: {
			type: 'boolean',
			name: 'Tracker — Is Recording',
			defaultStyle: { bgcolor: combineRgb(180, 0, 0), color: combineRgb(255, 255, 255) },
			options: [trackerDropdown(choices)],
			callback: (feedback) => {
				const tracker = instance.state.getTracker(optionToString(feedback.options['tracker']))
				return tracker?.recording ?? false
			},
		},

		frozen: {
			type: 'boolean',
			name: 'Tracker — Is Frozen',
			defaultStyle: { bgcolor: combineRgb(0, 80, 200), color: combineRgb(255, 255, 255) },
			options: [trackerDropdown(choices)],
			callback: (feedback) => {
				const tracker = instance.state.getTracker(optionToString(feedback.options['tracker']))
				return tracker?.frozen ?? false
			},
		},

		any_recording: {
			type: 'boolean',
			name: 'Any Tracker — Is Recording',
			defaultStyle: { bgcolor: combineRgb(180, 0, 0), color: combineRgb(255, 255, 255) },
			options: [],
			callback: () => instance.state.trackers.some((t: TrackerInfo) => t.recording),
		},

		connected: {
			type: 'boolean',
			name: 'RealLine — Connected',
			defaultStyle: { bgcolor: combineRgb(0, 160, 0), color: combineRgb(255, 255, 255) },
			options: [],
			callback: () => instance.state.wsConnected,
		},

		all_recording: {
			type: 'boolean',
			name: 'All Trackers — All Recording',
			defaultStyle: { bgcolor: combineRgb(180, 0, 0), color: combineRgb(255, 255, 255) },
			options: [],
			callback: () =>
				instance.state.trackers.length > 0 && instance.state.trackers.every((t: TrackerInfo) => t.recording),
		},

		all_idle: {
			type: 'boolean',
			name: 'All Trackers — All Idle (not recording)',
			defaultStyle: { bgcolor: combineRgb(70, 70, 70), color: combineRgb(255, 255, 255) },
			options: [],
			callback: () => instance.state.trackers.every((t: TrackerInfo) => !t.recording),
		},

		not_all_recording: {
			type: 'boolean',
			name: 'All Trackers — Not All Recording',
			defaultStyle: { bgcolor: combineRgb(70, 70, 70), color: combineRgb(255, 255, 255) },
			options: [],
			callback: () => !instance.state.trackers.every((t: TrackerInfo) => t.recording),
		},

		tracker_warning: {
			type: 'boolean',
			name: 'Tracker — Has Warning',
			defaultStyle: { bgcolor: combineRgb(220, 120, 0), color: combineRgb(255, 255, 255) },
			options: [trackerDropdown(choices)],
			callback: (feedback) => {
				const tracker = instance.state.getTracker(optionToString(feedback.options['tracker']))
				return tracker?.hasWarning ?? false
			},
		},

		any_warning: {
			type: 'boolean',
			name: 'Any Tracker — Has Warning',
			defaultStyle: { bgcolor: combineRgb(220, 120, 0), color: combineRgb(255, 255, 255) },
			options: [],
			callback: () => instance.state.trackers.some((t: TrackerInfo) => t.hasWarning),
		},

		tracker_status: {
			type: 'advanced',
			name: 'Tracker — Status Color (combined)',
			options: [trackerDropdown(choices)],
			callback: (feedback) => {
				const tracker = instance.state.getTracker(optionToString(feedback.options['tracker']))
				if (!tracker) return {}
				if (tracker.hasWarning) return { bgcolor: combineRgb(220, 120, 0) }
				if (tracker.recording) return { bgcolor: combineRgb(180, 0, 0) }
				if (tracker.frozen) return { bgcolor: combineRgb(0, 80, 200) }
				return { bgcolor: combineRgb(70, 70, 70) }
			},
		},

		record_all_status: {
			type: 'advanced',
			name: 'All Trackers - Record Status Color and Icon',
			options: [],
			callback: () => {
				const isRecording =
					instance.state.trackers.length > 0 && instance.state.trackers.every((t: TrackerInfo) => t.recording)

				// Oscillating record button (icons from the RealLine app's own SVGs):
				//   idle       → red record circle + white outline on grey  — "press to record"
				//   recording  → white stop square on red                   — "press to stop"
				return isRecording
					? {
							bgcolor: combineRgb(181, 0, 0),
							text: '',
							png64: STOP_ICON_PNG64,
							pngalignment: 'center:center',
						}
					: {
							bgcolor: combineRgb(70, 70, 70),
							text: '',
							png64: RECORD_ICON_PNG64,
							pngalignment: 'center:center',
						}
			},
		},
	}
}
