import { test, expect } from '@playwright/test';

/*
test('should insert a new training session', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:3000'); // Adjust the URL if needed

    // Fill in the username and password fields
    await page.fill('input[name="email"]', 'scobalit.desio@gmail.com');
    await page.fill('input[name="password"]', 'password');

    // Submit the login form
    await page.click('button[type="submit"]'); // The button to submit the form

    // Navigate to the insert training session page
    await page.goto('http://localhost:3000/insert-training-session'); // Adjust the URL if needed

    // Fill in the training session form
    await page.fill('input[name="firstName"]', 'Simone');
    await page.fill('input[name="lastName"]', 'Adelchino');
    await page.fill('input[name="age"]', '72');
    await page.fill('input[name="distance"]', '1');

    // Submit the form
    await page.click('button[type="submit"]'); // The button to submit the form

    // Check if the new session is visible on the training sessions page
    await page.goto('http://localhost:3000/training-sessions');
    await page.waitForTimeout(1000);
    await expect(page.locator('[title="Simone"]')).toBeVisible();
    await expect(page.locator('[title="Adelchino"]')).toBeVisible();
});
*/