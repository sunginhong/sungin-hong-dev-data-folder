import type { Preview } from '@storybook/react';
// Import design tokens globally
import '../src/styles/tokens.css';
import '../src/styles/semantic-tokens.css';
import '../src/styles/storiesStyle.css';
// Easing tokens are imported as TS module when needed

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      autodocs: 'tag',
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1a1a1a',
        },
        {
          name: 'brand',
          value: 'var(--color-primary-50)',
        },
      ],
    },
  },
};

export default preview;