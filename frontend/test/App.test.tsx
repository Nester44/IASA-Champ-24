import { describe, it, expect, vi } from 'vitest';

import {Home} from "../src/Home/Home";
import {render} from "@testing-library/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {act} from "react-dom/test-utils";

describe('Home page', async () => {
    const ResizeObserverMock = vi.fn(() => ({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
    }));

    // Stub the global ResizeObserver
    vi.stubGlobal('ResizeObserver', ResizeObserverMock);

    it('Renders correctly', () => {
        render(<QueryClientProvider client={new QueryClient()}><Home/></QueryClientProvider>);
    });
});