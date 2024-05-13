"use client";
import React from "react";
import CountUp from "react-countup";

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return <div className="w-full total-balance-amount flex-center"><CountUp end={amount} prefix="INR " decimals={2} duration={2} /></div>;
};

export default AnimatedCounter;
