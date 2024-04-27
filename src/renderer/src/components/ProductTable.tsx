import { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Avatar, CircularProgress } from '@mui/material'
import { deepOrange } from '@mui/material/colors'

// import DoDisturbIcon from '@mui/icons-material/DoDisturb'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
function createData(
  productDetails: string,
  previousPrize: number,
  currentPrize: number,
  status: boolean,
  websiteLogo: string
): {
  productDetails: string
  previousPrize: number
  currentPrize: number
  status: boolean
  websiteLogo: string
} {
  return { productDetails, previousPrize, currentPrize, status, websiteLogo }
}

const rows = [
  createData('Amazon', 159, 23, true, 'https://www.amazon.in/favicon.ico'),
  createData(
    'Flipkart',
    237,
    4324,
    true,
    'https://i.pinimg.com/736x/aa/70/8d/aa708d1f97a04f6f5a208213f89e1e67.jpg'
  )
  // createData('Eclair', 262, 234, true),
  // createData('Cupcake', 305, 4324, true),
  // createData('Gingerbread', 356, 234, false)
]

export default function ProductTable(): JSX.Element {
  const [selectedRow, setSelectedRow] = useState(null)

  const handleRowClick = (row): void => {
    setSelectedRow(row)
    setTimeout(() => {
      setSelectedRow(null)
    }, 200)
    // Reset selected row after 1 second
  }

  return (
    <TableContainer component={Paper} sx={{ height: 500 }}>
      <Table sx={{ minWidth: 550 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="left">Previous Prize</TableCell>
            <TableCell align="left">Current Prize</TableCell>
            <TableCell align="left">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.productDetails}
              onClick={() => handleRowClick(row)}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                cursor: 'pointer',
                backgroundColor: selectedRow === row ? 'rgba(0, 0, 0, 0.08)' : 'inherit',
                transition: 'background-color 0.5s ease'
              }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'content',
                  '& > *': { marginRight: '8px' }
                }}
              >
                <Avatar sx={{ bgcolor: deepOrange[500] }} src={row.websiteLogo}></Avatar>
                {row.productDetails}
              </TableCell>

              <TableCell align="left">{row.previousPrize}</TableCell>
              <TableCell align="left">{row.status ? '--' : row.currentPrize}</TableCell>
              <TableCell align="left">
                {row.status ? (
                  <CircularProgress color="secondary" size={20} />
                ) : (
                  <CheckCircleOutlineIcon sx={{ color: 'green' }} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
