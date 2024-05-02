// material-ui
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

// project-imports
import MainCard from 'components/MainCard';

// assets
import { Coffee, Gift, Repeat, Screenmirroring } from 'iconsax-react';

// ==============================|| TIMELINE - CUSTOMIZED ||============================== //

export default function CustomizedTimeline() {
  const customTimelineCodeString = `<Timeline
  position="alternate"
  sx={{
    '& .MuiTimelineItem-root': { minHeight: 90 },
    '& .MuiTimelineOppositeContent-root': { mt: 0.5 },
    '& .MuiTimelineDot-root': {
      borderRadius: 1.25,
      boxShadow: 'none',
      margin: 0,
      ml: 1.25,
      mr: 1.25,
      p: 1,
      '& .MuiSvgIcon-root': { fontSize: '1.2rem' }
    },
    '& .MuiTimelineContent-root': { borderRadius: 1, bgcolor: 'secondary.lighter', height: '100%' },
    '& .MuiTimelineConnector-root': { border: '1px dashed', borderColor: 'secondary.light', bgcolor: 'transparent' }
  }}
>
  <TimelineItem>
    <TimelineOppositeContent align="right" variant="body2" color="text.secondary">
      9:30 am
    </TimelineOppositeContent>
    <TimelineSeparator>
      <TimelineDot sx={{ color: 'primary.main', bgcolor: 'primary.lighter' }}>
        <Coffee style={{ fontSize: '1.3rem' }} />
      </TimelineDot>
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>
      <Typography variant="h6" >
        Eat
      </Typography>
      <Typography color="text.secondary">Because you need strength</Typography>
    </TimelineContent>
  </TimelineItem>
  <TimelineItem>
    <TimelineOppositeContent variant="body2" color="text.secondary">
      10:00 am
    </TimelineOppositeContent>
    <TimelineSeparator>
      <TimelineDot sx={{ color: 'success.main', bgcolor: 'success.lighter' }}>
        <Screenmirroring style={{ fontSize: '1.3rem' }} />
      </TimelineDot>
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>
      <Typography variant="h6" >
        Code
      </Typography>
      <Typography color="text.secondary">Because it&apos;s awesome!</Typography>
    </TimelineContent>
  </TimelineItem>
  <TimelineItem>
    <TimelineOppositeContent align="right" variant="body2" color="text.secondary">
      11:30 am
    </TimelineOppositeContent>
    <TimelineSeparator>
      <TimelineDot sx={{ color: 'warning.main', bgcolor: 'warning.lighter' }}>
        <Gift style={{ fontSize: '1.3rem' }} />
      </TimelineDot>
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>
      <Typography variant="h6" >
        Gift
      </Typography>
      <Typography color="text.secondary">Because you need.</Typography>
    </TimelineContent>
  </TimelineItem>
  <TimelineItem>
    <TimelineOppositeContent align="right" variant="body2" color="text.secondary">
      12:30 am
    </TimelineOppositeContent>
    <TimelineSeparator>
      <TimelineDot sx={{ color: 'error.main', bgcolor: 'error.lighter' }}>
        <Repeat style={{ fontSize: '1.3rem' }} />
      </TimelineDot>
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>
      <Typography variant="h6" >
        Repeat
      </Typography>
      <Typography color="text.secondary">This is the life you love!</Typography>
    </TimelineContent>
  </TimelineItem>
</Timeline>`;

  return (
    <MainCard title="Customized" codeString={customTimelineCodeString}>
      <Timeline
        position="alternate"
        sx={{
          '& .MuiTimelineItem-root': { minHeight: 90 },
          '& .MuiTimelineOppositeContent-root': { mt: 0.5 },
          '& .MuiTimelineDot-root': {
            borderRadius: 1.25,
            boxShadow: 'none',
            margin: 0,
            ml: 1.25,
            mr: 1.25,
            p: 1,
            '& .MuiSvgIcon-root': { fontSize: '1.2rem' }
          },
          '& .MuiTimelineContent-root': { borderRadius: 1, bgcolor: 'secondary.lighter', height: '100%' },
          '& .MuiTimelineConnector-root': { border: '1px dashed', borderColor: 'secondary.light', bgcolor: 'transparent' }
        }}
      >
        <TimelineItem>
          <TimelineOppositeContent align="right" variant="body2" color="text.secondary">
            9:30 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot sx={{ color: 'primary.darker', bgcolor: 'primary.lighter' }}>
              <Coffee style={{ fontSize: '1.3rem' }} />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6">Eat</Typography>
            <Typography color="text.secondary">Because you need strength</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent variant="body2" color="text.secondary">
            10:00 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot sx={{ color: 'success.darker', bgcolor: 'success.lighter' }}>
              <Screenmirroring style={{ fontSize: '1.3rem' }} />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6">Code</Typography>
            <Typography color="text.secondary">Because it&apos;s awesome!</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent align="right" variant="body2" color="text.secondary">
            11:30 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot sx={{ color: 'warning.darker', bgcolor: 'warning.lighter' }}>
              <Gift style={{ fontSize: '1.3rem' }} />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6">Gift</Typography>
            <Typography color="text.secondary">Because you need.</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent align="right" variant="body2" color="text.secondary">
            12:30 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot sx={{ color: 'error.darker', bgcolor: 'error.lighter' }}>
              <Repeat style={{ fontSize: '1.3rem' }} />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6">Repeat</Typography>
            <Typography color="text.secondary">This is the life you love!</Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </MainCard>
  );
}
