import { InstanceBase, InstanceStatus, runEntrypoint } from '@companion-module/base'
import type { ModuleConfig, WsEvent } from './types.js'
import { getConfigFields } from './config.js'
import { StateManager } from './state.js'
import { WsClient } from './ws.js'
import { getActions } from './actions.js'
import { getFeedbacks } from './feedbacks.js'
import { getPresets } from './presets.js'
import { getVariableDefinitions, getVariableValues } from './variables.js'
import { upgradeScripts } from './upgrade.js'

const STATE_UPDATE_DEBOUNCE_MS = 50

export class RealLineInstance extends InstanceBase<ModuleConfig> {
	state!: StateManager
	ws!: WsClient

	private stateUpdateTimer: ReturnType<typeof setTimeout> | null = null
	private lastDefsHash = ''

	constructor(internal: unknown) {
		super(internal)
	}

	// ── Lifecycle ─────────────────────────────────────────────────────────────

	async init(config: ModuleConfig): Promise<void> {
		this.state = new StateManager(() => this.onStateChanged())

		this.ws = new WsClient(config, {
			onMessage: (msg) => this.handleWsMessage(msg),
			onConnected: () => this.handleWsConnected(),
			onDisconnected: () => this.handleWsDisconnected(),
			log: (level, msg) => this.log(level, msg),
		})

		this.updateStatus(InstanceStatus.Connecting)
		this.pushUpdates()
		this.ws.connect()
	}

	async configUpdated(config: ModuleConfig): Promise<void> {
		this.ws.updateConfig(config)
	}

	async destroy(): Promise<void> {
		if (this.stateUpdateTimer) { clearTimeout(this.stateUpdateTimer); this.stateUpdateTimer = null }
		this.ws?.destroy()
	}

	getConfigFields() {
		return getConfigFields()
	}

	// ── WebSocket handlers ────────────────────────────────────────────────────

	private handleWsConnected(): void {
		this.state.wsConnected = true
		this.updateStatus(InstanceStatus.Ok)
		this.ws.send({ cmd: 'get_state' })
	}

	private handleWsDisconnected(): void {
		this.state.wsConnected = false
		this.updateStatus(InstanceStatus.ConnectionFailure)
		this.onStateChanged()
	}

	private handleWsMessage(msg: WsEvent): void {
		switch (msg.event) {
			case 'state':
				this.state.updateTrackers(msg.trackers)
				break
			case 'tracker_state':
				this.state.updateTracker(msg)
				break
			case 'pong':
				break
			case 'error':
				this.log('warn', `RealLine: ${msg.message}`)
				break
		}
	}

	// ── State change / update push ────────────────────────────────────────────

	private onStateChanged(): void {
		if (this.stateUpdateTimer) clearTimeout(this.stateUpdateTimer)
		this.stateUpdateTimer = setTimeout(() => {
			this.stateUpdateTimer = null
			this.pushUpdates()
		}, STATE_UPDATE_DEBOUNCE_MS)
	}

	private pushUpdates(): void {
		const hash = this.state.trackersHash()
		if (hash !== this.lastDefsHash) {
			this.lastDefsHash = hash
			this.setActionDefinitions(getActions(this))
			this.setFeedbackDefinitions(getFeedbacks(this))
			this.setVariableDefinitions(getVariableDefinitions(this.state))
			this.setPresetDefinitions(getPresets(this))
		}
		this.setVariableValues(getVariableValues(this.state))
		this.checkFeedbacks()
	}
}

runEntrypoint(RealLineInstance, upgradeScripts)
