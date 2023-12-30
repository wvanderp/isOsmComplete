export interface AllThePlacesRunHistory {
    run_id: string;
    start_time: Date;
    size_bytes?: number;
    output_url?: string;
    stats_url?: string;
    spiders?: number;
    total_lines?: number;
    insights_url?: string;
    end_time?: Date;
    pmtiles_url?: string;
}
