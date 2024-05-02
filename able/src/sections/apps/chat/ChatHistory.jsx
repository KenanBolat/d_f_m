import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

// project-imports
import UserAvatar from './UserAvatar';
import ChatMessageAction from './ChatMessageAction';
import IconButton from 'components/@extended/IconButton';
import CircularLoader from 'components/CircularLoader';

import { useGetUserChat } from 'api/chat';
import { ThemeMode } from 'config';

// assets
import { Edit } from 'iconsax-react';

// ==============================|| CHAT - HISTORY ||============================== //

export default function ChatHistory({ theme, user }) {
  const bottomRef = useRef(null);
  const { chat, chatLoading } = useGetUserChat(user.name);

  useEffect(() => {
    // @ts-ignore
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    // eslint-disable-next-line
  }, [chat]);

  if (chatLoading) <CircularLoader />;

  return (
    <Grid container spacing={2.5}>
      {chat.map((history, index) => (
        <Grid item xs={12} key={index}>
          {history.from !== user.name ? (
            <Stack spacing={1.25} direction="row" alignItems="flex-start">
              <Grid container justifyContent="flex-end">
                <Grid item xs={2} md={3} xl={4} />

                <Grid item xs={10} md={9} xl={8}>
                  <Stack direction="row" justifyContent="flex-end" alignItems="flex-start">
                    <ChatMessageAction index={index} />
                    <IconButton size="small" color="secondary">
                      <Edit />
                    </IconButton>
                    <Card
                      sx={{
                        display: 'inline-block',
                        float: 'right',
                        bgcolor: theme.palette.primary.main,
                        boxShadow: 'none',
                        ml: 1
                      }}
                    >
                      <CardContent sx={{ p: 1, pb: '8px !important', width: 'fit-content', ml: 'auto' }}>
                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                            <Typography variant="h6" color={theme.palette.common.white} sx={{ overflowWrap: 'anywhere' }}>
                              {history.text}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Stack>
                </Grid>
                <Grid item xs={12} sx={{ mt: 1 }}>
                  <Typography align="right" variant="subtitle2" color="text.secondary">
                    {history.time}
                  </Typography>
                </Grid>
              </Grid>
              <UserAvatar user={{ online_status: 'available', avatar: 'avatar-1.png', name: 'User 1' }} />
            </Stack>
          ) : (
            <Stack direction="row" spacing={1.25} alignItems="flex-start">
              <UserAvatar user={{ online_status: user.online_status, avatar: user.avatar, name: user.name }} />

              <Grid container>
                <Grid item xs={12} sm={7}>
                  <Card
                    sx={{
                      display: 'inline-block',
                      float: 'left',
                      bgcolor: theme.palette.mode === ThemeMode.DARK ? 'background.background' : 'common.white',
                      boxShadow: 'none'
                    }}
                  >
                    <CardContent sx={{ p: 1, pb: '8px !important' }}>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <Typography variant="h6" color="text.primary" sx={{ overflowWrap: 'anywhere' }}>
                            {history.text}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sx={{ mt: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {history.time}
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
          )}
        </Grid>
      ))}
      <Grid item ref={bottomRef} />
    </Grid>
  );
}

ChatHistory.propTypes = { theme: PropTypes.any, user: PropTypes.any };
