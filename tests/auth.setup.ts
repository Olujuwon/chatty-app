import { test as setup } from "@playwright/test";
import 'dotenv/config'

export const authFile = "./playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
    await page.goto(process.env.VITE_PLAYWRIGHT_HOST + "auth/login");
    await page.getByLabel("Username", { exact: true }).fill("tester");
    await page.getByLabel("Password", { exact: true }).fill("verysecurepassword");
    await page.getByText("Login", { exact: true }).click();
    await page.waitForURL(process.env.VITE_PLAYWRIGHT_HOST + "messages");
    await page.context().storageState({ path: authFile });
});
