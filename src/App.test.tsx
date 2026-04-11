import { cleanup, render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

beforeEach(() => {
  window.scrollTo = vi.fn();

  Object.defineProperty(window.SVGElement.prototype, 'getTotalLength', {
    configurable: true,
    value: vi.fn(() => 100),
  });
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

const renderRoute = (initialEntry: string) => {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <App />,
        children: [
          { index: true, element: <div>Homepage outlet</div> },
          { path: 'demos', element: <div>Demos outlet</div> },
          { path: 'case-studies', element: <div>Case studies outlet</div> },
        ],
      },
    ],
    { initialEntries: [initialEntry] },
  );

  return render(<RouterProvider router={router} />);
};

describe('App shell', () => {
  it('keeps the grid background mounted and makes the homepage outlet transparent', () => {
    const { container } = renderRoute('/');

    expect(container.querySelector('.grid-background')).toBeInTheDocument();
    expect(screen.getByText('Homepage outlet').parentElement).toHaveClass('bg-transparent');
  });

  it('preserves the sand background on non-home routes', () => {
    renderRoute('/case-studies');

    expect(screen.getByText('Case studies outlet').parentElement).toHaveClass('bg-[#FFF6ED]');
  });

  it('shows Demos before Case Studies in the navigation', () => {
    renderRoute('/');

    const demosLink = screen.getByRole('link', { name: 'Demos' });
    const caseStudyLink = screen.getByRole('link', { name: 'Case Studies' });

    expect(demosLink.compareDocumentPosition(caseStudyLink)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  it('renders the demos outlet on the demos route with the app background', () => {
    renderRoute('/demos');

    expect(screen.getByText('Demos outlet').parentElement).toHaveClass('bg-[#FFF6ED]');
  });
});
