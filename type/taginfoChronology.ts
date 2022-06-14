export default interface TaginfoChronology {
    url: string;
    data_until: string;
    total: number;
    data: {
        date: string;
        nodes: number;
        ways: number;
        relations: number;
    }[]
};
