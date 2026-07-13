// Media-control glyphs (Unicode) rendered as button text, replacing bundled PNGs.
// Single source of truth: tweak a glyph here and it updates every feedback/preset.
//
// We use the geometric block (● ■ ↻ ⏭) which Companion's button font renders
// reliably across builds, rather than the dedicated media block (⏺ ⏹) which can
// show up as a missing-glyph box on some systems.
export const RECORD_GLYPH = '●' // U+25CF  filled circle — "press to record"
export const STOP_GLYPH = '■' // U+25A0  filled square — "press to stop"
export const NEXT_GLYPH = '⏭' // U+23ED  (fallback: '▶▶')
export const RELOAD_GLYPH = '↻' // U+21BB
