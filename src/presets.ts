import { combineRgb } from '@companion-module/base'
import type { CompanionPresetDefinitions, CompanionPresetSection } from '@companion-module/base'
import type RealLineInstance from './main.js'

const WHITE = combineRgb(255, 255, 255)
const RED = combineRgb(200, 0, 0)
const GREEN = combineRgb(0, 160, 0)
const GREY = combineRgb(70, 70, 70)
const YELLOW = combineRgb(220, 120, 0)

export function getPresetSections(): CompanionPresetSection[] {
	return [
		{
			id: 'system',
			name: 'System',
			definitions: [{ id: 'system', name: 'System', type: 'simple', presets: ['connection_status'] }],
		},
		{
			id: 'all_trackers',
			name: 'All Trackers',
			definitions: [
				{ id: 'all_trackers', name: 'All Trackers', type: 'simple', presets: ['record_all', 'preview_all'] },
			],
		},
		{
			id: 'scene',
			name: 'Scene',
			definitions: [{ id: 'scene', name: 'Scene', type: 'simple', presets: ['next_scene', 'reset_take_number'] }],
		},
	]
}

export function getPresets(_instance: RealLineInstance): CompanionPresetDefinitions {
	const presets: CompanionPresetDefinitions = {}

	presets['connection_status'] = {
		type: 'simple',
		name: 'Connection Status',
		style: { text: '$(stype-realline:connected)', size: '14', color: WHITE, bgcolor: GREY },
		feedbacks: [{ feedbackId: 'connected', options: {}, style: { bgcolor: GREEN } }],
		steps: [{ down: [{ actionId: 'refresh_state', options: {} }], up: [] }],
	}

	presets['record_all'] = {
		type: 'simple',
		name: 'Record — All Trackers',
		style: { text: 'RECORD', size: '18', color: WHITE, bgcolor: GREY },
		feedbacks: [
			{ feedbackId: 'all_recording', options: {}, style: { bgcolor: RED } },
			{ feedbackId: 'any_warning', options: {}, style: { bgcolor: YELLOW } },
			{ feedbackId: 'not_all_recording', options: {}, style: { bgcolor: GREY } },
		],
		steps: [{ down: [{ actionId: 'toggle_record_all', options: {} }], up: [] }],
	}

	presets['preview_all'] = {
		type: 'simple',
		name: 'Preview — All Trackers',
		style: { text: 'PREVIEW', size: '18', color: WHITE, bgcolor: GREY },
		feedbacks: [
			{ feedbackId: 'all_previewing', options: {}, style: { bgcolor: GREEN } },
			{ feedbackId: 'any_warning', options: {}, style: { bgcolor: YELLOW } },
			{ feedbackId: 'not_all_previewing', options: {}, style: { bgcolor: GREY } },
		],
		steps: [{ down: [{ actionId: 'toggle_preview_all', options: {} }], up: [] }],
	}

	presets['next_scene'] = {
		type: 'simple',
		name: 'Next Scene',
		style: { text: 'NEXT\nSCENE', size: '14', color: WHITE, bgcolor: GREY },
		feedbacks: [],
		steps: [{ down: [{ actionId: 'next_scene', options: {} }], up: [] }],
	}

	presets['reset_take_number'] = {
		type: 'simple',
		name: 'Reset Take Number',
		style: { text: 'RESET\nTAKE', size: '14', color: WHITE, bgcolor: GREY },
		feedbacks: [],
		steps: [{ down: [{ actionId: 'reset_take_number', options: {} }], up: [] }],
	}

	return presets
}
