"use client";
import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";
import Logo from "./Logo";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";

//NOTE: this componet accepts an object based on the advanced property details call
const HouseCard = ({propertyDetails}) => {
  const address = propertyDetails.address;
  const streetAddress = propertyDetails.streetAddress;
  const city = address.city;  
  const state = address.state;
  const price = propertyDetails.price;
  const imgUrl = address.hiResImageLink;
  return (
    <div>
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">{propertyDetails.bedrooms}</p>
          <small className="text-default-500">{price}</small>
          <h4 className="font-bold text-large">{streetAddress}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={imgUrl}
          
          />
        </CardBody>
      </Card>
    </div>
  );
};
