import {expect, test} from "@playwright/test";
import 'dotenv/config';
import * as fs from "node:fs";

const sessionStorage = JSON.parse(fs.readFileSync('playwright/.auth/user.json', 'utf-8'));


test.describe("Test Contacts", () => {
    // Reset storage state for this file to avoid being authenticated
    test.use({ storageState: sessionStorage });

    test("contacts page load and AI contact is visible", async ({ page }) => {
        await page.goto('http://localhost:3000/contacts');
        await expect(page.getByRole('heading', {name: 'Contacts'})).toBeVisible();
        await expect(page.getByRole('heading', {name: 'chattyai'})).toBeVisible();
        await expect(page.getByText('I am an AI entity here to help')).toBeVisible();
    });

    test("AI contact detail page", async ({ page }) => {
        await page.goto('http://localhost:3000/contacts');
        await expect(page.getByRole('heading', {name: 'Contacts'})).toBeVisible();
        await page.getByTestId('contactItem-chattyai').click();
        await page.waitForURL('**/');
        expect(page.url()).toContain("http://localhost:3000/contacts");
    });

    test("Add new contact", async ({ page }) => {
        await page.goto('http://localhost:3000/contacts');
        await expect(page.getByRole('heading', {name: 'Contacts'})).toBeVisible();
        await expect(page.getByTestId('add-new-contact')).toBeVisible();
        await page.getByTestId('add-new-contact').click();
        await page.waitForURL('**/');
        expect(page.url()).toContain("http://localhost:3000/contacts/new");
        await page.getByPlaceholder('Search for users e.g @ayoalabi').fill('ay');
        await expect(page.getByRole('link', { name: 'ayoalabi I am a nature lover' })).toBeVisible();
    });

});