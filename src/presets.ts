import { combineRgb } from '@companion-module/base'
import type { CompanionPresetDefinitions, CompanionPresetSection } from '@companion-module/base'
import { NEXT_ICON_PNG64, PLAY_ICON_PNG64, RELOAD_ICON_PNG64 } from './icons.js'
import type RealLineInstance from './main.js'

const WHITE = combineRgb(255, 255, 255)
const GREEN = combineRgb(0, 160, 0)
const BLACK = combineRgb(0, 0, 0)
const GREY = combineRgb(70, 70, 70)
const YELLOW = combineRgb(220, 120, 0)

const REFRESH_STEP = [{ down: [{ actionId: 'refresh_state', options: {} }], up: [] }]

export function getPresetSections(): CompanionPresetSection[] {
	return [
		{
			id: 'system',
			name: 'System',
			definitions: [
				{
					id: 'session_data',
					name: 'Session Data',
					type: 'simple',
					presets: [
						'connection_status',
						'timecode_full',
						'timecode_hours',
						'timecode_minutes',
						'timecode_seconds',
						'timecode_frames',
						'project_name',
						'session_name',
						'scene_no',
						'take_no',
					],
				},
			],
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
		style: { text: '$(stype-realline:connected)', size: '14', color: WHITE, bgcolor: BLACK },
		feedbacks: [{ feedbackId: 'connected', options: {}, style: { bgcolor: GREEN, color: WHITE } }],
		steps: REFRESH_STEP,
	}

	presets['timecode_full'] = {
		type: 'simple',
		name: 'Timecode',
		style: { text: '$(stype-realline:timecode)', size: '14', color: WHITE, bgcolor: GREY },
		feedbacks: [],
		steps: REFRESH_STEP,
	}

	presets['timecode_hours'] = {
		type: 'simple',
		name: 'Timecode Hours',
		style: { text: '$(stype-realline:timecode_hours)', size: '30', color: WHITE, bgcolor: GREY },
		feedbacks: [],
		steps: REFRESH_STEP,
	}

	presets['timecode_minutes'] = {
		type: 'simple',
		name: 'Timecode Minutes',
		style: { text: '$(stype-realline:timecode_minutes)', size: '30', color: WHITE, bgcolor: GREY },
		feedbacks: [],
		steps: REFRESH_STEP,
	}

	presets['timecode_seconds'] = {
		type: 'simple',
		name: 'Timecode Seconds',
		style: { text: '$(stype-realline:timecode_seconds)', size: '30', color: WHITE, bgcolor: GREY },
		feedbacks: [],
		steps: REFRESH_STEP,
	}

	presets['timecode_frames'] = {
		type: 'simple',
		name: 'Timecode Frames',
		style: { text: '$(stype-realline:timecode_frames)', size: '30', color: WHITE, bgcolor: GREY },
		feedbacks: [],
		steps: REFRESH_STEP,
	}

	presets['project_name'] = {
		type: 'simple',
		name: 'Project Name',
		style: { text: 'PROJECT\n$(stype-realline:project_name)', size: '14', color: WHITE, bgcolor: GREY },
		feedbacks: [],
		steps: REFRESH_STEP,
	}

	presets['session_name'] = {
		type: 'simple',
		name: 'Session Name',
		style: { text: 'SESSION\n$(stype-realline:session_name)', size: '14', color: WHITE, bgcolor: GREY },
		feedbacks: [],
		steps: REFRESH_STEP,
	}

	presets['scene_no'] = {
		type: 'simple',
		name: 'Scene Name',
		style: { text: 'SCENE\n$(stype-realline:scene_no)', size: '14', color: WHITE, bgcolor: GREY },
		feedbacks: [],
		steps: REFRESH_STEP,
	}

	presets['take_no'] = {
		type: 'simple',
		name: 'Take Number',
		style: { text: 'TAKE\n$(stype-realline:take_no)', size: '24', color: WHITE, bgcolor: GREY },
		feedbacks: [],
		steps: REFRESH_STEP,
	}

	presets['record_all'] = {
		type: 'simple',
		name: 'Record - All Trackers',
		style: {
			text: '',
			size: '14',
			color: WHITE,
			bgcolor: BLACK,
			png64: PLAY_ICON_PNG64,
			pngalignment: 'center:center',
		},
		feedbacks: [
			{ feedbackId: 'record_all_status', options: {} },
			{ feedbackId: 'any_warning', options: {}, style: { bgcolor: YELLOW } },
			{ feedbackId: 'not_all_recording', options: {}, style: { bgcolor: BLACK, png64: PLAY_ICON_PNG64 } },
		],
		steps: [{ down: [{ actionId: 'toggle_record_all', options: {} }], up: [] }],
	}

	presets['preview_all'] = {
		type: 'simple',
		name: 'Preview - All Trackers',
		style: {
			text: '',
			size: '14',
			color: WHITE,
			bgcolor: BLACK,
			png64: PLAY_ICON_PNG64,
			pngalignment: 'center:center',
		},
		feedbacks: [
			{ feedbackId: 'preview_all_status', options: {} },
			{ feedbackId: 'any_warning', options: {}, style: { bgcolor: YELLOW } },
			{ feedbackId: 'not_all_previewing', options: {}, style: { bgcolor: BLACK, png64: PLAY_ICON_PNG64 } },
		],
		steps: [{ down: [{ actionId: 'toggle_preview_all', options: {} }], up: [] }],
	}

	presets['next_scene'] = {
		type: 'simple',
		name: 'Next Scene',
		style: {
			text: '',
			size: '14',
			color: BLACK,
			bgcolor: WHITE,
			png64: NEXT_ICON_PNG64,
			pngalignment: 'center:center',
		},
		feedbacks: [],
		steps: [{ down: [{ actionId: 'next_scene', options: {} }], up: [] }],
	}

	presets['reset_take_number'] = {
		type: 'simple',
		name: 'Reset Take Number',
		style: {
			text: '',
			size: '14',
			color: BLACK,
			bgcolor: WHITE,
			png64: RELOAD_ICON_PNG64,
			pngalignment: 'center:center',
		},
		feedbacks: [],
		steps: [{ down: [{ actionId: 'reset_take_number', options: {} }], up: [] }],
	}

	return presets
}
