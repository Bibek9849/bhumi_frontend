import { expect, test } from "@playwright/test";

test.describe("Product Page Tests", () => {
    test.beforeEach(async ({ page }) => {
        // Mock API response
        await page.route("**/api/products", (route) =>
            route.fulfill({
                status: 200,
                body: JSON.stringify({
                    data: [
                        {
                            _id: "1",
                            name: "Product 1",
                            image: "product1.jpg",
                            product_categoryId: { name: "Category A", description: "Category A Desc" }
                        },
                        {
                            _id: "2",
                            name: "Product 2",
                            image: "product2.jpg",
                            product_categoryId: { name: "Category B", description: "Category B Desc" }
                        }
                    ],
                }),
            })
        );

        // Navigate to the product page
        await page.goto("http://localhost:5173/product");
        await page.waitForSelector("h1", { timeout: 10000 }); // Wait for page to load
    });

    // Test if product page renders correctly
    test("should render product page with products", async ({ page }) => {
        await expect(page.locator("h1")).toHaveText("Our Products");

        // Wait for products to be visible
        await page.waitForSelector("text=Product 1", { timeout: 5000 });
        await page.waitForSelector("text=Product 2", { timeout: 5000 });

        // Verify product listings
        await expect(page.locator("text=Product 1")).toBeVisible();
        await expect(page.locator("text=Product 2")).toBeVisible();

        // Verify category dropdown exists
        await expect(page.locator("button:has-text('Select Category')")).toBeVisible();
    });

    // Test category filtering
    test("should filter products by selected category", async ({ page }) => {
        await page.click("button:has-text('Select Category')");
        await page.waitForSelector("text=Category A", { timeout: 5000 });
        await page.click("text=Category A");

        await page.waitForTimeout(1000); // Allow filtering to apply
        await expect(page.locator("text=Product 1")).toBeVisible();
        await expect(page.locator("text=Product 2")).not.toBeVisible();
    });

    // Test navigation to product details page
    test("should navigate to product details when clicked", async ({ page }) => {
        await page.waitForSelector("text=Product 1", { timeout: 5000 });
        await page.click("text=Product 1");
        await expect(page).toHaveURL(/product-detail\/1/);
    });

    // Test category dropdown visibility
    test("should show and hide category dropdown on hover", async ({ page }) => {
        await page.hover("button:has-text('Select Category')");
        await page.waitForSelector("text=Category A", { timeout: 5000 });
        await expect(page.locator("text=Category A")).toBeVisible();
        await page.mouse.move(0, 0); // Move cursor away
        await page.waitForTimeout(1000);
        await expect(page.locator("text=Category A")).not.toBeVisible();
    });
});