import PropTypes from 'prop-types';
// material-ui
import { alpha, styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import SvgIcon from '@mui/material/SvgIcon';
import { TreeItem, SimpleTreeView, treeItemClasses } from '@mui/x-tree-view';

// third-party
import { useSpring, animated } from 'react-spring';

// project-imports
import MainCard from 'components/MainCard';

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon className="close" fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

function TransitionComponent({ ...others }) {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: 'translate3d(20px,0,0)'
    },
    to: {
      opacity: others.in ? 1 : 0,
      transform: `translate3d(${others.in ? 0 : 20}px,0,0)`
    }
  });

  return (
    <animated.div style={style}>
      <Collapse {...others} />
    </animated.div>
  );
}

const StyledTreeItem = styled((props) => <TreeItem {...props} slots={{ groupTransition: TransitionComponent }} />)(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3
    }
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`
  }
}));

StyledTreeItem.displayName = 'StyledTreeItem';

// ==============================|| TREE VIEW - CUSTOMIZED ||============================== //

export default function CustomizedTreeView() {
  const customTreeviewCodeString = `// CustomizedTreeView.tsx
<SimpleTreeView
  aria-label="customized"
  defaultExpandedItems={['1']}
  slots={{ collapseIcon: MinusSquare, expandIcon: PlusSquare, endIcon: CloseSquare }}
  sx={{ height: 320, flexGrow: 1, overflowY: 'auto' }}
>
  <StyledTreeItem itemId="1" label="Main">
    <StyledTreeItem itemId="2" label="Hello" />
    <StyledTreeItem itemId="3" label="Subtree with children">
      <StyledTreeItem itemId="6" label="Hello" />
      <StyledTreeItem itemId="7" label="Sub-subtree with children">
        <StyledTreeItem itemId="9" label="Child 1" />
        <StyledTreeItem itemId="10" label="Child 2" />
        <StyledTreeItem itemId="11" label="Child 3" />
      </StyledTreeItem>
      <StyledTreeItem itemId="8" label="Hello" />
    </StyledTreeItem>
    <StyledTreeItem itemId="4" label="World" />
    <StyledTreeItem itemId="5" label="Something something" />
  </StyledTreeItem>
</SimpleTreeView>`;

  return (
    <MainCard title="Customized" codeString={customTreeviewCodeString}>
      <SimpleTreeView
        aria-label="customized"
        defaultExpandedItems={['1']}
        slots={{ collapseIcon: MinusSquare, expandIcon: PlusSquare, endIcon: CloseSquare }}
        sx={{ height: 320, flexGrow: 1, overflowY: 'auto' }}
      >
        <StyledTreeItem itemId="1" label="Main">
          <StyledTreeItem itemId="2" label="Hello" />
          <StyledTreeItem itemId="3" label="Subtree with children">
            <StyledTreeItem itemId="6" label="Hello" />
            <StyledTreeItem itemId="7" label="Sub-subtree with children">
              <StyledTreeItem itemId="9" label="Child 1" />
              <StyledTreeItem itemId="10" label="Child 2" />
              <StyledTreeItem itemId="11" label="Child 3" />
            </StyledTreeItem>
            <StyledTreeItem itemId="8" label="Hello" />
          </StyledTreeItem>
          <StyledTreeItem itemId="4" label="World" />
          <StyledTreeItem itemId="5" label="Something something" />
        </StyledTreeItem>
      </SimpleTreeView>
    </MainCard>
  );
}

TransitionComponent.propTypes = { others: PropTypes.any };
