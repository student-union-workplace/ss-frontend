import {useMemo, useState} from "react";
import {useQuery} from "react-query";
import {
    Box,
    CircularProgress, IconButton,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow,
    Typography
} from "@mui/material";
import {RoutesName} from "../../../enums/routes";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {UsersApi} from "../../../api/users";
import {useNavigate} from "react-router-dom";
import {UserData} from "../../../types/users";
import Button from "@mui/material/Button";
import {Role} from "../../../enums/roles";
import FilterListIcon from "@mui/icons-material/FilterList";
import {DecodedJwt} from "../../../utils/jwt/DecodedJwt.tsx";
import {RolePopover} from "./components/RolePopover.tsx";
import {AddUserModal} from "./components/AddUserModal.tsx";

export const UsersPage = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [roleFilter, setRoleFilter] = useState(null)
    const [anchorElRoleFilter, setAnchorElRoleFilter] = useState<HTMLButtonElement | null>(null);
    const openRoleFilter = Boolean(anchorElRoleFilter);/*
    const [departmentFilter, setDepartmentFilter] = useState(null)
    const [anchorElDepartmentFilter, setAnchorElDepartmentFilter] = useState<HTMLButtonElement | null>(null);
    const openDepartmentFilter = Boolean(anchorElDepartmentFilter);*/
    const nav = useNavigate();
    const role = DecodedJwt()?.role;
    const [openAddModal, setOpenAddModal] = useState(false)

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const { data: users, isLoading } = useQuery(
        ['users', page, rowsPerPage, roleFilter],
        () => UsersApi.get({page: page + 1, take: rowsPerPage, filters: {role: roleFilter}}),
        { refetchOnWindowFocus: false }
    );

    const columns = useMemo(() => {
        return [{id: 'name', name: 'ФИО пользователя', sorting: true, filter: false},
            { id: 'role', name: 'Должность', sorting: false, filter: true},
            {id: 'department', name: 'Комиссия', sorting: false, filter: true}]
    }, [])

    const getRole = (role: Role) => {
        switch (role) {
            case Role.Admin: return 'Заместитель';
            case Role.Member: return 'Член ПБ';
            case Role.Old: return 'Песок'
        }
    }

    return  <Box className={'content'} sx={{marginInline: '8%'}}>
        {role === Role.Admin && <Button size={'small'} variant={'contained'} color={'primary'}
                 sx={{width: '210px', marginBottom: '1rem', textAlign: 'right '}}
                 onClick={() => setOpenAddModal(true)}>Добавить пользователя</Button>}
        {isLoading ? (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <CircularProgress/>
        </Box>
        ) : <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center',}}>
            <TableContainer sx={{minWidth: '1024'}}>
                <Table stickyHeader aria-label="sticky table" size="small">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={'center'}
                                >
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        cursor: 'pointer',
                                        alignItems: 'center'
                                    }}>

                                        <Typography variant={'subtitle2'}>{column.name}</Typography>

                                        {column.filter && <Box sx={{position: 'relative'}}>
                                            <IconButton onClick={(event) => setAnchorElRoleFilter(event.currentTarget)}>
                                                <FilterListIcon color={'action'} fontSize={'small'}/>
                                            </IconButton>
                                        </Box>}
                                    </Box>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.data?.data
                            .map((row: UserData) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.name} sx={{
                                        "& .MuiTableRow-root:hover": {
                                            backgroundColor: "primary.light"
                                        },
                                    }}>
                                        <TableCell>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                gap: '3px',
                                                cursor: 'pointer'
                                            }} onClick={() => nav(`${RoutesName.User}${row.id}`)}>
                                                <Typography
                                                    variant={'subtitle1'}>{row.name}</Typography>
                                                <OpenInNewIcon fontSize={'small'} color={'primary'}/>
                                            </Box>
                                        </TableCell>
                                        <TableCell><Typography
                                            variant={'subtitle1'}>{getRole(row.role)}</Typography></TableCell>
                                        <TableCell align={'left'}><Typography
                                            variant={'subtitle1'}>{row.department.name}</Typography></TableCell>
                                        {/*<TableCell>

                                        </TableCell>*/}

                                    </TableRow>
                                )
                                    ;
                            })}
                    </TableBody>

                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[3, 5, 10, 25, 100]}
                count={users?.data?.meta.itemCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={'Количество строк на странице'}
                labelDisplayedRows={
                    ({from, to, count}) => {
                        return '' + from + '-' + to + ' из ' + count
                    }
                }
            />
        </Box>}
        <RolePopover
            anchorEl={anchorElRoleFilter}
            setAnchorEl={setAnchorElRoleFilter}
            open={openRoleFilter}
            role={roleFilter}
            setRole={setRoleFilter}
        />
        <AddUserModal open={openAddModal} setOpen={setOpenAddModal}/>
    </Box>
}