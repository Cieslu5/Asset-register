import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { FileDrop, type FileDropTexts } from './FileDrop';

const texts: FileDropTexts = {
  title: 'Drop the signed protocol here or choose a file',
  hint: 'PDF, JPG or PNG, up to 10 MB',
  remove: (name) => `Remove ${name}`,
  tooLarge: (name) => `${name} is larger than 10 MB. Compress it or scan at a lower resolution.`,
  wrongType: (name) => `${name} is not a PDF or an image. Save it as PDF and try again.`,
};

const meta = {
  title: 'Forms/FileDrop',
  component: FileDrop,
  args: {
    value: [],
    onChange: () => undefined,
    accept: ['application/pdf', 'image/*'],
    maxSizeMb: 10,
    texts,
  },
} satisfies Meta<typeof FileDrop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: function Render(args) {
    const [files, setFiles] = useState<File[]>([]);
    return <FileDrop {...args} value={files} onChange={setFiles} />;
  },
};

export const WithFiles: Story = {
  render: function Render(args) {
    const [files, setFiles] = useState<File[]>([
      new File(['%PDF-1.7'], 'PPS-2026-014-signed.pdf', { type: 'application/pdf' }),
      new File([new Uint8Array(2_400_000)], 'damage-photo.pdf', { type: 'application/pdf' }),
    ]);
    return <FileDrop {...args} multiple value={files} onChange={setFiles} />;
  },
};

export const Disabled: Story = { args: { disabled: true } };
