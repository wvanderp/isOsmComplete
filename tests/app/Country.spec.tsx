import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { ProgressBar } from '../../app/Country';

describe('ProgressBar', () => {
    it('renders a single progress segment when value is within max', () => {
        const html = renderToStaticMarkup(<ProgressBar value={25} max={100} />);

        expect(html).toContain('bg-green-600');
        expect(html).toContain('width:25%');
        expect(html).not.toContain('bg-yellow-500');
    });

    it('renders overflow segment when value exceeds max', () => {
        const html = renderToStaticMarkup(<ProgressBar value={150} max={100} />);

        expect(html).toContain('bg-green-600');
        expect(html).toContain('bg-yellow-500');
        expect(html).toContain('>50<');
    });
});
