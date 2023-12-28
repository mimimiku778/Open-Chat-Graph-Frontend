import * as React from 'react'
import Popover from '@mui/material/Popover'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Box, Button, useMediaQuery } from '@mui/material'

export default function OCListDescMouseOverPopover({ children }: { children: React.ReactNode }) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
  const matches = useMediaQuery('(min-width:600px)') // 599px以下で false

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <Box sx={{ width: 'fit-content' }}>
      <Button
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={matches ? handlePopoverOpen : undefined}
        onMouseLeave={matches ? handlePopoverClose : undefined}
        onClick={handlePopoverOpen}
        sx={{ p: 0, minWidth: 0 }}
      >
        <HelpOutlineIcon sx={{ color: 'rgba(0, 0, 0, 0.12)', fontSize: '22px' }} />
      </Button>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: matches ? 'none' : undefined,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        onTouchStart={handlePopoverClose}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', p: '1.25rem' }}>{children}</Box>
      </Popover>
    </Box>
  )
}
