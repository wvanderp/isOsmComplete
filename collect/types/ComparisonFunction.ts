import { Comparison } from '../types';

export type ComparisonResult = Comparison | Comparison[];

// A ComparisonFunction is the smallest retryable unit in the collector.
export interface ComparisonFunction {
    (): Promise<ComparisonResult>;
}
