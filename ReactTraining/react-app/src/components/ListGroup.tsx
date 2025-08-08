import { MouseEvent, useState } from "react";

interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: Props) {
  //   let selectedIndex = 1;

  const [selectedIndex, setSelectedIndex] = useState(-1);

  //   if (items.length === 0)
  //     return (
  //       <>
  //         <h1>List Of Games</h1>
  //         <p>No Items Found Anjay</p>
  //       </>
  //     );

  //   const noItemsMessage = items.length === 0 ? <p>No Items Found !!!</p> : null;
  //   const noItemsMessageF = () => {
  //     return items.length === 0 ? <p>No Items Found !!!PPP</p> : null;
  //   };

  const handleClick = (event: MouseEvent) =>
    console.log(event.getModifierState);

  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 ? <p>No Items Found !!!PPP</p> : null}
      {items.length === 0 && <p>No Items Found !!!</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex == index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
              //   console.log(setSelectedIndex);
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
