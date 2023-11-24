// -----------------------------------------------------------------
import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Button from "./components/Button";
import { useState } from "react";
// -----------------------------------------------------------------

let items = ["New York", "San Fransico", "Tokyo", "London", "Paris"];
const handleSelectItem = (item: string, index: number) => {
  console.log(item, index);
};

// -----------------------------------------------------------------

function App() {
  const [alertVisible, setAlertVisibility] = useState(false);

  // return <div><Message></Message></div>
  return (
    <div>
      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      ></ListGroup>
      {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}> On Demand </Alert>
      )}
      <Alert onClose={() => setAlertVisibility(false)}>
        My <span>Alert</span>
      </Alert>
      <Button
        onClick={() => {
          console.log("Clicked!!!");
          setAlertVisibility(true);
        }}
      >
        My Button
      </Button>
    </div>
  );
}

export default App;
