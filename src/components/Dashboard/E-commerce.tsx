"use client";
import dynamic from "next/dynamic";
import React from "react";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";
import EmptyBox from "../EmptyBox/page";

const ECommerce: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Balance" total="$382" rate="0.43%" levelUp>
          <img src="/images/icon/scales-100.png" width={22} height={22}></img>
        </CardDataStats>
        <CardDataStats title="Profit" total="$23" rate="4.35%" levelUp>
          <img src="/images/icon/profit-96.png" width={22} height={22}></img>
        </CardDataStats>
        <CardDataStats title="Total Bets" total="14" rate="2.2%" levelUp>
          <img src="/images/icon/bet.png" width={22} height={22}></img>
        </CardDataStats>
        <CardDataStats
          title="Total Bet Volume"
          total="2319"
          rate="0.95%"
          levelUp
        >
          <img src="/images/icon/bill-96.png" width={22} height={22}></img>
        </CardDataStats>
      </div>

      <div className="mt-4">
        <EmptyBox />
      </div>
    </>
  );
};

export default ECommerce;
