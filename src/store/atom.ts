import { atom, } from "recoil";

export const listParamsState = atom<ListParams>({
  key: 'listParams',
  default: {
    order: 'asc',
    sort: 'rank',
    list: 'daily',
    sub_category: ''
  },
});
