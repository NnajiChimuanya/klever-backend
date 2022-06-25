const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
const mongoose = require("mongoose");
const Betting = require("./model/BettingModel");

require("./kleverSDK/kleverSDKLoader");
const {
  Account,
  core,
  TransactionType,
  sendTransaction,
} = require("@klever/sdk");

if (core.isSDKLoaded()) {
  console.log(true);
} else {
  console.log(false);
}

//Making a bet

app.post("/user/bet", async (req, res) => {
  const address = req.body.address;
  const privateKey = req.body.privateKey;
  const amount = req.body.amount;

  try {
    const account = await new Account(address, privateKey);
  } catch (err) {
    console.log(err);
  }

  const transactionType = TransactionType.Transfer;

  try {
    const transactionPayload = {
      sender: account.address,
      privateKey: atob(account.privateKey),
      receiver: "Master Address",
      amount: amount,
    };
    await sendTransaction(transactionType, transactionPayload);
  } catch (err) {
    console.log(err);
  }

  res.status(200).send(`Successfully sent ${amount}`);
});

// Tournament pool
app.post("/user/tournament", async (req, res) => {
  const address = req.body.address;
  const privateKey = req.body.privateKey;
  const amount = req.body.amount;

  try {
    const account = await new Account(address, privateKey);
  } catch (err) {
    console.log(err);
  }

  const transactionType = TransactionType.Transfer;

  try {
    const transactionPayload = {
      sender: account.address,
      privateKey: atob(account.privateKey),
      receiver: "Tournament pool Address",
      amount: amount,
    };
    await sendTransaction(transactionType, transactionPayload);
  } catch (err) {
    console.log(err);
  }

  res.status(200).send(`Successfully sent ${amount} to the tournament pool`);
});

//crediting winner
app.post("/creditWinner", async(req, res) => {
  const address = req.body.address;

  const transactionType = TransactionType.Transfer;

  try {
    const transactionPayload = {
      sender: "Master Address",
      privateKey: atob(account.privateKey),
      receiver: "Winner's Address",
      amount: amount,
    };
    await sendTransaction(transactionType, transactionPayload);
  } catch (err) {
    console.log(err);
  }

  res.status(200).send(`Successfully sent ${amount} to winner ${receiver}`);
});

//Checking balance
app.post("/user/balance", (req, res) => {
  const address = req.body.address;
  const privateKey = req.body.privateKey;

  const account = await new Account(address, privateKey);

  res.send(await account.getBalance());
});

app.listen(port, () => console.log("Listening now"));
