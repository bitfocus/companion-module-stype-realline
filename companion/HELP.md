# sType RealLine

Control the sType RealLine tracking system from Bitfocus Companion.

## Setup

1. Set the **Host** to the IP address of the machine running RealLine (use `127.0.0.1` if on the same machine).
2. Set the **Port** to the WebSocket port configured in RealLine (default: `9091`).
3. The module connects automatically and stays connected with auto-reconnect.

## Actions

| Action | Description |
|--------|-------------|
| Start Preview — All Trackers | Begins previewing on all trackers |
| Stop Preview — All Trackers | Stops previewing on all trackers |
| Start Recording — All Trackers | Begins recording on all trackers |
| Stop Recording — All Trackers | Stops recording on all trackers |
| Start Preview — Tracker | Begins previewing on a specific tracker |
| Stop Preview — Tracker | Stops previewing on a specific tracker |
| Start Recording — Tracker | Begins recording on a specific tracker |
| Stop Recording — Tracker | Stops recording on a specific tracker |
| Refresh State | Requests a full state update from RealLine |

## Feedbacks

| Feedback | Description |
|----------|-------------|
| Tracker — Is Recording | Button lights red when tracker is recording |
| Tracker — Is Previewing | Button lights green when tracker is previewing |
| Tracker — Is Frozen | Button lights blue when tracker tracking is frozen |
| Any Tracker — Is Recording | Button lights red when any tracker is recording |
| Any Tracker — Is Previewing | Button lights green when any tracker is previewing |
| RealLine — Connected | Button lights green when WebSocket is connected |

## Variables

| Variable | Description |
|----------|-------------|
| `$(realline:connected)` | `Connected` or `Disconnected` |
| `$(realline:tracker_count)` | Total number of trackers |
| `$(realline:active_count)` | Number of trackers currently recording or previewing |
| `$(realline:tracker_names)` | Comma-separated list of all tracker names |
| `$(realline:tracker_NAME_recording)` | `true`/`false` for a specific tracker |
| `$(realline:tracker_NAME_previewing)` | `true`/`false` for a specific tracker |
| `$(realline:tracker_NAME_frozen)` | `true`/`false` for a specific tracker |

(NAME is the tracker name with non-alphanumeric characters replaced by `_`)
