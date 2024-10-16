import { test, expect } from "@playwright/test";
import 'dotenv/config'
import * as fs from "node:fs";


export const authFile = "./playwright/.auth/tester01.json";

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test.describe.serial("Test Authentication processes", () => {

  test("user sign up", async ({ page }) => {
    await page.goto(process.env.VITE_PLAYWRIGHT_HOST + "auth/register");
    await page.getByLabel("Username").fill("tester01");
    await page.getByLabel("Email").fill("tester01@chatty.fi");
    await page.getByLabel("Bio").fill("I am another test user");
    await page.getByLabel("Password", { exact: true }).fill("VerySecuredPassword");
    await page.getByText("Register", { exact: true }).click();
    await page.waitForURL(process.env.VITE_PLAYWRIGHT_HOST + "messages");
    await page.context().storageState({ path: authFile });
    expect(page.url()).toBe("http://localhost:3000/messages");
  });

  test("delete created test user", async ({ page, request }) => {
    //Get session storage , get userId and token from there
    const sessionStorage = JSON.parse(fs.readFileSync('playwright/.auth/tester01.json', 'utf-8'));
    const id=sessionStorage['cookies'][1].value;
    const token=sessionStorage['cookies'][2].value;
    const deleteUserResponse = await request.delete(process.env.VITE_APP_BACKEND_HOST + "users/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const deleteResponseJson= await deleteUserResponse.json();
    expect(deleteUserResponse.ok()).toBeTruthy();
    expect([deleteResponseJson]).toContainEqual(expect.objectContaining({ data: {}, version: '1.0.0' }));
  });
});
