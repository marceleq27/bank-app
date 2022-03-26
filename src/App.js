import * as React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd,
} from "@react-firebase/auth";
import { FirebaseDatabaseProvider } from "@react-firebase/database";
import { config } from "./config";
import AccountView from "./AccountView";
import { Button, Layout } from "antd";
import { Helmet } from "react-helmet";

const App = () => {
  return (
    <FirebaseDatabaseProvider {...config} firebase={firebase}>
      <FirebaseAuthProvider {...config} firebase={firebase}>
        <Layout style={{ padding: 16, height: "100vh" }}>
          <Helmet>
            <title>Bank App</title>
          </Helmet>
          <Layout.Content>
            <Button
              type="primary"
              onClick={() => {
                const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(googleAuthProvider);
              }}
              style={{ marginRight: 16 }}
            >
              Sign In with Google
            </Button>
            <Button
              type="danger"
              onClick={() => {
                firebase.auth().signOut();
              }}
              style={{ marginLeft: 16 }}
            >
              Sign Out
            </Button>
            <div style={{ display: "inline" }}>
              <IfFirebaseAuthed>
                {(authState) => {
                  return (
                    <div style={{ display: "inline", marginLeft: 16 }}>
                      You are authenticated as <strong>{authState.user.email}</strong>
                    </div>
                  );
                }}
              </IfFirebaseAuthed>
              <IfFirebaseAuthedAnd filter={({ providerId }) => providerId !== "anonymous"}>
                {({ providerId }) => {
                  return (
                    <div style={{ display: "inline", marginLeft: 6 }}>
                      with <strong>{providerId}</strong>
                    </div>
                  );
                }}
              </IfFirebaseAuthedAnd>
            </div>
            <FirebaseAuthConsumer>
              {({ isSignedIn, user, providerId }) => {
                return isSignedIn ? (
                  <AccountView isSignedIn={isSignedIn} providerId={providerId} user={user.providerData[0]} />
                ) : (
                  <div style={{ marginTop: 16 }}>Sign in to bank app</div>
                );
              }}
            </FirebaseAuthConsumer>
          </Layout.Content>
        </Layout>
      </FirebaseAuthProvider>
    </FirebaseDatabaseProvider>
  );
};

export default App;
