import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { Menu, MenuItem } from '@mui/material'
import Link from 'next/link'
function BasicMenu() {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }


  return (
    <div className='md:!hidden'>
      <Button id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className="!capitalize !text-white"
      >
        Browse
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className="menu"
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem onClick={handleClose}><Link href='/'>Home</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link href='/category/tv-show'>TV Shows</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link href='/category/movies'>Movies</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link href='/category/my-list'>My List</Link></MenuItem>
      </Menu>
    </div>
  )
}

export default BasicMenu