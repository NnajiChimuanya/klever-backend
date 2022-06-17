const express = require("express")
const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
const mongoose = require("mongoose")
const Betting = require("./model/BettingModel")

require("./kleverSDK/kleverSDKLoader");
const { Account, core, TransactionType, sendTransaction } =  require("@klever/sdk");

if(core.isSDKLoaded()) {
    console.log(true)
} else {
    console.log(false)
}


//Making a bet

app.post("/user/bet", (req, res) => {
    const address = req.body.address
    const privateKey = req.body.privateKey
    const amount = req.body.amount

    try {
        const account = new Account(address, privateKey)
    } catch (err) {
        console.log(err)
    }

    const transactionType = TransactionType.Transfer;
    
   try {
        const transactionPayload = {
            sender: account.address,
            privateKey: atob(account.privateKey),
            receiver: "Master Address",
            amount: amount,
        };
        sendTransaction(transactionType, transactionPayload);
   } catch (err) {
       console.log(err)
   }

    res.status(200).send(`Successfully sent ${amount}`)
})


//Checking balance
app.post("/user/balance", (req, res) => {
    const address = req.body.address
    const privateKey = req.body.privateKey

    const account = new Account(address, privateKey)

    res.send(account.getBalance())
})





// const transactionType = TransactionType.Transfer;




app.listen(port, () => console.log("Listening now"))