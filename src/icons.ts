// Button icons.
//
// Record/Stop are PNG renders of the RealLine app's own button SVGs, so Companion
// matches the desktop UI exactly:
//   RECORD_ICON_PNG64 — filled red circle  (#B50000, RecordingStart.svg)
//   STOP_ICON_PNG64   — rounded near-white square (#E6E6E6, RecordingStop.svg)
// Both are 72×72, anti-aliased, transparent background — the feedback supplies the bg color.
//
// Next/Reload stay as text glyphs (the geometric block renders reliably across builds).
export const RECORD_ICON_PNG64 =
	'iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAACKElEQVR42u1bu23DMBDVCB5BI2gEj6ARNIJG8AYeQSOkSpMiLtKkCGCkSJPGRZp0Qto0L3iABEQ0aVu2+DPeA66xZJJ6ujvenY5FIQiCIAiCIAipAEAFoAXQAdgBOOAYh+FaN9xb3Tsp9fCwPa5HP4xR3xMxjUNDbgXHbETMvREFoBx8hxO/fY/vhwd8tC1e12s8lyUei2Ii/I3XeA/v5X/OgHOWOWiN80m+ug5vdX1ExqXC/3KMMz6qSZWcrUtbPjcbPK1WVxNjCsfimCe0apsaOdbXStOwmc9SwrE5hwNdsuTwzb43jTdiTOFcDm3qkjMrLvSlqoKRMwrndJC0jemQJ/jZ7xf1Ndf4Jq7BgibGVt6bmhOTnP8kWTSpDxoCmHFOLLOaaW67aKYV0iHPcdxRTM1MH7jNpkbOKJYQ4BBUe6jGPuOcJeIki6k1wbSH0Wyq5IzCNQbRoqGeM0EKu9Ylu5oFtfeImUlj6uSMYklwOx8ETYz5lqw8tHCtZlzko4Y8cc65kDOKxVlXSxLU5rK1z9jyW2/+h1W+3Ajimr35ITO1YCk0N4K4Zm+phxn/pBwcngoavcVD5si5kTOKCREkgkRQNgTJSWubV6DoNVBUqqFkVeUOf+UOFcxUclXRPsinH3320YdDfXpW80Ls5gW1v6iBSi14auLModNVbcBqJNdRBJ8hgA6zXKhNOg4Vkai8iXHUk3Qkc0aNW4d6BUEQBEEQhHzxBy+7f4T/v7UAAAAAAElFTkSuQmCC'

export const STOP_ICON_PNG64 =
	'iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAvElEQVR42u3bsQnDMBBAUY+oEbSZR9BI6m4NGYIrFyEQ0EnJ+3C9eXC4OR2HJEmSJGnbIqJGRIuIHhEjafr9DXUlmJKM8g6rZOOcC8I854SzGtK9VmOzKTOB+oZAfebfamw6dQZQ2xioWa/sNdsY5zWAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEA/D+T8xQGVEzxrlnbE6QzYIfnfIeXgPNbNY5YP/26eQ0mSJEmSvu4C3R0t7a1S5WMAAAAASUVORK5CYII='

export const NEXT_GLYPH = '⏭' // U+23ED  (fallback: '▶▶')
export const RELOAD_GLYPH = '↻' // U+21BB
