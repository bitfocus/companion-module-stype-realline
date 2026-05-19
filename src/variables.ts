import type { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'
import type { StateManager } from './state.js'

function safeName(name: string): string {
	return name.replace(/[^a-zA-Z0-9_]/g, '_')
}

export function getVariableDefinitions(state: StateManager): CompanionVariableDefinition[] {
	const defs: CompanionVariableDefinition[] = [
		{ variableId: 'connected', name: 'Connection Status' },
		{ variableId: 'tracker_count', name: 'Total Tracker Count' },
		{ variableId: 'active_count', name: 'Active Tracker Count (recording or previewing)' },
		{ variableId: 'tracker_names', name: 'All Tracker Names (comma-separated)' },
	]

	for (const tracker of state.trackers) {
		const s = safeName(tracker.name)
		defs.push(
			{ variableId: `tracker_${s}_recording`, name: `${tracker.name} — Recording` },
			{ variableId: `tracker_${s}_previewing`, name: `${tracker.name} — Previewing` },
			{ variableId: `tracker_${s}_frozen`, name: `${tracker.name} — Frozen` },
			{ variableId: `tracker_${s}_warning`, name: `${tracker.name} — Has Warning` },
		)
	}

	return defs
}

export function getVariableValues(state: StateManager): CompanionVariableValues {
	const values: CompanionVariableValues = {
		connected: state.wsConnected ? 'Connected' : 'Disconnected',
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
