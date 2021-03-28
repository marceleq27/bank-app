import React, { useState, useEffect, useCallback } from "react";
import firebase from "firebase/app";
import { Select, Input, Button, message, Spin } from "antd";

const { Option } = Select;

const Send = ({ user, accountValue, accountData }) => {
  const [account, setAccount] = useState("");
  const [money, setMoney] = useState(0);
  const [allAccounts, setAllAccounts] = useState([]);
  const [appData, setAppData] = useState(null);

  const getAccounts = useCallback(async () => {
    const path = "/";
    const firebaseRef = firebase.app().database().ref(path);
    const res = await firebaseRef.get();
    setAllAccounts(Object.keys(res.val()).filter((item) => item !== user.uid));
    setAppData(res.val());
  }, [user.uid]);

  useEffect(() => {
    getAccounts();
  }, [getAccounts]);

  const transaction = () => {
    let path;
    if (account === "") {
      const key = Object.keys(appData[allAccounts[0]])[0];
      path = `/${allAccounts[0]}/${key}/accountValue`;
    } else {
      const key = Object.keys(appData[account])[0];
      path = `/${account}/${key}/accountValue`;
    }

    const firebaseRef = firebase.app().database().ref(path);

    return firebaseRef.transaction(
      (val) => {
        if (val >= 0 && accountValue - money > 0) {
          return money + val;
        }
        return val;
      },
      (err) => {
        if (err === null) {
          message.success("Money sucesfully sended");
          deleteMoney();
        } else {
          message.error("Something went wrong!");
          setMoney(0);
        }
      }
    );
  };

  const deleteMoney = () => {
    const path = `/${user.uid}/${Object.keys(accountData)[0]}/accountValue`;

    const firebaseRef = firebase.app().database().ref(path);

    return firebaseRef.transaction(
      (val) => {
        return val - money;
      },

      (err) => {
        if (err === null) {
          setMoney(0);
        }
      }
    );
  };

  return (
    <div>
      <p>Select user:</p>
      {allAccounts.length > 0 ? (
        <Select defaultValue={allAccounts[0]} onChange={(val) => setAccount(val)}>
          {allAccounts.map((item) => (
            <Option value={item} key={item}>
              {item}
            </Option>
          ))}
        </Select>
      ) : (
        <Spin />
      )}
      <span style={{ marginLeft: 8, fontSize: 11 }}>
        Powiedzmy że to numer konta (tak naprawdę id użytkownika w bazie)
      </span>
      <p style={{ marginTop: 16 }}>How much do you want to send?</p>
      <Input
        type="number"
        min="0"
        placeholder="Value"
        value={money}
        onChange={(e) => setMoney(parseInt(e.target.value))}
        style={{ width: 152 }}
      />
      <Button type="primary" onClick={transaction} style={{ marginLeft: 16 }}>
        Send
      </Button>
    </div>
  );
};

export default Send;
