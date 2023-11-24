// {items: [], heading: []}
//Interface in React

interface ListGroupProps {
  items: string[];
  heading: string;
  onSelectItem: (item: string, index: number) => void;
}

import { Fragment, useState } from "react";
// import { MouseEvent } from "react";
function ListGroup({ items, heading, onSelectItem }: ListGroupProps) {
  const message = items.length === 0 ? <p>No Item found</p> : null;
  const getMesage = () => {
    return items.length === 0 && <p>No Item found not nernary</p>;
  };

  //Hook: state hook
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>{heading}</h1>
      {getMesage()}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item, index);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
