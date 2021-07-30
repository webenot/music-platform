import React, { FC, ReactElement } from 'react';
import { useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import AlbumIcon from '@material-ui/icons/Album';
import {
  AppBar,
  Box,
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
import { useRouter } from 'next/router';

type TProps = {
  children?: ReactElement;
}

export type TMenu = {
  text: string;
  url: string;
  icon: ReactElement;
}

const menuItems: TMenu[] = [
  {
    text: 'Home',
    url: '/',
    icon: (<HomeIcon />),
  },
  {
    text: 'Tracks',
    url: '/tracks',
    icon: (<AudiotrackIcon />),
  },
  {
    text: 'Albums',
    url: '/albums',
    icon: (<AlbumIcon />),
  },
];

const drawerWidth = 240;

export const Navbar: FC<TProps> = ({ children }: TProps): ReactElement => {
  const theme = useTheme();
  const [ open, setOpen ] = React.useState(false);

  const router = useRouter();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const drawerContent = (
    <>
      <div className="text-right">
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        {menuItems.map(({
          text,
          url,
          icon,
        }) => (
          <ListItem button key={url} onClick={() => router.push(url)}>
            <ListItemIcon>
              {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{
          transition: theme.transitions.create([ 'margin', 'width' ], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create([ 'margin', 'width' ], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Music Platform
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          {drawerContent}
        </Drawer>
      </Box>
      <main style={{
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        }),
      }}>
        {children}
      </main>
    </Box>
  );
};
