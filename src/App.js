import { useState, useEffect } from "react";
import merge from "lodash/merge";

const initialValues = {};
const initialFormData = {
  endpoint: "",
  verb: "GET",
  code: 200,
};

const useLog = (data) => {
  useEffect(() => console.log(data), [data]);
};

const MyInput = ({ id, name, type, label, ...props }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} name={name} {...props} />
    </div>
  );
};

const Table = ({ endpoints }) => {
  const Item = ({ endpoint, verb, code }) => {
    return (
      <tr>
        <td>{endpoint}</td>
        <td>{verb}</td>
        <td>{code}</td>
      </tr>
    );
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Endpoint</th>
          <th>Method</th>
          <th>Code</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
};

function App() {
  const [endpoints, setEndpoints] = useState(initialValues);
  const [formData, setFormData] = useState(initialFormData);
  useLog(endpoints);

  const addEndpoint = (objValue) => {
    const tempEndpoints = { ...endpoints };

    const data = merge(tempEndpoints, objValue);
    setEndpoints(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const endpointObj = {
      [formData.endpoint]: {
        [formData.verb]: {
          code: formData.code,
        },
      },
    };
    addEndpoint(endpointObj);
  };

  const handleFormChange = (e) => {
    const { name, value, type } = e.target;
    let finalValue = value;

    if (type === "number") finalValue = Number(value);

    setFormData({ ...formData, [name]: finalValue });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <MyInput
          name="endpoint"
          id="endpoint1"
          type="text"
          label="Endpoint name"
          value={formData.endpoint}
          onChange={handleFormChange}
        />
        <MyInput
          name="verb"
          id="verb1"
          type="text"
          label="verb"
          value={formData.verb}
          onChange={handleFormChange}
        />
        <MyInput
          name="code"
          id="code1"
          type="number"
          label="Code"
          value={formData.code}
          onChange={handleFormChange}
        />
        <button type="submit">Add to list</button>
      </form>
      <br></br>
      <Table endpoints={endpoints} />
    </div>
  );
}

export default App;
