import { Container, Modal, Stepper } from '@mantine/core';
import React, { useState } from 'react'
import AddLocation from "../AddLocation/AddLocation.jsx";
import { useAuth0 } from "@auth0/auth0-react"
import UploadImage from '../UploadImage/UploadImage.jsx';
import BasicDetails from '../BasicDetails/BasicDetails.jsx';
import Facilities from '../Facilities/Facilities.jsx';

const AddPropertyModal = ({ opened, setOpened }) => {
  const [active, setActive] = useState(0);
  const { user } = useAuth0();
  const [propertyDetails, setPropertyDetails] = useState({
    title: "",
    description: "",
    price: 0,
    country: "",
    address: "",
    image: "",
    facilities: {
      bedrooms: 0,
      parkings: 0,
      bathrooms: 0,
    },
    userEmail: user?.email,
  });
  const nextStep = () => {
    setActive((current) => (current < 4 ? current + 1: current));
  }
  const prevStep = () => {
    setActive((current) => (current > 0 ? current -1 : current));
  }
  return (
    <Modal 
    opened={opened}
    onClose={() => setOpened(false)}
    size={"90rem"}
    >
      <Container h={"40rem"} w={"100%"}>
        <Stepper active={active} onStepClick={setActive} breakpoint="sm" allowNextStepsSelect={false} >
          <Stepper.Step label="Location" description="Address">
            <AddLocation nextStep={nextStep} propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails} />
          </Stepper.Step>
          <Stepper.Step label="Images" description="Upload">
            <UploadImage nextStep={nextStep} prevStep={prevStep} propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails} />
          </Stepper.Step>
          <Stepper.Step label="Basics" description="Details">
            <BasicDetails nextStep={nextStep} prevStep={prevStep} propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails} />
          </Stepper.Step>
          <Stepper.Step label="Basics" description="Details">
            <Facilities prevStep={prevStep} propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails} />
          </Stepper.Step>
        </Stepper>
      </Container>
    </Modal>
  )
}

export default AddPropertyModal;