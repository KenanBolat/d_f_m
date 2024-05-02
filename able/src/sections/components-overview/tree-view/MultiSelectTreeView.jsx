// material-ui
import { TreeItem, SimpleTreeView } from '@mui/x-tree-view';

// project-imports
import MainCard from 'components/MainCard';

// assets
import { ArrowDown2, ArrowRight2 } from 'iconsax-react';

// ==============================|| TREE VIEW - MULTI SELECT ||============================== //

export default function MultiSelectTreeView() {
  const multiTreeviewCodeString = `<TreeView
  aria-label="multi-select"
  slots={{ collapseIcon: ArrowDown2, expandIcon: ArrowRight2 }}
  multiSelect
  defaultExpandedItems={['1']}
  sx={{ height: 216, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
>
  <TreeItem itemId="1" label="Applications">
    <TreeItem itemId="2" label="Calendar" />
    <TreeItem itemId="3" label="Chrome" />
    <TreeItem itemId="4" label="Webstorm" />
  </TreeItem>
  <TreeItem itemId="5" label="Documents">
    <TreeItem itemId="6" label="MUI">
      <TreeItem itemId="7" label="src">
        <TreeItem itemId="8" label="index.js" />
        <TreeItem itemId="9" label="tree-view.js" />
      </TreeItem>
    </TreeItem>
  </TreeItem>
</TreeView>`;

  return (
    <MainCard title="Multi-Select" codeString={multiTreeviewCodeString}>
      <SimpleTreeView
        aria-label="multi-select"
        slots={{ collapseIcon: ArrowDown2, expandIcon: ArrowRight2 }}
        multiSelect
        defaultExpandedItems={['1']}
        sx={{ height: 216, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      >
        <TreeItem itemId="1" label="Applications">
          <TreeItem itemId="2" label="Calendar" />
          <TreeItem itemId="3" label="Chrome" />
          <TreeItem itemId="4" label="Webstorm" />
        </TreeItem>
        <TreeItem itemId="5" label="Documents">
          <TreeItem itemId="6" label="MUI">
            <TreeItem itemId="7" label="src">
              <TreeItem itemId="8" label="index.js" />
              <TreeItem itemId="9" label="tree-view.js" />
            </TreeItem>
          </TreeItem>
        </TreeItem>
      </SimpleTreeView>
    </MainCard>
  );
}
