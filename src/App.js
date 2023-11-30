import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import QRCodeDecoder from "./components/QrCode";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QRCodeDecoder />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
