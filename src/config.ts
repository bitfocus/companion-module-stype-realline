import type { SomeCompanionConfigField } from '@companion-module/base'
import type { ModuleConfig } from './types.js'

export function getConfigFields(): SomeCompanionConfigField[] {
	return [
		{
			type: 'textinput',
			id: 'host',
			label: 'RealLine Host',
			default: '127.0.0.1',
			width: 8,
		},
		{
			type: 'number',
			id: 'port',
			label: 'WebSocket Port',
			default: 9091,
			min: 1,
			max: 65535,
			width: 4,
		},
		{
			type: 'number',
			id: 'reconnect_interval',
			label: 'Reconnect Interval (seconds)',
			default: 5,
			min: 1,
			max: 60,
			width: 4,
		},
	]
}

export function getWsUrl(config: ModuleConfig): string {
	return `ws://${config.host}:${config.port}`
}
