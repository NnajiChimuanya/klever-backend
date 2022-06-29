# Installation and Configuration :

`npm install`

### To start project :

` npm start`

# End points

#

## Making a bet :

### POST: `/users/bet`

Requires the users Address, private amount and how much they want to bet in the request body.
This maps the user,s profile to their wallet, and this uses the `Transfer` call from the SDK to initiate transactions between wallets.

```
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
```

#

#

## Funding a tournament pool

### POST: `/user/tournament`

Requires the users Address, private amount and how much they want to bet in the request body. This also makes use of the `Transfer` to make transactions.

```
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
```

#

#

## Crediting a winner

### POST: `/creditWinner`

Requires the winner's Address in request body. The developer is the ADMIN who credits the winner of the bet.

```
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
```

#

#

## Covert XP to points

### Post: `/xpToToken`

Requires the user's points to be converted and the address of the users.
Users can burn experience points(XP) to mint tokens which would be sent to their address by the developer.

```
//function that converts XP to tokens
const xpToToken = (point) => {
  let token;

  token = point / 1000

  return token;
}

//Converting XP to token
app.post("/xpToToken", async(req, res) => {
  const address = req.body.address;
  const points = req.body.points


  let token = xpToToken(points)

  const transactionType = TransactionType.Transfer;

  try {
    const transactionPayload = {
      sender: "Master Address",
      privateKey: atob(account.privateKey),
      receiver: "Winner's Address",
      amount: token,
    };
    await sendTransaction(transactionType, transactionPayload);
  } catch (err) {
    console.log(err);
  }

  res.status(200).send(`Successfully sent ${amount} to ${receiver}`);
});
```

#

#

## Checking Balance

### POST: `/user/balance`

Requires the user's address and private key

```
app.post("/user/balance", (req, res) => {
  const address = req.body.address;
  const privateKey = req.body.privateKey;

  const account = await new Account(address, privateKey);

  res.send(await account.getBalance());
});
```
