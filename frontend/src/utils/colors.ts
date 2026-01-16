export const falabellaColors = {
  // Primary
  green: {
    main: '#B8DC28',    // Verde lima claro (de falabella.com)
    light: '#C9E559',   // Verde más claro
    dark: '#96BD23',    // Verde oscuro
  },
  orange: {
    main: '#FF6B00',    // Naranja principal
    light: '#F7931E',   // Naranja claro
    dark: '#CC5500',
  },
  blue: {
    main: '#0033A0',    // Azul corporativo
    light: '#3366CC',
    dark: '#002080',
  },
  red: {
    main: '#E31E24',    // Rojo
    light: '#FF4444',
    dark: '#B71C1C',
  },
  // Neutrals
  gray: {
    100: '#F5F5F5',
    300: '#E0E0E0',
    500: '#9E9E9E',
    700: '#616161',
    900: '#212121',
  },
  white: '#FFFFFF',
  black: '#000000',
};

// Color coding para OP2
export const op2Colors: Record<string, string> = {
  'Data definition': '#FFE5CC',
  'Data capture': '#CCE0FF',
  'Data processing': '#FFD9B3',
  'Data assets': '#D4EDDA',
  'FinOps': '#F8D7DA',
};

// Color coding para Priority
export const priorityColors: Record<string, string> = {
  'P1': falabellaColors.red.main,
  'P2': falabellaColors.orange.main,
  'P3': falabellaColors.green.main,
  'TBD': falabellaColors.gray[500],
};
