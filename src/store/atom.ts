import { atom, } from "recoil";

export const listParamsState = atom<ListParams>({
  key: 'listParams',
  default: {
    sub_category: '',
    keyword: '',
    order: 'asc',
    sort: 'rank',
    list: 'daily',
  },
});