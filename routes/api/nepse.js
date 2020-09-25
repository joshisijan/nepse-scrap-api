const express = require("express");
const puppeteer = require("puppeteer");
const $ = require("cheerio");
const request = require("request");

const router = express.Router();

// nepse api urls
const companiesUrl = "https://newweb.nepalstock.com/api/nots/company/list";
const marketStatusUrl =
  "https://newweb.nepalstock.com/api/nots/nepse-data/market-open";
const nepseIndexUrl = "https://newweb.nepalstock.com/api/nots/nepse-index";
const nepseTimeValueUrl = "https://newweb.nepalstock.com/api/nots/graph/index";
const marketSummaryUrl = "https://newweb.nepalstock.com/api/nots/market-summary";
const securityDetailUrl = "https://newweb.nepalstock.com/api/nots/security"

// function to make router
const makeRouter = (routeName, url) => {
  router.get(routeName, async (req, res) => {
    try {
      const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
      const page = await browser.newPage();
      if(req.params.id){
        await page.goto(`${url}/${req.params.id}`);
      }else{
        await page.goto(url);
      }
      const html = await page.content();
      res.json(JSON.parse($("pre", html).text()));
      await browser.close();
    } catch (err) {
      res.status(400).json({
        msg: err.message.toString(),
      });
    }
  });
};

// get market status
makeRouter("/status", marketStatusUrl);
//get nepse index
makeRouter("/nepse-index", nepseIndexUrl);
//get time and value of nepse
makeRouter("/nepse-chart/:id", nepseTimeValueUrl);
//get list of all companies
makeRouter("/companies", companiesUrl);
//get market summary
makeRouter("/market-summary", marketSummaryUrl);
//get security detail
makeRouter("/security/:id", securityDetailUrl);

module.exports = router;
