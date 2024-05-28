import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  vigencia,
  resguardoInd,
  comunidadInd,
  nombres,
  apellidos,
  tipoDocumento,
  numeroDocumento,
  expDocumento,
  fechaNacimiento,
  parentesco,
  sexo,
  estadoCivil,
  profesion,
  escolaridad,
  integrantes,
  direccion,
  telefono,
  usuario,
  familiaId,
  handleClick,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={nombres} src="" />
            <Typography variant="subtitle2" noWrap>
              {nombres} {apellidos}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{tipoDocumento}</TableCell>
        <TableCell>{numeroDocumento}</TableCell>
        <TableCell>{expDocumento}</TableCell>
        <TableCell>{fechaNacimiento}</TableCell>
        <TableCell>{parentesco}</TableCell>
        <TableCell>{sexo}</TableCell>
        <TableCell>{estadoCivil}</TableCell>
        <TableCell>{profesion}</TableCell>
        <TableCell>{escolaridad}</TableCell>
        <TableCell>{integrantes}</TableCell>
        <TableCell>{direccion}</TableCell>
        <TableCell>{telefono}</TableCell>
        <TableCell>{usuario}</TableCell>
        <TableCell>{familiaId}</TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  vigencia: PropTypes.string,
  resguardoInd: PropTypes.number,
  comunidadInd: PropTypes.number,
  nombres: PropTypes.string,
  apellidos: PropTypes.string,
  tipoDocumento: PropTypes.string,
  numeroDocumento: PropTypes.number,
  expDocumento: PropTypes.string,
  fechaNacimiento: PropTypes.string,
  parentesco: PropTypes.string,
  sexo: PropTypes.string,
  estadoCivil: PropTypes.string,
  profesion: PropTypes.string,
  escolaridad: PropTypes.string,
  integrantes: PropTypes.number,
  direccion: PropTypes.string,
  telefono: PropTypes.string,
  usuario: PropTypes.string,
  familiaId: PropTypes.number,
  handleClick: PropTypes.func,
  selected: PropTypes.bool,
};
