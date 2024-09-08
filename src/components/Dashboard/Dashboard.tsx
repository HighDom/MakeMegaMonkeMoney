"use client";
import dynamic from "next/dynamic";
import React from "react";
import CardDataStats from "../CardDataStats";
import EmptyBox from "../EmptyBox/page";
import Bet from "../Bet/Bet";
import Bet2 from "../Bet/Bet2";

const ECommerce: React.FC = () => {
  return (
    <>
      <div className="mt-4">
        <Bet2 />
      </div>
    </>
  );
};

export default ECommerce;
