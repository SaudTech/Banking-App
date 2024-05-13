"use client";

import React from "react";
import AnimatedCounter from "./AnimatedCounter";
import DoughnutChart  from "./DoughnutChart";

const TotalBalanceBox = ({
  accounts = [],
  totalBanks = 0,
  totalCurrentBalance = 0,
}: TotlaBalanceBoxProps) => {
  return (
    <section className="total-balance">
      <div className="total-balance-chart">
        <DoughnutChart accounts={accounts} />
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="header-2">
          {totalBanks} Bank Account{totalBanks > 1 && "s"}
        </h2>
        <div className="flex flex-col gap-2">
          <p className="total-balance-label">Total Current Balance</p>
          <AnimatedCounter amount={totalCurrentBalance} />
        </div>
      </div>
    </section>
  );
};

export default TotalBalanceBox;
