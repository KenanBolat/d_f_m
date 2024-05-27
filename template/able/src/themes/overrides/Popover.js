// ==============================|| OVERRIDES - POPOVER ||============================== //

export default function Popover(theme) {
  return {
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: theme.customShadows.z1
        }
      }
    }
  };
}
