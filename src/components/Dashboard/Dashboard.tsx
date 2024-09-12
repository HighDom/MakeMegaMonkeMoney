"use client";
import dynamic from "next/dynamic";
import React from "react";
import Bet2 from "../Bet/Bet2";
import Introduction from "../Introduction/Introduction";

const ECommerce: React.FC = () => {
  return (
    <>
      <div className="mt-4">
        <Introduction />
      </div>
    </>
  );
};

export default ECommerce;
