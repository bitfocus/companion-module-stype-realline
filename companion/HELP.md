# Stype RealLine

Control the Stype RealLine tracking system from Bitfocus Companion.

## Setup

1. Set the **Host** to the IP address of the machine running RealLine. Use `127.0.0.1` if it is on the same machine.
2. Set the **Port** to the WebSocket port configured in RealLine. The default is `9091`.
3. The module connects automatically and stays connected with auto-reconnect.

## Actions

| Action                          | Description                                |
| ------------------------------- | ------------------------------------------ |
| Start Preview - All Trackers    | Begins previewing on all trackers          |
| Stop Preview - All Trackers     | Stops previewing on all trackers           |
| Start Recording - All Trackers  | Begins recording on all trackers           |
| Stop Recording - All Trackers   | Stops recording on all trackers            |
| Start Preview - Tracker         | Begins previewing on a specific tracker    |
| Stop Preview - Tracker          | Stops previewing on a specific tracker     |
| Start Recording - Tracker       | Starts recording on a specific tracker     |
| Stop Recording - Tracker        | Stops recording on a specific tracker      |
| Toggle Recording - All Trackers | Toggles recording for all trackers         |
| Toggle Preview - All Trackers   | Toggles preview for all trackers           |
| Next Scene                      | Advances to the next scene                 |
| Reset Take No                   | Resets the take number                     |
| Refresh State                   | Requests a full state update from RealLine |

## Feedbacks

| Feedback                      | Description                                          |
| ----------------------------- | ---------------------------------------------------- |
| Tracker - Is Recording        | Button lights red when tracker is recording          |
| Tracker - Is Previewing       | Button lights green when tracker is previewing       |
| Tracker - Is Frozen           | Button lights blue when tracker tracking is frozen   |
| Tracker - Has Warning         | Button lights yellow when tracker has a warning      |
| Any Tracker - Is Recording    | Button lights red when any tracker is recording      |
| Any Tracker - Is Previewing   | Button lights green when any tracker is previewing   |
| Any Tracker - Has Warning     | Button lights yellow when any tracker has a warning  |
| All Trackers - All Recording  | Button lights red when all trackers are recording    |
| All Trackers - All Previewing | Button lights green when all trackers are previewing |
| RealLine - Connected          | Button lights green when WebSocket is connected      |

## Variables

Use these variables in button text to show session, take, and timecode data on Stream Deck buttons.

| Variable                                    | Description                                          |
| ------------------------------------------- | ---------------------------------------------------- |
| `$(stype-realline:connected)`               | `Connected` or `Disconnected`                        |
| `$(stype-realline:project_name)`            | Current project name                                 |
| `$(stype-realline:session_name)`            | Current session name                                 |
| `$(stype-realline:scene_no)`                | Current scene number/name                            |
| `$(stype-realline:take_no)`                 | Current take number                                  |
| `$(stype-realline:timecode)`                | Current timecode                                     |
| `$(stype-realline:timecode_hours)`          | Current timecode hours                               |
| `$(stype-realline:timecode_minutes)`        | Current timecode minutes                             |
| `$(stype-realline:timecode_seconds)`        | Current timecode seconds                             |
| `$(stype-realline:timecode_frames)`         | Current timecode frames                              |
| `$(stype-realline:tracker_count)`           | Total number of trackers                             |
| `$(stype-realline:active_count)`            | Number of trackers currently recording or previewing |
| `$(stype-realline:tracker_names)`           | Comma-separated list of all tracker names            |
| `$(stype-realline:tracker_NAME_recording)`  | `true`/`false` for a specific tracker                |
| `$(stype-realline:tracker_NAME_previewing)` | `true`/`false` for a specific tracker                |
| `$(stype-realline:tracker_NAME_frozen)`     | `true`/`false` for a specific tracker                |
| `$(stype-realline:tracker_NAME_warning)`    | `true`/`false` for a specific tracker                |

`NAME` is the tracker name with non-alphanumeric characters replaced by `_`.

## Presets

The module includes presets for project name, session name, scene name, take number, full timecode, and separate timecode hours/minutes/seconds/frames buttons.

The Record - All Trackers and Preview - All Trackers presets use icon-only buttons. They switch between play/pause icons and active/idle colors.
