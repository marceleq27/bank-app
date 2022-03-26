import React from "react";
import { FirebaseDatabaseMutation } from "@react-firebase/database";
import { Button } from "antd";

const CreateBankAccount = ({ user }) => {
  return (
    <FirebaseDatabaseMutation type="push" path={`/${user.uid}`}>
      {({ runMutation }) => {
        return (
          <div>
            <Button
              onClick={async () => {
                await runMutation({ accountValue: 0 });
              }}
            >
              Create bank account
            </Button>
          </div>
        );
      }}
    </FirebaseDatabaseMutation>
  );
};

export default CreateBankAccount;
