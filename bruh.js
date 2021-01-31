const puppeteer = require("puppeteer");
const fs = require('fs');
const path = require('path');
const prompt = require('prompt');
function lolol(){
    try{
        const content = fs.readFileSync("./config.json");
        const config = JSON.parse(content);
        global.email=config.email;
        global.pass=config.pass;
        global.mytoken = config.token
        try{
            login();
        } catch(e) {console.log(e)}
        return 

    }catch(e){
        console.log('No config found! Creating config... ')
        console.log('Copy your token and right click to paste...')
        prompt.start();
        prompt.get(['token'], function (err, result) {
            if (err) { return onErr(err); }
            let info = {
                    "email": "",
                    "pass": "",
                    "token": result.token
                }
                fs.writeFileSync(path.resolve('./', 'config.json'), JSON.stringify(info)); //pkg path
                console.log('You can also put in the username and password in config')
                lolol();
            });
        }
    }


function login(){
    let page = null;
    let browser = null;
    let x = '';
    console.log('Press 1 for token login, 2 for email and pass login')
    prompt.start();
    prompt.get(['choice'], function (err, result) {
        x = result.choice
      switch(x){
          case '1':{
            browser = puppeteer.launch({
                headless: false
             })
            .then( async (browser) => {
                page = await browser.newPage();
                page.setViewport({
                    width: 1280,
                    height: 800,
                    isMobile: false,
                  });
                await page.goto("https://discord.com/login", {
                    waitUntil: "networkidle2"
                });
                await page.evaluate((mytoken)=>{
                    console.log(mytoken)
                    function nigga(lmao) {
                        setInterval(() => {
                          document.body.appendChild(document.createElement `iframe`).contentWindow.localStorage.token = `"${lmao}"`
                        }, 50);
                        setTimeout(() => {
                          location.reload();
                        }, 2500);
                      }
                      nigga(mytoken);
                }, mytoken);
            })
            .catch((error) => {
                console.log(error)
            })
            break;
          }
          case '2':{
            browser = puppeteer.launch({
                headless: false
             })
            .then( async (browser) => {
                page = await browser.newPage();
                page.setViewport({
                    width: 1280,
                    height: 800,
                    isMobile: false,
                  });
                await page.goto("https://discord.com/login", {
                    waitUntil: "networkidle2"
                });
                await page.waitFor('input[name="email"]');
                await page.waitFor(2000);
                await page.type('input[name="email"]', email, {
                    delay: 5,
                });


                await page.waitFor('input[name="password"]');
                await page.type('input[name="password"]', pass, {
                    delay: 5,
                });
                await page.evaluate(() => {
                    document.querySelector('button[type=submit]').click();
                });
            })
            .catch((error) => {
                console.log(error)
            })
            break;
          }
      }
    })
}
lolol();