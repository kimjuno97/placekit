import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import App from "./App";

const meta = {
  component: App,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["ai-generated"],
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CounterClicked: Story = {
  play: async ({ canvas, userEvent }) => {
    const counter = canvas.getByRole("button", { name: /count is 0/i });

    await userEvent.click(counter);
    await expect(
      canvas.getByRole("button", { name: /처리 중/i }),
    ).toHaveAttribute("aria-busy", "true");

    await expect(
      await canvas.findByRole(
        "button",
        { name: /count is 1/i },
        { timeout: 1500 },
      ),
    ).toBeVisible();
  },
};

export const CssCheck: Story = {
  play: async ({ canvas }) => {
    const counter = canvas.getByRole("button", { name: /count is 0/i });

    await expect(getComputedStyle(counter).backgroundColor).toBe(
      "rgb(49, 130, 246)",
    );
  },
};
