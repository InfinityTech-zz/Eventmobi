import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Column, Data, TotalGists } from '../interfaces/ListGist';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import Pagination from '@mui/material/Pagination';
import { NUM_GISTS_PER_PAGE } from '../constants';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import Skeleton from '@mui/material/Skeleton';
import moment from 'moment'; 


const columns: readonly Column[] = [
  { id: 'date', label: 'Date Created', minWidth: 170 },
  { id: 'file', label: 'File Name', minWidth: 100 },
  {
    id: 'type',
    label: 'File Type',
    minWidth: 100,
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'forks',
    label: 'Forks',
    minWidth: 100,
    format: (value: number) => value.toLocaleString('en-US'),
  },
];

function createData(
  date: string,
  file: string,
  type: string,
  forks: Array<any>,
): Data {
  return { date, file, type, forks };
}


const ListGists = ({ totalNumGists = 0, gistData, updateCurrentPage}: TotalGists): ReactJSXElement  => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(NUM_GISTS_PER_PAGE);
  gistData = gistData?.map(item => (typeof item.type === 'object' ? {...item, type: Object.values(item.type)[2]} : item))
  const rows: any[] = gistData;

  const handlePageChange = (event: any, page: any) => {
    updateCurrentPage(page);
  }

  return (
    <Paper sx={{ width: '80%', overflow: 'hidden', marginLeft: '10%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        {gistData?.length > 0 ? (
 <Table stickyHeader aria-label="sticky table">
 <TableHead>
   <TableRow>
     {columns.map((column) => (
       <TableCell
         key={column.id}
         align={column.align}
         style={{ minWidth: column.minWidth }}
       >
         {column.label}
       </TableCell>
     ))}
   </TableRow>
 </TableHead>
    <TableBody>
    {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => {
        return (
            <TableRow hover role="checkbox" tabIndex={-1} key={row.file}>
            {columns.map((column) => {
                const value = row[column.id];
                return (
                <TableCell key={column.id} align={column.align}>
                    {column.id === 'forks' ? (
                    <>
                    {value?.length > 0 ? (
                    <Stack direction="row" spacing={2}>
                    <ForkRightIcon />
                    {value.map((item: any) => {
                        return (
                            <Box onClick={() => window.open(item.forkUrl, "_blank")}><Avatar alt="Remy Sharp" src={item.avatarUrl} /></Box>
                        )
                    })}
                    
                    
                    </Stack>
                    ): (
                        'No Forks'
                    )}
                    
                    </>
                    ) : column.id === 'date'
                    ? moment(value).format('DD-MM-YY')
                    : value}
                </TableCell>
                );
            })}
            </TableRow>
        );
        })}
    </TableBody>
</Table>
        ) : (
            <Skeleton variant="rectangular" height={400} />  
        )}
       
      </TableContainer>
      <Stack style={{ alignSelf: 'flex-end'}} spacing={2}>
      <Pagination onChange={handlePageChange} count={Math.floor(totalNumGists / NUM_GISTS_PER_PAGE)} />
    </Stack>
    </Paper>
  );
}

export default ListGists;