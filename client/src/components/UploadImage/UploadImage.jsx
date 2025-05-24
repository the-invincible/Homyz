import React, { useEffect, useRef, useState } from 'react'
import "./UploadImage.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Button, Group } from '@mantine/core';

const UploadImage = ({propertyDetails, setPropertyDetails, nextStep, prevStep}) => {
  const [imageUrl, setImageURL] = useState(propertyDetails.image);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
        cloudName: "dpqpp8j7j",
        uploadPreset: "Real Estate",
        maxFiles: 1,
    },
    (err, result) => {
        if(result.event === "success") {
            setImageURL(result.info.secure_url);
        }
    }
   )
  }, []);

  const handleNext = () => {
    setPropertyDetails((prev) => ({ ...prev, image: imageUrl }));
    nextStep();
  }

  return (
    <div className='flexColCenter uploadWrapper'>
        {
            !imageUrl ? (
                <div className="flexColCenter uploadZone" 
                onClick={() => widgetRef.current?.open()}
                >
                    <AiOutlineCloudUpload size={50} color="gray" />
                    <span>Upload Image</span>
                </div>
            ) : (
                <div className="uploadedImage" 
                  onClick={() => widgetRef.current?.open()}
                >
                    <img src={imageUrl} alt="" />
                </div>
        )}
        <Group position='center' mt={"xl"}>
            <Button variant='default' onClick={prevStep}>Back</Button>
            <Button onClick={handleNext} disabled={!imageUrl}>Next</Button>
        </Group>
    </div>
  )
}

export default UploadImage;