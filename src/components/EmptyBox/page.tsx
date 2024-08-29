"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import dynamic from "next/dynamic";
import React from "react";

const Chart: React.FC = () => {
  return (
    <div className="h-180 rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {"Create Bets"}
          </h4>
          <span className="text-sm font-medium">
            {"add any bets or games here"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Chart;
