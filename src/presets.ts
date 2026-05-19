import { combineRgb } from '@companion-module/base'
import type { CompanionPresetDefinitions } from '@companion-module/base'
import type { RealLineInstance } from './main.js'

const WHITE = combineRgb(255, 255, 255)
const RED_DIM = combineRgb(130, 0, 0)
const RED = combineRgb(200, 0, 0)
const GREEN_DIM = combineRgb(0, 100, 0)
const GREEN = combineRgb(0, 160, 0)
const GREY = combineRgb(70, 70, 70)

export function getPresets(instance: RealLineInstance): CompanionPresetDefinitions {
	const presets: CompanionPresetDefinitions = {}

	// ── System ────────────────────────────────────────────────────────────────

	presets['connection_status'] = {
		type: 'button',
		name: 'Connection Status',
		category: 'System',
		style: { text: '$(stype-realline:connected)', size: '14', color: WHITE, bgcolor: GREY },
		feedbacks: [{ feedbackId: 'connected', options: {}, style: { bgcolor: GREEN } }],
		steps: [{ down: [{ actionId: 'refresh_state', options: {} }], up: [] }],
	}

	// ── All Trackers ──────────────────────────────────────────────────────────

	const YELLOW = combineRgb(220, 120, 0)

	presets['recall'] = {
		type: 'button',
		name: 'RECALL (Toggle Record All)',
		category: 'All Trackers',
		style: { text: 'RECALL', size: '18', color: WHITE, bgcolor: GREY },
		feedbacks: [
			{ feedbackId: 'all_recording', options: {}, style: { bgcolor: RED } },
			{ feedbackId: 'any_warning', options: {}, style: { bgcolor: YELLOW } },
			{ feedbackId: 'not_all_recording', options: {}, style: { bgcolor: GREY } },
		],
		steps: [{ down: [{ actionId: 'toggle_record_all', options: {} }], up: [] }],
	}

	presets['record_start_all'] = {
		type: 'button',
		name: 'Start Recording — All',
		category: 'All Trackers',
		style: { text: 'REC\nALL', size: '18', color: WHITE, bgcolor: RED_DIM },
		feedbacks: [{ feedbackId: 'any_recording', options: {}, style: { bgcolor: RED } }],
		steps: [{ down: [{ actionId: 'record_start_all', options: {} }], up: [] }],
	}

	presets['record_stop_all'] = {
		type: 'button',
		name: 'Stop Recording — All',
		category: 'All Trackers',
		style: { text: 'STOP REC\nALL', size: '14', color: WHITE, bgcolor: GREY },
		feedbacks: [],
		steps: [{ down: [{ actionId: 'record_stop_all', options: {} }], up: [] }],
	}

	presets['preview_start_all'] = {
		type: 'button',
		name: 'Start Preview — All',
		category: 'All Trackers',
		style: { text: 'PREV\nALL', size: '18', color: WHITE, bgcolor: GREEN_DIM },
		feedbacks: [{ feedbackId: 'any_previewing', options: {}, style: { bgcolor: GREEN } }],
		steps: [{ down: [{ actionId: 'preview_start_all', options: {} }], up: [] }],
	}

	presets['preview_stop_all'] = {
		type: 'button',
		name: 'Stop Preview — All',
		category: 'All Trackers',
		style: { text: 'STOP PREV\nALL', size: '14', color: WHITE, bgcolor: GREY },
		feedbacks: [],
		steps: [{ down: [{ actionId: 'preview_stop_all', options: {} }], up: [] }],
	}

	// ── Per-Tracker ───────────────────────────────────────────────────────────

	for (const tracker of instance.state.trackers) {
		const key = tracker.name.replace(/[^a-zA-Z0-9]/g, '_')
		const name = tracker.name

		presets[`record_start_${key}`] = {
			type: 'button',
			name: `Start Recording — ${name}`,
			category: `Tracker: ${name}`,
			style: { text: `REC\n${name}`, size: '14', color: WHITE, bgcolor: RED_DIM },
			feedbacks: [{ feedbackId: 'recording', options: { tracker: name }, style: { bgcolor: RED } }],
			steps: [{ down: [{ actionId: 'record_start', options: { tracker: name } }], up: [] }],
		}

		presets[`record_stop_${key}`] = {
			type: 'button',
			name: `Stop Recording — ${name}`,
			category: `Tracker: ${name}`,
			style: { text: `STOP REC\n${name}`, size: '14', color: WHITE, bgcolor: GREY },
			feedbacks: [],
			steps: [{ down: [{ actionId: 'record_stop', options: { tracker: name } }], up: [] }],
		}

		presets[`preview_start_${key}`] = {
			type: 'button',
			name: `Start Preview — ${name}`,
			category: `Tracker: ${name}`,
			style: { text: `PREV\n${name}`, size: '14', color: WHITE, bgcolor: GREEN_DIM },
			feedbacks: [{ feedbackId: 'previewing', options: { tracker: name }, style: { bgcolor: GREEN } }],
			steps: [{ down: [{ actionId: 'preview_start', options: { tracker: name } }], up: [] }],
		}

		presets[`preview_stop_${key}`] = {
			type: 'button',
			name: `Stop Preview — ${name}`,
			category: `Tracker: ${name}`,
			style: { text: `STOP PREV\n${name}`, size: '14', color: WHITE, bgcolor: GREY },
			feedbacks: [],
			steps: [{ down: [{ actionId: 'preview_stop', options: { tracker: name } }], up: [] }],
		}
	}

	return presets
}
