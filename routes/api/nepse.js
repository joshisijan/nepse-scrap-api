const express = require("express");
const puppeteer = require("puppeteer");
const $ = require("cheerio");
const request = require("request");

const router = express.Router();

// nepse api urls
const companiesUrl = "https://newweb.nepalstock.com/api/nots/company/list";
const marketStatusUrl = "https://newweb.nepalstock.com/api/nots/nepse-data/market-open";

//get list of all companies
router.get("/companies", async (req, res) => {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(companiesUrl);
    const html = await page.content();
    res.json(JSON.parse($("pre", html).text()));
    await browser.close();
  }catch(err){
    res.status(400).json({
      msg: err.message.toString()
    });
  }
});

//get market status

router.get("/status", async (req, res) => {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(marketStatusUrl);
    const html = await page.content();
    res.json(JSON.parse($("pre", html).text()));
    await browser.close();
  }catch(err){
    res.status(400).json({
      msg: err.message.toString()
    });
  }
});

module.exports = router;
