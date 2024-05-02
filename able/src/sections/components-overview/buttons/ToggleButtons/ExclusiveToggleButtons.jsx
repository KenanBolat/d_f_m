import { useState } from 'react';

// material-ui
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// assets
import { TextalignCenter, TextalignJustifycenter, TextalignLeft, TextalignRight } from 'iconsax-react';

// ==============================|| TOGGLE BUTTON - EXCLUSIVE ||============================== //

export default function ExclusiveToggleButtons() {
  const [alignment, setAlignment] = useState('left');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment} aria-label="text alignment">
      <ToggleButton value="left" aria-label="left aligned">
        <TextalignCenter />
      </ToggleButton>
      <ToggleButton value="center" aria-label="centered">
        <TextalignRight />
      </ToggleButton>
      <ToggleButton value="right" aria-label="right aligned">
        <TextalignLeft />
      </ToggleButton>
      <ToggleButton value="list" aria-label="list" disabled sx={{ '&.Mui-disabled': { color: 'text.disabled' } }}>
        <TextalignJustifycenter />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
