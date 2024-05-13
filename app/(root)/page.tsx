import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import React from "react";

const Dashboard = () => {
  const loggedIn = { firstName: "Saud", lastName: "Zubedi", email: "saaud266@gmail.com" };

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome back,"
            user={loggedIn?.firstName || "Guest"}
            subtext="Here's what's happening with your projects today."
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={2}
            totalCurrentBalance={35000.25}
          />
        </header>

        RECENT TRANSACTIONS
      </div>
      <RightSidebar user={loggedIn} transactions={[]} banks={[{currentBalance: 37000}, {currentBalance: 23000}]} />
    </section>
  );
};

export default Dashboard;
