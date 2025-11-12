/**
 * Common style constants for consistent styling across components
 * Use these instead of inline styles to improve maintainability and bundle size
 */

export const TEXT_SHADOW_STRONG = {
  textShadow: "0 2px 8px rgba(0,0,0,0.5)"
} as const;

export const TEXT_SHADOW_MEDIUM = {
  textShadow: "0 1px 4px rgba(0,0,0,0.3)"
} as const;

export const TEXT_SHADOW_LIGHT = {
  textShadow: "0 1px 2px rgba(0,0,0,0.2)"
} as const;
