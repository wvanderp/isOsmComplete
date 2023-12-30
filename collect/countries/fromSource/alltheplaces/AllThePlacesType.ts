export interface AllThePlacesStats {
    data: Place[];
}

export interface Place {
    code: string;
    osm_count: number;
    nsi_brand: null | string;
    q_title: null | string;
    q_description: null | string;
    atp_count: number | null;
    atp_brand: null | string;
    atp_country_count: number;
    atp_supplier_count: number;
    atp_splits: unknown;
}
