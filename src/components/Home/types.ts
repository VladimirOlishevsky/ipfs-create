export interface IPinataListApi {
    count: number,
    rows: IPinataListRow[]
}

export interface IPinataListRow {
    date_pinned: string,
    id: string,
    ipfs_pin_hash: string,
    size: number
    user_id: string
}