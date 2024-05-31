import express from "express";
// All Imports
import { dairyRegestration } from "./routes/regestration/dairyRegestration.js";
import { dairyLogin } from "./routes/login/dairyLogin.js";
import { dairyInfo } from "./routes/credentials/dairyInfo.js";
import { profileInfo } from "./routes/credentials/profileInfo.js";
import { farmerReg } from "./routes/regestration/farmerRegistration.js";
import { getNumberInfo } from "./routes/credentials/numberInfo.js";
import { FarmerProfile } from "./routes/credentials/farmerProfile.js";
import { newMilkEntry } from "./routes/Famer/milkEntry.js";
import { dateInfo } from "./routes/credentials/farmerCalander.js";
import { dairyDateInfo } from "./routes/Famer/dairyDateInfo.js";
import { dairyFarmerTransaction } from "./routes/dairyTransaction/dairyTransaction.js";
import { farmerTransactionHistory } from "./routes/transactionFarmer/transactionHistory.js";
import * as dotenv from 'dotenv'
dotenv.config()
// const express = require('express');
const app = express();

app.use(express.static("public"));
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("listning at port 3000........");
});

// api
// Regestration Api's
app.post("/api/registration/dairy", dairyRegestration);

app.post("/api/login/dairy", dairyLogin);

// diary Credential
app.post("/api/credentials/dairyId", dairyInfo);
app.post("/api/dairyProfile/dairyId", profileInfo);
app.post("/api/numberInfo", getNumberInfo);
app.post("/api/farmerProfile/dairyId/farmerId", FarmerProfile);

//Farmer Registration

app.post("/api/user/reg", farmerReg);

//New Entry

app.post("/api/farmers/newEntry", newMilkEntry);

//farmer calendar
app.post("/api/getFarmerInfo/date", dateInfo);

//Dairy Date info
app.post("/api/getDairyInfo/date", dairyDateInfo);

//dairy transaction
app.post("/api/getFarmers/transaction", dairyFarmerTransaction);

//dairy transaction farmer
app.post("/api/transaction/transactionFarmer", farmerTransactionHistory);
