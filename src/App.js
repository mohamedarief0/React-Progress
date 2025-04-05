import { Route, Routes } from "react-router-dom";
import Form from "./form/Form";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Form />} />
      </Routes>
    </>
  );
}
