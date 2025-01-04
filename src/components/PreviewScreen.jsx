import React, { useState, useRef } from "react";
import "cropperjs/dist/cropper.css";
import { Cropper } from "react-cropper";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PreviewScreen({ image, setImage, uploadedImages, setUploadedImages }) {
  const [description, setDescription] = useState("");
  const [isCropping, setIsCropping] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isFlippedHorizontal, setIsFlippedHorizontal] = useState(false); 
  const [isFlippedVertical, setIsFlippedVertical] = useState(false); 
  const [rotation, setRotation] = useState(0);
  const cropperRef = useRef(null);
  const [croppedImage, setCroppedImage] = useState(image);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("PreviewScreen mounted");
    return () => console.log("PreviewScreen unmounted");
  }, []);

  const handleCropClick = () => {
    setIsCropping(true);
    setDropdownVisible(false);
  };

  const handleCropSave = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const croppedDataUrl = cropper.getCroppedCanvas().toDataURL();
      setCroppedImage(croppedDataUrl);
      setIsCropping(false);
    }
  };

  const handleCancelCrop = () => {
    setIsCropping(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleFlipHorizontal = () => {
    setIsFlippedHorizontal((prev) => !prev); 
    setDropdownVisible(false);
  };

  const handleFlipVertical = () => {
    setIsFlippedVertical((prev) => !prev); 
    setDropdownVisible(false);
  };

  const handleRotate = async () => {
    const img = new Image();
    img.src = croppedImage;
  
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (rotation % 180 === 0) {
        canvas.width = img.width;
        canvas.height = img.height;
      } else {
        canvas.width = img.height;
        canvas.height = img.width;
      }
  
      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate(((rotation + 90) % 360) * (Math.PI / 180));
      context.drawImage(
        img,
        -img.width / 2,
        -img.height / 2,
        img.width,
        img.height
      );
  
      const rotatedDataUrl = canvas.toDataURL();
      setCroppedImage(rotatedDataUrl); 
      setRotation((prev) => (prev + 90) % 360);
      setDropdownVisible(false); 
    };
  };
  

  const handleUpload = (newImage) => {
    setUploadedImages((prev) => [...prev, newImage]);
  };

  const handleUploadClick = () => {
    if (croppedImage) {
      handleUpload({ image: croppedImage, description });
    }
    setImage(null);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="image-section">
        {isCropping ? (
          <Cropper
            src={croppedImage}
            className={`cropper-container`}
            style={{
              transform: `
                scaleX(${isFlippedHorizontal ? -1 : 1}) 
                scaleY(${isFlippedVertical ? -1 : 1}) 
                rotate(${rotation}deg)
              `,
            }}
            aspectRatio={16 / 9}
            guides={true}
            ref={cropperRef}
          />
        ) : (
          <img
            src={croppedImage}
            alt="Uploaded"
            className="image"
            style={{
              transform: `
                scaleX(${isFlippedHorizontal ? -1 : 1}) 
                scaleY(${isFlippedVertical ? -1 : 1}) 
                rotate(${rotation}deg)
              `,
              transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        )}

        <div className="dropdown-container">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            ⋮
          </button>
          {dropdownVisible && (
            <div className="dropdown-menu">
              <button onClick={handleCropClick}>Crop</button>
              <button onClick={handleFlipHorizontal}>Flip Horizontally</button>
              <button onClick={handleFlipVertical}>Flip Vertically</button>
              <button onClick={handleRotate}>Rotate 90°</button>
            </div>
          )}
        </div>

        {isCropping && (
          <div className="crop-controls">
            <button className="crop-button cancel" onClick={handleCancelCrop}>
              Cancel
            </button>
            <button className="crop-button save" onClick={handleCropSave}>
              Save Crop
            </button>
          </div>
        )}
      </div>

      <div className="description-section">
        <input
          type="text"
          placeholder={"Asset 00" + (uploadedImages.length + 1)}
          onChange={(e) => setDescription(e.target.value)}
          readOnly
        />
        <textarea
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="tag-buttons">
          <button>Space</button>
          <button>Style</button>
          <button>Package</button>
          <button>Elements</button>
        </div>
        <button className="upload-button" onClick={handleUploadClick}>
          Upload Image
        </button>
      </div>
    </div>
  );
}

export default PreviewScreen;
