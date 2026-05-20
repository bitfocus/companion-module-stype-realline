import type { CompanionVariableDefinitions, CompanionVariableValues } from '@companion-module/base'
import type { StateManager } from './state.js'

function safeName(name: string): string {
	return name.replace(/[^a-zA-Z0-9_]/g, '_')
}

export function getVariableDefinitions(state: StateManager): CompanionVariableDefinitions {
	const defs: CompanionVariableDefinitions = {
		connected: { name: 'Connection Status' },
		timecode: { name: 'Timecode (first tracker)' },
		tracker_count: { name: 'Total Tracker Count' },
		active_count: { name: 'Active Tracker Count (recording or previewing)' },
		tracker_names: { name: 'All Tracker Names (comma-separated)' },
	}

	for (const tracker of state.trackers) {
		const s = safeName(tracker.name)
		defs[`tracker_${s}_recording`] = { name: `${tracker.name} - Recording` }
		defs[`tracker_${s}_previewing`] = { name: `${tracker.name} - Previewing` }
		defs[`tracker_${s}_frozen`] = { name: `${tracker.name} - Frozen` }
		defs[`tracker_${s}_warning`] = { name: `${tracker.name} - Has Warning` }
	}

	return defs
}

export function getVariableValues(state: StateManager): CompanionVariableValues {
	const values: CompanionVariableValues = {
		connected: state.wsConnected ? 'Connected' : 'Disconnected',
		timecode: state.timecode,
		tracker_count: state.trackers.length,
		active_count: state.trackers.filter((t) => t.recording || t.previewing).length,
		tracker_names: state.trackers.map((t) => t.name).join(', '),
	}

	for (const tracker of state.trackers) {
		const s = safeName(tracker.name)
		values[`tracker_${s}_recording`] = tracker.recording
		values[`tracker_${s}_previewing`] = tracker.previewing
		values[`tracker_${s}_frozen`] = tracker.frozen
		values[`tracker_${s}_warning`] = tracker.hasWarning
	}

	return values
}
