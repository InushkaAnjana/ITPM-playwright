const { test, expect } = require("@playwright/test");

const cases = [
  {
    id: "Pos_Fun_0101",
    name: "command - issarahata yanna",
    input: "issarahata yann",
    expected: "ඉස්සරහට යන්න",
  },
  
 
];

test.describe("SwiftTranslator - Positive functional tests", () => {
  for (const tc of cases) {
    test(`${tc.id} - ${tc.name}`, async ({ page }) => {
      await page.goto("https://www.swifttranslator.com/");

      const inputBox = page.getByRole("textbox", {
        name: "Input Your Singlish Text Here.",
      });

      await inputBox.fill(tc.input);

      // Assert expected Sinhala appears
      await expect(page.getByText(tc.expected)).toBeVisible();
    });
  }
});