import { Comparison } from '../types';

export type ComparisonFunction = () => Promise<Comparison | Comparison[]>;
