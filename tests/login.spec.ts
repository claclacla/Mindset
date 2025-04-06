import { test, expect } from '@playwright/test';

test('should log in successfully with valid credentials', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:3000'); // Adjust the URL if needed

    // Fill in the username and password fields
    await page.fill('input[name="email"]', 'scobalit.desio@gmail.com');
    await page.fill('input[name="password"]', 'password');

    // Submit the login form
    await page.click('button[type="submit"]'); // The button to submit the form

    // Assert the redirection to the training sessions page
    await expect(page).toHaveURL('http://localhost:3000/training-sessions'); // Adjust if needed
});

test('should show authentication error with invalid credentials', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:3000'); // Adjust the URL if needed

    // Fill in invalid credentials
    await page.fill('input[name="email"]', 'invalidUser');
    await page.fill('input[name="password"]', 'invalidPassword');

    // Submit the login form
    await page.click('button[type="submit"]'); // The button to submit the form

    // Assert that the authentication error is displayed
    const errorMessage = await page.locator('[title="error-message"]'); // The error message element
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Authentication error');
});