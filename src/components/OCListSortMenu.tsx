import { useMediaQuery, Button, Menu, MenuItem, Box } from '@mui/material'
import React from 'react'
import ImportExportIcon from '@mui/icons-material/ImportExport'
import { isSP } from '../utils/utils'

export const rankingOptions2: SortOptions = [
  [['ランキング順', 'ランク順'], 'asc', 'rank'],
  [['増加数が多い順', '増加数多順'], 'desc', 'increase'],
  /* [['増加数が少ない順', '増加数少順'], 'asc', 'increase'], */
  [['増加率が高い順', '増加率高順'], 'desc', 'rate'],
  /*  [['増加率が低い順', '増加率低順'], 'asc', 'rate'], */
]

export const allOptions2: SortOptions = [
  [['メンバー数が多い順', '人数多順'], 'desc', 'member'],
  /* [['メンバー数が少ない順', '人数少順'], 'asc', 'member'], */
  [['作成日が新しい順', '新しい順'], 'desc', 'created_at'],
  [['作成日が古い順', '古い順'], 'asc', 'created_at'],
]

export default function OCListSortMenu({
  options,
  order,
  sort,
  setParams,
}: {
  options: SortOptions
  order: ListParams['order']
  sort: ListParams['sort']
  setParams: SetListParamsValue
}) {
  const under359 = useMediaQuery('(max-width:359px)')
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const selectedIndex = options.findIndex((el) => order === el[1] && sort === el[2])

  const handleClickListItem = (e: ClickEvent) => {
    setAnchorEl(e.currentTarget)
  }

  const handleMenuItemClick = (e: ClickEvent, i: number) => {
    setParams((params) => ({ ...params, order: options[i][1], sort: options[i][2] }))
    setAnchorEl(null)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{ pl: under359 ? undefined : '8px', whiteSpace: 'nowrap' }}>
      <Button
        id="sort-button"
        aria-controls={open ? 'sort-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClickListItem}
        sx={{ fontSize: under359 ? '12.5px' : '14px' }}
        color="success"
      >
        <ImportExportIcon sx={{ marginRight: under359 ? 0 : '4px', fontSize: '20px' }} />
        {isSP() || under359 ? `${options[selectedIndex][0][1]}` : options[selectedIndex][0][0]}
      </Button>
      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'sort-button',
        }}
      >
        {options.map((el, i) => (
          <MenuItem key={i} selected={i === selectedIndex} onClick={(event) => handleMenuItemClick(event, i)}>
            {el[0][0]}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}
