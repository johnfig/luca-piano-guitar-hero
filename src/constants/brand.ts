// Piano Pals — Brand Identity
export const BRAND = {
  name: 'Piano Pals',
  tagline: 'Learn piano, have fun',
} as const;

// Color palette
export const COLORS = {
  // Primary accent — warm coral
  primary: '#FF6B6B',
  primaryLight: '#FF8A8A',
  primaryDark: '#E85555',
  primaryGlow: 'rgba(255, 107, 107, 0.4)',

  // Secondary accent — soft teal
  secondary: '#4ECDC4',
  secondaryLight: '#7EDDD6',
  secondaryDark: '#3BA99E',
  secondaryGlow: 'rgba(78, 205, 196, 0.4)',

  // Achievement gold
  gold: '#FFD700',
  goldLight: '#FFE44D',
  goldDark: '#B8860B',
  goldGlow: 'rgba(255, 215, 0, 0.5)',

  // Backgrounds — deep purple-black
  bgPrimary: '#110D21',
  bgCard: '#1A1530',
  bgElevated: '#231D40',
  bgHover: '#2A2350',

  // Text
  textPrimary: '#F5F0FF',
  textSecondary: '#A09BB8',
  textMuted: '#635E78',
  textDim: '#3D3856',

  // Borders
  border: 'rgba(255, 255, 255, 0.08)',
  borderLight: 'rgba(255, 255, 255, 0.12)',
  borderActive: 'rgba(255, 255, 255, 0.20)',

  // Semantic
  streak: '#FF9F43',
  success: '#2ED573',
  error: '#FF4757',
} as const;

// Gradients (CSS strings)
export const GRADIENTS = {
  // Brand gradient for logo/headings
  brand: 'linear-gradient(135deg, #FF6B6B, #FF8E53, #FFD93D)',
  // XP/progress bar
  xp: 'linear-gradient(90deg, #FF6B6B, #FF8E53)',
  // Primary button
  button: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
  // Success/next level
  success: 'linear-gradient(135deg, #2ED573, #4ECDC4)',
  // Card subtle glow
  cardGlow: 'radial-gradient(ellipse at center, rgba(255,107,107,0.06), transparent 70%)',
} as const;
