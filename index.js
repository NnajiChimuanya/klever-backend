const express = require("express")
const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
const mongoose = require("mongoose")
const Betting = require("./model/BettingModel")

require("./kleverSDK/kleverSDKLoader");
const { Account, core } =  require("@klever/sdk");


//Debugging to make sure the sdk is loaded
if(core.isSDKLoaded()) {
    console.log(true)
} else {
    console.log(false)
}

//creating new account
app.post("/signup", async(req, res) => {
    let add = req.body.address
    let priv = req.body.privateKey
    let userName = req.body.userName
  

    //new account with sdk
    const account = new Account(add, priv);

    let address = account.getAddress()
    let privateKey = account.getPrivateKey()
    let Balance = account.getBalance()
    


    
    
    //saving to db
    let newUser = new Betting({
        address : address,
        privateKey : privateKey,
        Balance : Balance
    })

    newUser.save((err) => {
        if (err) throw err
        res.send(`saved user : ${address} to the database`)
    })

})


//Making a bet
app.post("/bet/:userAddress/:amount", (req, res) => {
    let userAddress = req.params.userAddress
    let amountToBet = req.params.amount

    Betting.findOne({address : userAddress}, (err, data) => {
        if(err) throw err
        if(!data){
            res.send(`user with Address : ${userAddress} is not registered`)
        }  else {
            let address = data.address
            let privateKey = data.privateKey
           
            const account = new Account(address, privateKey)
            const transactionPayload = {
                receiver : "Recieve Wallet",
                amount : amountToBet
            }
            account.sendTransfer(transactionPayload).then((tx) => console.log(tx))
            res.send(transactionPayload)

            
        }
    })
})



try {
    mongoose.connect("mongodb://127.0.0.1:27017/KleverDb")
    console.log("Connected to database")
} catch (error) {
    if(error) throw error
}



//Inputing desied amount to bet
// app.post("/bet/:Address/:Amount", (req, res) => {
//     let Address= req.params.Address
//     let Amount = req.params.Amount

//     Betting.findOneAndUpdate({Address}, {Amount}, (err) => {
//         if(err) throw err
//         res.status(200).send(`User : ${Address} has a betting amount ${Amount}`)
//     })
// })

// //feature that sendamount to the winning player
// app.post("/creditWinner/:Address/:Amount", async (req, res) => {
//     let Address= req.params.Address
//     let credit = req.params.Amount


//     await Betting.findOneAndUpdate({Address}, {
//         $inc : { Amount : credit}
//     }, (err) => {
//         if(err) throw err
//         res.status(200).send(`${Address} has been credited with ${credit}`)
//     })

//     // const transactionType = TransactionType.Transfer;
//     // const transactionPayload = {
//     // sender: "MyWallet",
//     // privateKey: "privateKey",
//     // receiver: Address,
//     // amount: Amount,
//     // };

//     // sendTransaction(transactionType, transactionPayload);

//     // console.log(transact, transactionPayload)
// })



app.listen(port, () => console.log("Listening now"))