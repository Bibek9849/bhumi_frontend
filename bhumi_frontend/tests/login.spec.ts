import { expect, test } from "@playwright/test";

test.describe("Login Page Tests", () => {
    // Test rendering of the login form
    test("should render login form correctly", async ({ page }) => {
        await page.goto("http://localhost:5173/");

        await expect(page.locator("input#contact")).toBeVisible();
        await expect(page.locator("input#password")).toBeVisible();
        await expect(page.locator("button:has-text('Login')")).toBeVisible();
    });

    // Test unsuccessful login attempt
    test("should display error message when login fails", async ({ page }) => {
        await page.route("**/api/users/login", (route) =>
            route.fulfill({
                status: 400,
                body: JSON.stringify({ message: "Invalid credentials" }),
            })
        );

        await page.goto("http://localhost:5173/");
        await page.fill("input#contact", "9876543210");
        await page.fill("input#password", "wrongpassword");
        await page.click("button:has-text('Login')");

        await expect(page.locator("text=Invalid credentials")).toBeVisible();
    });

    // Test successful login
    test("should store user data and redirect on successful login", async ({ page }) => {
        await page.route("**/api/users/login", (route) =>
            route.fulfill({
                status: 200,
                body: JSON.stringify({
                    data: {
                        token: "dummy_token",
                        fullName: "John Doe",
                        email: "john@example.com",
                        image: "avatar_url",
                        id: "user123",
                        contact: "9876543210",
                        role: "0",
                    },
                }),
            })
        );

        await page.goto("http://localhost:5173/");
        await page.fill("input#contact", "9876543210");
        await page.fill("input#password", "correctpassword");
        await page.click("button:has-text('Login')");

        await page.waitForTimeout(1000);

        // Verify localStorage items
        const storedToken = await page.evaluate(() => localStorage.getItem("token"));
        const storedUser = await page.evaluate(() => localStorage.getItem("user"));

        expect(storedToken).toBe("dummy_token");
        expect(storedUser).not.toBeNull(); // Ensure it's not null before parsing

        const parsedUser = storedUser ? JSON.parse(storedUser) : {};
        expect(parsedUser).toEqual({
            fullName: "John Doe",
            email: "john@example.com",
            image: "avatar_url",
            id: "user123",
            contact: "9876543210",
        });
    });

    // Test redirection based on role
    test("should navigate to admin or home based on user role", async ({ page }) => {
        await page.route("**/api/users/login", (route) =>
            route.fulfill({
                status: 200,
                body: JSON.stringify({
                    data: {
                        token: "dummy_token",
                        fullName: "Admin User",
                        email: "admin@example.com",
                        image: "avatar_url",
                        id: "admin123",
                        contact: "1234567890",
                        role: "1",
                    },
                }),
            })
        );

        await page.goto("http://localhost:5173/");
        await page.fill("input#contact", "1234567890");
        await page.fill("input#password", "adminpassword");
        await page.click("button:has-text('Login')");

        await expect(page).toHaveURL("http://localhost:5173/admin");
    });

    // Test navigation to signup page
    test("should navigate to signup page when clicking signup link", async ({ page }) => {
        await page.goto("http://localhost:5173/");
        await page.click("text=SignUp");
        await expect(page).toHaveURL("http://localhost:5173/register");
    });

    // Test login button disablement while loading
    test("should disable login button while loading", async ({ page }) => {
        await page.route("**/api/users/login", async (route) => {
            await new Promise((resolve) => setTimeout(resolve, 3000));
            route.fulfill({
                status: 200,
                body: JSON.stringify({
                    data: { token: "dummy_token" },
                }),
            });
        });

        await page.goto("http://localhost:5173/");
        await page.fill("input#contact", "9876543210");
        await page.fill("input#password", "password");
        await page.click("button:has-text('Login')");

        await expect(page.locator("button:has-text('Login')")).toBeDisabled();
    });
});
