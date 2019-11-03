import puppeteer from 'puppeteer';
import faker from 'faker';

let browser;
let page;

const userData = {
  email: faker.internet.email(),
  password: faker.internet.password()
}

const responses = {
  "failure": {
    errors: { email: ['Wrong email or password'] }
  },
  "success": {
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9",
    "expire": "2019-03-13T11:16:05.126+00:00",
    "user": {
      "id": 5,
      "email": "aaa@bbb3.cc",
      "password_digest": "$2a$10$Y0jiiw6kaBmxjfItKFwpbuDjdssEmCWv7iUxQzEDwBjh3cbcVpm7q"
    }
  }
}

beforeAll(async () => {
  browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  page = await browser.newPage();
  page.on('console', msg => console.log(`Page Console: ${msg.text()}`));
  await page.goto('http://localhost:3000/');
});

describe('sign in page', async () => {
  it('should render sign in form', async () => {
    await page.waitForSelector('form[class^="Auth"] > button');
    let buttonHandle = await page.$('form[class^="Auth"] > button');
    expect(await buttonHandle.evaluate(b => b.textContent)).toBe('Sign In');
    expect(await buttonHandle.evaluate(b => b.disabled)).toBe(true);
  });

  it('should change between sign in and sign up when clicked', async () => {
    await page.click('a[class*="Auth_Link_"]');
    await page.waitFor(250);
    let buttonHandle = await page.$('form[class^="Auth"] > button');
    expect(await buttonHandle.evaluate(b => b.textContent)).toBe('Sign Up');
    
    await page.click('a[class*="Auth_Link_"]');
    await page.waitFor(250);
    buttonHandle = await page.$('form[class^="Auth"] > button');
    expect(await buttonHandle.evaluate(b => b.textContent)).toBe('Sign In');
  });

  it('should enable submitting when form fields are filled', async () => {
    await page.click("input[name=email");
    await page.type("input[name=email]", userData.email);
    await page.click("input[name=password");
    await page.type("input[name=password]", userData.password);
    let buttonHandle = await page.$('form[class^="Auth"] > button');
    expect(await buttonHandle.evaluate(b => b.disabled)).toBe(false);
  });

  it('should render errors when response is not ok', async () => {
    await page.setRequestInterception(true);
    page.removeAllListeners('request');
    page.on('request', (request) => {
      if (request.url().indexOf('/api/v1/auth/sign_in')) {
        request.respond({ status: 422, body: JSON.stringify(responses['failure']) })
      }
    });
    await page.click('form[class^="Auth"] > button');
    await page.waitForSelector('p[class*="MuiFormHelperText-error"]');
    let emailErrorHandle = await page.$('p[class*="MuiFormHelperText-error"]');
    expect(await emailErrorHandle.evaluate(e => e.textContent)).toBe('Wrong email or password');
  });

  it('should redirect when response is ok', async () => {
    await page.setRequestInterception(true);
    page.removeAllListeners('request');
    page.on('request', (request) => {
      if (request.url().indexOf('/api/v1/auth/sign_in')) {
        request.respond({ status: 200, body: JSON.stringify(responses['success']) })
      }
    });
    await page.click("input[name=email");
    await page.click("input[name=password");
    await page.click('form[class^="Auth"] > button');
    await page.waitForSelector('main[class^="Layout_Main"]');
  });
});

afterAll(() => {
  browser.close();
});
