import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('nombres');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/censo/');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.persona.nombres);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New User
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'vigencia', label: 'Vigencia' },
                  { id: 'resguardoInd', label: 'Resguardo' },
                  { id: 'comunidadInd', label: 'Comunidad' },
                  { id: 'nombres', label: 'Nombres' },
                  { id: 'apellidos', label: 'Apellidos' },
                  { id: 'tipoDocumento', label: 'Tipo Documento' },
                  { id: 'numeroDocumento', label: 'Número Documento' },
                  { id: 'expDocumento', label: 'Expedición Documento' },
                  { id: 'fechaNacimiento', label: 'Fecha Nacimiento' },
                  { id: 'parentesco', label: 'Parentesco' },
                  { id: 'sexo', label: 'Sexo' },
                  { id: 'estadoCivil', label: 'Estado Civil' },
                  { id: 'profesion', label: 'Profesión' },
                  { id: 'escolaridad', label: 'Escolaridad' },
                  { id: 'integrantes', label: 'Integrantes' },
                  { id: 'direccion', label: 'Dirección' },
                  { id: 'telefono', label: 'Teléfono' },
                  { id: 'usuario', label: 'Usuario' },
                  { id: 'familiaId', label: 'ID Familia' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.persona.id}
                      selected={selected.indexOf(row.persona.nombres) !== -1}
                      handleClick={(event) => handleClick(event, row.persona.nombres)}
                      vigencia={row.vigencia}
                      resguardoInd={row.resguardo_ind}
                      comunidadInd={row.comunidad_ind}
                      nombres={row.persona.nombres}
                      apellidos={row.persona.apellidos}
                      tipoDocumento={row.persona.tipo_documento}
                      numeroDocumento={row.persona.numero_documento}
                      expDocumento={row.persona.exp_documento}
                      fechaNacimiento={row.persona.fecha_nacimiento}
                      parentesco={row.persona.parentesco}
                      sexo={row.persona.sexo}
                      estadoCivil={row.persona.estado_civil}
                      profesion={row.persona.profesion}
                      escolaridad={row.persona.escolaridad}
                      integrantes={row.persona.integrantes}
                      direccion={row.persona.direccion}
                      telefono={row.persona.telefono}
                      usuario={row.persona.usuario}
                      familiaId={row.persona.familida_id}
                    />
                  ))}

                <TableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage, users.length)} />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
