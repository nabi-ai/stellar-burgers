import { ProfileMenuUI } from '@ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/ProfileMenu',
  component: ProfileMenuUI,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
} satisfies Meta<typeof ProfileMenuUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProfilePageMenu: Story = {
  args: {
    pathname: '/profile',
    handleLogout: () => {}
  }
};

export const ProfileOrdersPageMenu: Story = {
  args: {
    pathname: '/profile/orders',
    handleLogout: () => {}
  }
};

export const ProfileOrdersDetailPageMenu: Story = {
  args: {
    pathname: '/profile/orders/12345',
    handleLogout: () => {}
  }
};
