import type { Meta, StoryObj } from '@storybook/react-vite';
import TokenButton from './TokenButton';

const meta = {
  title: 'Design System/Token Button',
  component: TokenButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof TokenButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리들
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: '기본 버튼',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: '보조 버튼',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: '성공 버튼',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: '경고 버튼',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: '에러 버튼',
  },
};

// 크기별 스토리
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <TokenButton size="small" variant="primary">Small</TokenButton>
      <TokenButton size="medium" variant="primary">Medium</TokenButton>
      <TokenButton size="large" variant="primary">Large</TokenButton>
    </div>
  ),
};

// 모든 변형 보기
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <TokenButton variant="primary">Primary</TokenButton>
        <TokenButton variant="secondary">Secondary</TokenButton>
      </div>
      <div className="flex items-center gap-4">
        <TokenButton variant="success">Success</TokenButton>
        <TokenButton variant="warning">Warning</TokenButton>
        <TokenButton variant="error">Error</TokenButton>
      </div>
    </div>
  ),
};

// 상태별 스토리
export const States: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <TokenButton variant="primary">Normal</TokenButton>
      <TokenButton variant="primary" disabled>Disabled</TokenButton>
    </div>
  ),
};