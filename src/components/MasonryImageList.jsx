import * as React from 'react';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import SearchAssets from './SearchAssets';
import { useState,useEffect } from 'react';

export default function ImageMasonry({uploadedImages}) {
    const [displayData, setDisplayData]= useState([]);
    console.log(uploadedImages)
    useEffect(()=>{
        setDisplayData([...uploadedImages].reverse())
    },[])
  return (
    <div>
    <SearchAssets setDisplayData={setDisplayData} displayData={displayData} uploadedImages={uploadedImages}/>
    <Box sx={{ width: '95vw', padding: 2 }}>
      <Masonry columns={4} spacing={2}>
        {displayData.map((item, index) => (
          <div key={index}>
            <img
  src={item?.image?.startsWith("data:image/") ? item.image : item.image} // Handle both Base64 and URL
  alt={item.title || "Image"} // Fallback for missing title
  loading="lazy"
  style={{
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    display: 'block',
    width: '100%',
  }}
/>
          </div>
        ))}
      </Masonry>
    </Box>
    </div>
  );
}
