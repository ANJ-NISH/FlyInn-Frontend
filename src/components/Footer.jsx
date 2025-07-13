import React from 'react'

import { Link } from 'react-router-dom';

import { FaRegCopyright } from "react-icons/fa";

export const Footer = () => {
  return (
    <>
    <div className="w-full bg-gray-100 flex flex-col gap-4 pb-4">
      {/* Footer Sections */}
      <div className="w-full flex flex-wrap lg:flex-row flex-col justify-evenly gap-6 lg:gap-1 mb-0 px-4 lg:px-0">
        {/* Support Section */}
        <div className="flex flex-col justify-start gap-2 mt-8">
          <span className="font-semibold">Support</span>
          <span>Coronavirus (COVID-19) FAQs</span>
          <span>Manage your trips</span>
          <span>Contact Customer Service</span>
          <span>Safety Resource Center</span>
        </div>

        {/* Discover Section */}
        <div className="flex flex-col justify-start gap-2 mt-8">
          <span className="font-semibold">Discover</span>
          <span>Genius loyalty program</span>
          <span>Seasonal and holiday deals</span>
          <span>Travel articles</span>
          <span>FlyInn.com for Business</span>
          <span>Traveller Review Awards</span>
          <span>Car rental</span>
          <span>Flight finder</span>
          <span>Restaurant reservations</span>
          <span>FlyInn.com for Travel Agents</span>
        </div>

        {/* Terms and Settings */}
        <div className="flex flex-col justify-start gap-2 mt-8">
          <span className="font-semibold">Terms and settings</span>
          <span>Privacy & cookies</span>
          <span>Terms & conditions</span>
          <span>Grievance officer</span>
          <span>Modern Slavery Statement</span>
          <span>Human Rights Statement</span>
        </div>

        {/* Partners */}
        <div className="flex flex-col justify-start gap-2 mt-8">
          <span className="font-semibold">Partners</span>
          <span>Extranet login</span>
          <span>Partner help</span>
          <span>List your property</span>
          <span>Become an affiliate</span>
        </div>

        {/* About */}
        <div className="flex flex-col justify-start gap-2 mt-8">
          <span className="font-semibold">About</span>
          <Link to="/about">
          <span className='cursor-pointer'>About FlyInn.com</span>
          </Link>
          <span>How We Work</span>
          <span>Sustainability</span>
          <span>Press center</span>
          <span>Careers</span>
          <span>Investor relations</span>
          <span>Corporate contact</span>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="flex flex-col sm:flex-row justify-center items-center text-center mt-4 font-medium">
        <FaRegCopyright className="mr-2" />
        <p className="w-full sm:w-96">Copyright FlyInn.com. All rights reserved.</p>
      </div>
    </div>
    </>
  )
}
