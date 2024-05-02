// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { Graph, Chart21, Map1 } from 'iconsax-react';

// type

// icons
const icons = {
  charts: Chart21,
  chart: Graph,
  map: Map1
};

// ==============================|| MENU ITEMS - CHARTS & MAPS ||============================== //

const chartsMap = {
  id: 'group-charts-map',
  title: <FormattedMessage id="charts-map" />,
  icon: icons.charts,
  type: 'group',
  children: [
    {
      id: 'react-chart',
      title: <FormattedMessage id="charts" />,
      type: 'collapse',
      icon: icons.chart,
      children: [
        {
          id: 'apexchart',
          title: <FormattedMessage id="apexchart" />,
          type: 'item',
          url: '/charts/apexchart'
        },
        {
          id: 'org-chart',
          title: <FormattedMessage id="org-chart" />,
          type: 'item',
          url: '/charts/org-chart'
        }
      ]
    },
    {
      id: 'map',
      title: <FormattedMessage id="map" />,
      type: 'item',
      url: '/map',
      icon: icons.map
    }
  ]
};

export default chartsMap;
