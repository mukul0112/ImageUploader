import React from 'react';
import PreviewScreen from './PreviewScreen';
import UploadScreen from './UploadScreen';
import { useState } from 'react';

const Home = ({uploadedImages, setUploadedImages,image,setImage}) => {
    return (
      <div>
        {image ? (
          <PreviewScreen image={image} setImage={setImage} uploadedImages={uploadedImages} setUploadedImages={setUploadedImages} />
        ) : (
          <UploadScreen setImage={setImage} />
        )}
      </div>
    );
  }

export default Home
