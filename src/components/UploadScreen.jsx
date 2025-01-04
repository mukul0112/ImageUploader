import React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

function UploadScreen({ setImage }) {
  console.log("setImage in UploadScreen:", setImage);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "150px",
      }}
    >
      <img
        src="https://store-images.s-microsoft.com/image/apps.25787.14322616367897486.52e6c8c5-c944-4cb1-92d5-80e46a9d3899.48bed1f9-8c50-4e2e-b577-6060b6caf85c?q=90&w=256&h=256&mode=crop&format=jpg&background=#FFFFFF"
        alt="Upload Placeholder"
        style={{
          width: "200px",
          height: "auto",
          marginBottom: "10px", 
        }}
      />

      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />

      <label htmlFor="imageUpload" style={{ cursor: "pointer" }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component="span"
        >
          Add
        </Button>
      </label>
    </div>
  );
}

export default UploadScreen;
