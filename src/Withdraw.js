import React, { useState } from "react";
import firebase from "firebase/app";
import { Input, message, Button } from "antd";

const Withdraw = ({ user, accountData }) => {
  const [withdraw, setWithdraw] = useState(0);

  const transaction = () => {
    const path = `/${user.uid}/${Object.keys(accountData)[0]}/accountValue`;

    const firebaseRef = firebase.app().database().ref(path);

    return firebaseRef.transaction(
      (val) => {
        if (val >= 0) {
          return val - withdraw;
        } else {
          message.error("You dont have enough money!");
          return val;
        }
      },
      (err) => {
        setWithdraw(0);
        if (err === null) {
          message.success("Money withdraw successfully");
        } else {
          message.error("Something went wrong!");
        }
      }
    );
  };

  return (
    <div>
      <div>
        <Input
          type="number"
          min="0"
          placeholder="Value to deposit"
          value={withdraw}
          onChange={(e) => setWithdraw(parseInt(e.target.value))}
          style={{ width: 152 }}
        />
        <Button type="ghost" onClick={transaction} style={{ marginLeft: 16 }}>
          Withdraw
        </Button>
      </div>
    </div>
  );
};

export default Withdraw;
