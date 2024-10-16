import {expect, test} from "@playwright/test";
import 'dotenv/config';

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test.describe.serial("Test landing page", () => {

    test("Landing elements", async ({ page }) => {
        await page.goto('http://localhost:3000/');
        await expect(page.getByRole('heading', {name: 'Chatty App'})).toBeVisible();
        await expect(page.getByText('Welcome to chatty app')).toBeVisible();
        await expect(page.getByText('Features :')).toBeVisible();
        await expect(page.getByText('Search for users to chat with')).toBeVisible();
        await expect(page.getByText('Add interesting users')).toBeVisible();
        await expect(page.getByText('Start chatting in realtime')).toBeVisible();
        await page.getByRole('link', { name: 'Get started' }).click();
        await page.waitForURL(process.env.VITE_PLAYWRIGHT_HOST + "auth/login");
        expect(page.url()).toBe("http://localhost:3000/auth/login");
    });

});