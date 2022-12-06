import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const columns = [
    {
        id: 'firstName',
        label: 'First Name',
        align: undefined
    },
    {
        id: 'lastName',
        label: 'Last Name',
        align: undefined
    },
    {
        id: 'email',
        label: 'Employee Email',
        align: undefined,
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'phoneNumber',
        label: 'Phone Number',
        align: undefined,
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'action',
        label: 'Action',
        align: 'center',
        format: (value) => value.toFixed(2),
    },
];

export default function DisplayTable(props) {
    const { rows, handleUpdate, handleDelete } = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '50px' }}>
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    style={{ fontWeight: '600', textAlign: column.align }}
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
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.phoneNumber}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            if (column.id === "action") {
                                                return (
                                                    <TableCell key={column.id}
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent: 'center'
                                                        }}
                                                    >
                                                        <Button
                                                            variant="contained"
                                                            sx={{
                                                                backgroundColor: '#2196f3',
                                                                float: 'left',
                                                                marginRight: '20px',
                                                                fontWeight: '600',
                                                                borderRadius: '10px',
                                                                height: "50px",
                                                                width: "120px"
                                                            }}
                                                            onClick={() => {
                                                                handleUpdate(row.id)
                                                            }}
                                                        >
                                                            <Stack
                                                                direction="row"
                                                                justifyContent="space-between"
                                                                alignItems="center"
                                                                spacing={2}
                                                                sx={{ width: '100%' }}
                                                            >
                                                                <EditIcon sx={{ marginRight: '10px' }} />
                                                                Update
                                                            </Stack>
                                                        </Button>
                                                        <Button
                                                            sx={{
                                                                fontWeight: '600',
                                                                borderRadius: '10px',
                                                                height: "50px",
                                                                width: "120px"
                                                            }}
                                                            variant="contained"
                                                            color="error"
                                                            onClick={() => {
                                                                handleDelete(row.id)
                                                            }}
                                                        >
                                                            <Stack
                                                                direction="row"
                                                                justifyContent="space-between"
                                                                alignItems="center"
                                                                spacing={2}
                                                                sx={{ width: '100%' }}
                                                            >
                                                                <DeleteForeverIcon sx={{ marginRight: '10px' }} />
                                                                Delete
                                                            </Stack>
                                                        </Button>
                                                    </TableCell>
                                                );
                                            } else {
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        sx={{
                                                            textTransform: 'capitalize'
                                                        }}
                                                    >
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            }
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper >
    );
}
