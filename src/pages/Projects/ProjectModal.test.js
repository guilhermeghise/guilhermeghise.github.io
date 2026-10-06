import { fireEvent, render, screen } from '@testing-library/react';
import ProjectModal from './ProjectModal';
import { projects } from '../../data';
import { translations } from '../../constants/translations';

test('project details show the gallery and switch between projects', () => {
  const originalScrollTo = HTMLElement.prototype.scrollTo;
  HTMLElement.prototype.scrollTo = jest.fn();
  const { container, unmount } = render(
    <ProjectModal projects={projects} initialIndex={0} onClose={() => {}}
      theme="light" tModal={translations.en.projects.modal} />
  );
  try {
    expect(screen.getByRole('heading', { name: 'Coffee Overflow' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Open image: Coffee Overflow screenshot 1' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Open image: Coffee Overflow screenshot 1' }));
    expect(screen.getByRole('img', { name: 'Coffee Overflow preview' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Close image' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next screenshot' }));
    expect(screen.getByRole('button', { name: 'Open image: Coffee Overflow screenshot 2' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Next project' }));
    expect(screen.getByRole('heading', { name: 'Food Swap' })).toBeTruthy();
    expect(screen.getByRole('img', { name: 'Food Swap screenshot 1' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Previous project' }));
    expect(screen.getByRole('heading', { name: 'Coffee Overflow' })).toBeTruthy();
  } finally {
    unmount();
    HTMLElement.prototype.scrollTo = originalScrollTo;
  }
});
