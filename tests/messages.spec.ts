import {expect, test} from "@playwright/test";
import 'dotenv/config';
import * as fs from "node:fs";

const sessionStorage = JSON.parse(fs.readFileSync('playwright/.auth/user.json', 'utf-8'));


test.describe("Test Messaging", () => {
    // Reset storage state for this file to avoid being authenticated
    test.use({ storageState: sessionStorage });

    test("messages page load and AI message preview is visible", async ({ page }) => {
        await page.goto('http://localhost:3000/messages');
        await expect(page.getByRole('heading', {name: 'Messages'})).toBeVisible();
        await expect(page.getByTestId('message-preview-chattyai')).toBeVisible();
    });

    test("send message to ai and get response", async ({ page }) => {
        await page.goto('http://localhost:3000/messages');
        await expect(page.getByRole('heading', {name: 'Messages'})).toBeVisible();
        await expect(page.getByTestId('message-preview-chattyai')).toBeVisible();
        await page.getByTestId('message-preview-chattyai').click();
        await page.waitForURL('**/aichat');
        expect(page.url()).toContain("http://localhost:3000/messages/aichat");
        await expect(page.getByPlaceholder('Write a message...')).toBeVisible();
        await page.getByPlaceholder('Write a message...').fill('Hello!');
        await page.getByRole('button').click();
        await page.waitForURL('**/aichat');
        await expect(page.getByText('Hello!').nth(1)).toBeVisible();
        await expect(page.getByText(/^Hello! How can I assist you today\?$/).first()).toBeVisible();
    });
});