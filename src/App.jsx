import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MasonryImageList from "./components/MasonryImageList";
import PreviewScreen from "./components/PreviewScreen";
import Home from "./components/Home";
import UploadScreen from "./components/UploadScreen";
import SearchAssets from "./components/SearchAssets";
import { data } from "./assets/sampleData";

function App() {
  const [uploadedImages, setUploadedImages] = useState(data);
  const [image, setImage] = useState(null);

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/home"
            element={
              <Home
                uploadedImages={uploadedImages}
                setUploadedImages={setUploadedImages}
                image={image}
                setImage={setImage}
              />
            }
          />
          <Route
            path="/"
            element={<MasonryImageList uploadedImages={uploadedImages} setUploadedImages={setUploadedImages} setImage={setImage} />}
          />
          <Route
            path="/preview-screen"
            element={<PreviewScreen image={image} setImage={setImage} uploadedImages={uploadedImages} setUploadedImages={setUploadedImages}/>}
          />
          <Route
            path="/uploadScreen"
            element={<UploadScreen setImage={setImage} />}
          />
          <Route
            path="/earchAssets"
            element={<SearchAssets/>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
