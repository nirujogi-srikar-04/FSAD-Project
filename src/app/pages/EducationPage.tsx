import React from 'react';
import { EducationCarousel } from '../components/EducationCarousel';

export function EducationPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-8 md:py-12">
      <div className="container mx-auto max-w-[var(--container-max)] px-4">
        <EducationCarousel />
      </div>
    </div>
  );
}
