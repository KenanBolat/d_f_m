// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { OceanProtocol, Level, ShieldCross, InfoCircle, I24Support, Driving } from 'iconsax-react';

// type

// icons
const icons = {
  menuLevel: OceanProtocol,
  menuLevelSubtitle: Level,
  disabledMenu: ShieldCross,
  chipMenu: InfoCircle,
  documentation: I24Support,
  roadmap: Driving
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const support = {
  id: 'other',
  type: 'group',
  children: [
    {
      id: 'menu-level',
      title: <FormattedMessage id="menu-level" />,
      type: 'collapse',
      icon: icons.menuLevel,
      children: [
        {
          id: 'menu-level-1.1',
          title: (
            <>
              <FormattedMessage id="level" /> 1
            </>
          ),
          type: 'item',
          url: '#'
        },
        {
          id: 'menu-level-1.2',
          title: (
            <>
              <FormattedMessage id="level" /> 1
            </>
          ),
          type: 'collapse',
          children: [
            {
              id: 'menu-level-2.1',
              title: (
                <>
                  <FormattedMessage id="level" /> 2
                </>
              ),
              type: 'item',
              url: '#'
            },
            {
              id: 'menu-level-2.2',
              title: (
                <>
                  <FormattedMessage id="level" /> 2
                </>
              ),
              type: 'collapse',
              children: [
                {
                  id: 'menu-level-3.1',
                  title: (
                    <>
                      <FormattedMessage id="level" /> 3
                    </>
                  ),
                  type: 'item',
                  url: '#'
                },
                {
                  id: 'menu-level-3.2',
                  title: (
                    <>
                      <FormattedMessage id="level" /> 3
                    </>
                  ),
                  type: 'item',
                  url: '#'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'menu-level-subtitle',
      title: <FormattedMessage id="menu-level-subtitle" />,
      caption: <FormattedMessage id="menu-level-subtitle-caption" />,
      type: 'collapse',
      icon: icons.menuLevelSubtitle,
      children: [
        {
          id: 'sub-menu-level-1.1',
          title: (
            <>
              <FormattedMessage id="level" /> 1
            </>
          ),
          caption: <FormattedMessage id="menu-level-subtitle-item" />,
          type: 'item',
          url: '#'
        },
        {
          id: 'sub-menu-level-1.2',
          title: (
            <>
              <FormattedMessage id="level" /> 1
            </>
          ),
          caption: <FormattedMessage id="menu-level-subtitle-collapse" />,
          type: 'collapse',
          children: [
            {
              id: 'sub-menu-level-2.1',
              title: (
                <>
                  <FormattedMessage id="level" /> 2
                </>
              ),
              caption: <FormattedMessage id="menu-level-subtitle-sub-item" />,
              type: 'item',
              url: '#'
            }
          ]
        }
      ]
    },
    {
      id: 'disabled-menu',
      title: <FormattedMessage id="disabled-menu" />,
      type: 'item',
      url: '#',
      icon: icons.disabledMenu,
      disabled: true
    },
    {
      id: 'oval-chip-menu',
      title: <FormattedMessage id="oval-chip-menu" />,
      type: 'item',
      url: '#',
      icon: icons.chipMenu,
      chip: {
        label: 'Fire',
        color: 'error',
        variant: 'outlined',
        size: 'small'
      }
    },
    {
      id: 'documentation',
      title: <FormattedMessage id="documentation" />,
      type: 'item',
      url: 'https://phoenixcoded.gitbook.io/able-pro/v/react/',
      icon: icons.documentation,
      external: true,
      target: true,
      chip: {
        label: 'gitbook',
        color: 'info',
        size: 'small'
      }
    },
    {
      id: 'roadmap',
      title: <FormattedMessage id="roadmap" />,
      type: 'item',
      url: 'https://phoenixcoded.gitbook.io/able-pro/v/react/roadmap',
      icon: icons.roadmap,
      external: true,
      target: true
    }
  ]
};

export default support;
