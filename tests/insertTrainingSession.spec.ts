import { test, expect } from '@playwright/test';

test('should insert a new training session', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:3000'); // Adjust the URL if needed

    // Fill in the username and password fields
    await page.fill('input[name="username"]', 'scobalit.desio');
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

    // Assert the page contains a success message or other expected content after insertion
    //const successMessage = await page.locator('text=Training session inserted successfully'); // Adjust the success message if necessary
    //await expect(successMessage).toBeVisible();

    // Check if the new session is visible on the training sessions page
    await page.goto('http://localhost:3000/training-sessions'); 
    await expect(page.locator('[title="Simone"]')).toBeVisible();
    await expect(page.locator('[title="Adelchino"]')).toBeVisible();
});

test('should show validation errors if fields are missing', async ({ page }) => {
    // Navigate to the insert training session page
    await page.goto('http://localhost:3000/insert-training-session'); // Adjust the URL if needed

    // Leave the fields empty and submit the form
    await page.click('button[type="submit"]');

    // Assert that validation error messages are shown for required fields
    await expect(page.locator('text=Firstname is required')).toBeVisible(); // Adjust error message based on your validation logic
    await expect(page.locator('text=Lastname is required')).toBeVisible();  // Adjust error message based on your validation logic
});