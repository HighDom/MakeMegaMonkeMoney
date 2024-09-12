"use client";

import Dashboard from "@/components/Dashboard/Dashboard";
import Introduction from "@/components/Introduction/Introduction";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Dashboard />
      </DefaultLayout>
    </>
  );
}
