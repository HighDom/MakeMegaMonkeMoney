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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Balance" total="$382" rate="0.43%" levelUp>
          <img src="/images/icon/scales-100.png" width={22} height={22}></img>
        </CardDataStats>
        <CardDataStats title="Profit" total="$23" rate="4.35%" levelUp>
          <img src="/images/icon/profit-96.png" width={22} height={22}></img>
        </CardDataStats>
        <CardDataStats title="Bets" total="14" rate="2.2%" levelUp>
          <img src="/images/icon/bet.png" width={22} height={22}></img>
        </CardDataStats>
        <CardDataStats title="Volume" total="2319" rate="0.9%" levelUp>
          <img src="/images/icon/bill-96.png" width={22} height={22}></img>
        </CardDataStats>
      </div>

      <div className="mt-4">
        <Bet2 />
      </div>
    </>
  );
};

export default ECommerce;
