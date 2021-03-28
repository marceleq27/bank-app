import React, { useState } from "react";
import firebase from "firebase/app";
import { Button, Input, message } from "antd";

const Deposit = ({ user, accountData }) => {
  const [deposit, setDeposit] = useState(0);

  const transaction = () => {
    const path = `/${user.uid}/${Object.keys(accountData)[0]}/accountValue`;

    const firebaseRef = firebase.app().database().ref(path);

    return firebaseRef.transaction(
      (val) => {
        if (val >= 0) {
          return deposit + val;
        }
        return val;
      },
      (err) => {
        setDeposit(0);
        if (err === null) {
          message.success("Money sucesfully added");
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
          value={deposit}
          onChange={(e) => setDeposit(parseInt(e.target.value))}
          style={{ width: 152 }}
        />
        <Button type="ghost" onClick={transaction} style={{ marginLeft: 16 }}>
          Deposit
        </Button>
      </div>
    </div>
  );
};

export default Deposit;
