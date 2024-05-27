// material-ui
import { TreeItem, SimpleTreeView } from '@mui/x-tree-view';

// project-imports
import MainCard from 'components/MainCard';

// assets
import { ArrowDown2, ArrowRight2 } from 'iconsax-react';

const data = {
  id: 'root',
  name: 'Parent',
  children: [
    {
      id: '1',
      name: 'Child - 1'
    },
    {
      id: '3',
      name: 'Child - 3',
      children: [
        {
          id: '4',
          name: 'Child - 4'
        }
      ]
    }
  ]
};

// ==============================|| TREE VIEW - RICH OBJECT ||============================== //

export default function RichObjectTreeView() {
  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} itemId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  const richTreeviewCodeString = `// RichObjectTreeView.tsx
<SimpleTreeView
  aria-label="rich object"
  slots={{ collapseIcon: ArrowDown2, expandIcon: ArrowRight2 }}
  defaultExpandedItems={['root']}
  sx={{ height: 180, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
>
  {renderTree(data)}
</SimpleTreeView>`;

  return (
    <MainCard title="Rich Object" codeString={richTreeviewCodeString}>
      <SimpleTreeView
        aria-label="rich object"
        slots={{ collapseIcon: ArrowDown2, expandIcon: ArrowRight2 }}
        defaultExpandedItems={['root']}
        sx={{ height: 180, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      >
        {renderTree(data)}
      </SimpleTreeView>
    </MainCard>
  );
}
