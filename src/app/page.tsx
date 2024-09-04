"use client";

import Dashboard from "@/components/Dashboard/Dashboard";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Web3AuthProvider from "@/context/web3AuthContext";

import { useEffect, useState } from "react";
import DepositMoney from "@/components/DepositMoney/DepositMoney";

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Dashboard />
      </DefaultLayout>
    </>
  );
}
