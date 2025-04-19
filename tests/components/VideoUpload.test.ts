/// <reference types="@testing-library/jest-dom" />

import { render, screen, fireEvent } from '@testing-library/react';
import VideoUpload from '@/components/ui/form-control/VideoUpload';
import { useAppToast } from '@/components/ui/ToastHelper';
import '@testing-library/jest-dom';

jest.mock('@/components/ui/ToastHelper', () => ({
  useAppToast: jest.fn(),
}));

const showToastMock = jest.fn();
(useAppToast as jest.Mock).mockReturnValue({ showToast: showToastMock });

describe('VideoUpload component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('upload knop moet disabled zijn als er geen bestand geselecteerd is', () => {
    render(<VideoUpload />);
    const uploadButton = screen.getByRole('button', { name: /uploaden/i });
    expect(uploadButton).toBeDisabled(); // ✅ beter dan toHaveAttribute('disabled')
  });

  it('toont een error als bestand groter is dan 150MB', async () => {
    render(<VideoUpload />);
    const file = new File(['a'.repeat(2 * 1024 * 1024)], 'bigfile.mp4', { type: 'video/mp4' });
    Object.defineProperty(file, 'size', { value: 160 * 1024 * 1024 });

    const fileInput = screen.getByLabelText(/bestand uploaden/i);
    fireEvent.change(fileInput, { target: { files: [file] } });

    const uploadButton = screen.getByRole('button', { name: /uploaden/i });
    fireEvent.click(uploadButton);

    expect(showToastMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Bestand is te groot',
        status: 'error',
      })
    );
  });

  it('toont een success-toast bij succesvolle upload', async () => {
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        json: async () => ({
          uploadUrl: 'https://fakeuploadurl.com/blob',
          blobName: 'mijn_video.mp4',
        }),
        ok: true,
      } as Response)
      .mockResolvedValueOnce({ ok: true } as Response);

    render(<VideoUpload />);

    const file = new File(['video content'], 'video.mp4', { type: 'video/mp4' });
    const fileInput = screen.getByLabelText(/bestand uploaden/i);
    fireEvent.change(fileInput, { target: { files: [file] } });

    const uploadButton = screen.getByRole('button', { name: /uploaden/i });
    fireEvent.click(uploadButton);

    await new Promise((r) => setTimeout(r, 0));

    expect(showToastMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Upload gelukt',
        status: 'success',
      })
    );

    (global.fetch as jest.Mock).mockRestore();
  });

  it('toont een error-toast bij mislukte upload', async () => {
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        json: async () => ({
          uploadUrl: 'https://fakeuploadurl.com/blob',
          blobName: 'mijn_video.mp4',
        }),
        ok: true,
      } as Response)
      .mockResolvedValueOnce({ ok: false } as Response);

    render(<VideoUpload />);

    const file = new File(['video content'], 'video.mp4', { type: 'video/mp4' });
    const fileInput = screen.getByLabelText(/bestand uploaden/i);
    fireEvent.change(fileInput, { target: { files: [file] } });

    const uploadButton = screen.getByRole('button', { name: /uploaden/i });
    fireEvent.click(uploadButton);

    await new Promise((r) => setTimeout(r, 0));

    expect(showToastMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Upload mislukt',
        status: 'error',
      })
    );

    (global.fetch as jest.Mock).mockRestore();
  });
});
