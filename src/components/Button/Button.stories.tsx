import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Button } from "./Button";

const meta = {
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["ai-generated"],
  args: {
    onClick: fn(),
  },
  argTypes: {
    children: { control: "text" },
    variant: {
      control: "inline-radio",
      options: ["primary", "secondary", "danger"],
    },
    size: {
      control: "inline-radio",
      options: ["small", "medium", "large"],
    },
    loading: { control: "boolean" },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
    type: {
      control: "inline-radio",
      options: ["button", "submit", "reset"],
    },
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "medium",
    children: "결제하기",
  },
  parameters: {
    docs: {
      source: {
        code: '<Button variant="primary" size="medium">결제하기</Button>',
      },
    },
  },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /결제하기/i }));

    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "취소",
  },
  parameters: {
    docs: {
      source: {
        code: '<Button variant="secondary">취소</Button>',
      },
    },
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "삭제",
  },
  parameters: {
    docs: {
      source: {
        code: '<Button variant="danger">삭제</Button>',
      },
    },
  },
};

export const Small: Story = {
  args: {
    size: "small",
    children: "작게",
  },
  parameters: {
    docs: {
      source: {
        code: '<Button size="small">작게</Button>',
      },
    },
  },
};

export const Large: Story = {
  args: {
    size: "large",
    children: "크게",
  },
  parameters: {
    docs: {
      source: {
        code: '<Button size="large">크게</Button>',
      },
    },
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: "전체 너비",
  },
  parameters: {
    layout: "padded",
    docs: {
      source: {
        code: "<Button fullWidth>전체 너비</Button>",
      },
    },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "저장",
  },
  parameters: {
    docs: {
      source: {
        code: "<Button loading>저장</Button>",
      },
    },
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: /처리 중/i });

    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute("aria-busy", "true");
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "비활성",
  },
  parameters: {
    docs: {
      source: {
        code: "<Button disabled>비활성</Button>",
      },
    },
  },
};
