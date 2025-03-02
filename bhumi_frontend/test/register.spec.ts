import { expect, test } from "@playwright/test";

test.describe('Login & Register Page Tests', () => {
    // Test the login page rendering
    test('should render login form correctly', async ({ page }) => {
        await page.goto('http://localhost:5173/');

        await expect(page.locator('text=Contact')).toBeVisible();
        await expect(page.locator('input[placeholder="Contact Number"]')).toBeVisible();
        await expect(page.locator('text=Password')).toBeVisible();
        await expect(page.locator('input[placeholder="Password"]')).toBeVisible();
        await expect(page.locator('button', { hasText: 'Login' })).toBeVisible();
    });

    // Test error message on failed login
    test('should display error message when login fails', async ({ page }) => {
        await page.route('**/api/user/login', route =>
            route.fulfill({
                status: 400,
                body: JSON.stringify({ message: 'Invalid credentials' })
            })
        );

        await page.goto('http://localhost:5173/');
        await page.fill('input[placeholder="Contact Number"]', '1234567890');
        await page.fill('input[placeholder="Password"]', 'wrongpassword');
        await page.click('button:has-text("Login")');

        await expect(page.locator('text=Invalid credentials')).toBeVisible();
    });

    // Test successful login and redirection
    test('should redirect after successful login', async ({ page }) => {
        await page.route('**/api/user/login', route =>
            route.fulfill({
                status: 200,
                body: JSON.stringify({
                    token: '31232321321323213',
                    fullName: 'Bibek Pandey',
                    email: 'bibek@example.com',
                    image: 'avatar.png',
                    id: 'user123',
                    contact: '1234567890',
                    role: '1'
                }),
            })
        );

        await page.goto('http://localhost:5173/');
        await page.fill('input[placeholder="Contact Number"]', '1234567890');
        await page.fill('input[placeholder="Password"]', 'password123');
        await page.click('button:has-text("Login")');

        await page.waitForNavigation();
        await expect(page).toHaveURL('http://localhost:5173/admin');

        const token = await page.evaluate(() => localStorage.getItem('token'));
        expect(token).toBe('dummy_token');
    });

    // Test navigation to signup page
    test('should navigate to signup page when clicking signup link', async ({ page }) => {
        await page.goto('http://localhost:5173/');
        await page.click('text=SignUp');
        await expect(page).toHaveURL('http://localhost:5173/register');
    });

    // Test disabled login button during API request
    test('should disable login button while loading', async ({ page }) => {
        await page.route('**/api/user/login', route =>
            route.fulfill({
                status: 200,
                body: JSON.stringify({
                    token: 'dummy_token',
                    fullName: 'John Doe',
                    email: 'john@example.com',
                    image: 'avatar.png',
                    id: 'user123',
                    contact: '1234567890',
                    role: '1'
                }),
                // delay: 2000
            })
        );

        await page.goto('http://localhost:5173/');
        await page.fill('input[placeholder="Contact Number"]', '9876543210');
        await page.fill('input[placeholder="Password"]', 'password');

        await page.click('button:has-text("Login")');
        await expect(page.locator('button:has-text("Login")')).toBeDisabled();
    });

    // Test the registration page rendering
    test('should render registration form correctly', async ({ page }) => {
        await page.goto('http://localhost:5173/register');

        await expect(page.locator('text=Name')).toBeVisible();
        await expect(page.locator('input[placeholder="Bibek Pandey"]')).toBeVisible();
        await expect(page.locator('text=Email')).toBeVisible();
        await expect(page.locator('input[placeholder="name@gmail.com"]')).toBeVisible();
        await expect(page.locator('text=Password')).toBeVisible();
        await expect(page.locator('button', { hasText: 'Register' })).toBeVisible();
    });

    // Test successful registration
    test('should register a user and redirect', async ({ page }) => {
        await page.route('**/api/user/register', route =>
            route.fulfill({
                status: 201,
                body: JSON.stringify({ message: 'Registration successful!' })
            })
        );

        await page.goto('http://localhost:5173/register');
        await page.fill('input[placeholder="Bibek Pandey"]', 'John Doe');
        await page.fill('input[placeholder="name@gmail.com"]', 'john@example.com');
        await page.fill('input[placeholder="Contact"]', '1234567890');
        await page.fill('input[placeholder="Gorkha, Nepal"]', 'Kathmandu, Nepal');
        await page.fill('input[placeholder="Password"]', 'password123');
        await page.click('button:has-text("Register")');

        await expect(page.locator('text=Registration successful!')).toBeVisible();
    });

    // Test validation errors on registration page
    test('should show validation errors on registration page', async ({ page }) => {
        await page.goto('http://localhost:5173/register');
        await page.click('button:has-text("Register")');

        await expect(page.locator('text=Full Name is required')).toBeVisible();
        await expect(page.locator('text=Email is required')).toBeVisible();
        await expect(page.locator('text=Password is required')).toBeVisible();
    });
});
