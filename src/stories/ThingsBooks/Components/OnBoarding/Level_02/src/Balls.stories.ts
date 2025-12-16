import type { Meta, StoryObj } from '@storybook/react-vite';
import { Balls } from './Balls';

const meta = {
  title: 'Design System/Easing Balls Demo',
  component: Balls,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    showAllEasings: { 
      control: 'boolean',
      description: '모든 이징 함수를 보여줄지 여부'
    },
  },
} satisfies Meta<typeof Balls>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    showAllEasings: false,
  },
};

export const AllEasings: Story = {
  args: {
    showAllEasings: true,
  },
  parameters: {
    docs: {
      description: {
        story: '모든 이징 함수를 한 번에 볼 수 있는 데모입니다. 각 볼을 클릭해서 애니메이션을 확인해보세요.'
      }
    }
  }
};