import { useState } from 'react';

// material-ui
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// assets
import { ArrowDown2, Paintbucket, TextBold, TextItalic, TextUnderline } from 'iconsax-react';

// ==============================|| TOGGLE BUTTON - MULTIPLE ||============================== //

export default function MultipleToggleButtons() {
  const [formats, setFormats] = useState(() => ['bold', 'italic']);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  return (
    <ToggleButtonGroup value={formats} onChange={handleFormat} aria-label="text formatting">
      <ToggleButton value="bold" aria-label="bold">
        <TextBold />
      </ToggleButton>
      <ToggleButton value="italic" aria-label="italic">
        <TextItalic />
      </ToggleButton>
      <ToggleButton value="underlined" aria-label="underlined">
        <TextUnderline />
      </ToggleButton>
      <ToggleButton value="color" aria-label="color" disabled>
        <Paintbucket />
        <ArrowDown2 style={{ fontSize: '0.625rem', marginLeft: 6 }} />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
