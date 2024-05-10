import "./Category.css";
import Input from "../../Components/Shared/Input";

function Category({ handleChange }) {
  return (
    <div>
      <h2 className="sidebar-title">Category</h2>

      <div>
      <Input
          handleChange={handleChange}
          value="All"
          title="All"
          name="test"
        />

        <Input
          handleChange={handleChange}
          value="MGS"
          title="MGS"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="IODC"
          title="IODC"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Others"
          title="Others"
          name="test"
        />
      
      </div>
    </div>
  );
}

export default Category;