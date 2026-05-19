import { test, expect } from "vitest";
import { render } from "vitest-browser-react";
import { CartSummary } from "./CartSummary";
import { cartItem_1 } from "./CartList.test";

test("render cart item summary correctly", async () => {
    const { getByText } = render(<CartSummary items={[cartItem_1]} />);
    await expect.element(getByText("Order Summary")).toBeInTheDocument();
    await expect.element(getByText("2")).toBeInTheDocument();
    await expect.element(getByText("$59.98")).toBeInTheDocument();
    await expect.element(getByText("Proceed to Checkout")).toBeInTheDocument();
});