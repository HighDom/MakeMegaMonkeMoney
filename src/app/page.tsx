import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Web3AuthProvider from "@/context/web3AuthContext";

import { useEffect, useState } from "react";

export default function Home() {
  return (
    <>
      <Web3AuthProvider>
        <DefaultLayout>
          <ECommerce />
        </DefaultLayout>
      </Web3AuthProvider>
    </>
  );
}
