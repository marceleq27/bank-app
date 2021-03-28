import React from "react";
import { Tabs } from "antd";
import Withdraw from "./Withdraw";
import Send from "./Send";
import Deposit from "./Deposit";
import { FirebaseDatabaseNode } from "@react-firebase/database";
import CreateBankAccount from "./CreateBankAccount";

const { TabPane } = Tabs;

const AccountView = ({ user }) => {
  return (
    <div style={{ marginTop: 24, marginLeft: 24 }}>
      <FirebaseDatabaseNode path={`/${user.uid}`}>
        {(d) => {
          const { value, isLoading } = d;
          return isLoading === null || isLoading === true ? (
            <div>Loading...</div>
          ) : value === null ? (
            <CreateBankAccount user={user} />
          ) : (
            <>
              <Tabs defaultActiveKey="1">
                <TabPane tab="Deposit" key="1">
                  <Deposit user={user} accountData={value} />
                </TabPane>
                <TabPane tab="Withdraw" key="2">
                  <Withdraw user={user} accountData={value} />
                </TabPane>
                <TabPane tab="Send money" key="3">
                  <Send user={user} accountData={value} accountValue={Object.values(value)[0].accountValue} />
                </TabPane>
              </Tabs>
              <div style={{ marginTop: 24 }}>Account value: {Object.values(value)[0].accountValue} </div>
            </>
          );
        }}
      </FirebaseDatabaseNode>
    </div>
  );
};

export default AccountView;
