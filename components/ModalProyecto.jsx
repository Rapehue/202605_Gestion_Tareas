import React, { useState } from 'react';
import { 
  Button, Dialog, DialogActions, DialogContent, DialogTitle, 
  TextField, MenuItem, Grid, Typography, Divider, Box 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const ModalProyecto = ({ usuarios, alGuardar }) => {
  const [open, setOpen] = useState(false);
  const [proyecto, setProyecto] = useState({
    codigo: '', nombre: '', plan: '', eje: '', iniciativa: '', subiniciativa: '',
    id_usuario_gestor: '', id_usuario_peticionario: '', id_usuario_product_Owner: '',
    id_usuario_proxy: '', id_usuario_LiderD: '', id_usuario_LiderV: '',
    fecha_inicio: '', fecha_fin: '', objetivos: ''
  });

  const handleChange = (e) => setProyecto({ ...proyecto, [e.target.name]: e.target.value });

  const enviarFormulario = async () => {
    try {
      await axios.post('http://localhost:5000/api/proyectos', proyecto);
      setOpen(false);
      alGuardar();
    } catch (error) { console.error(error); alert("Error al guardar."); }
  };

  // Subcomponente para los títulos de sección (para asegurar consistencia)
  const SectionHeader = ({ title }) => (
    <Grid item xs={12}>
      <Box sx={{ mt: 2, mb: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#1976d2', letterSpacing: 1 }}>
          {title}
        </Typography>
        <Divider sx={{ mb: 2 }} />
      </Box>
    </Grid>
  );

  return (
    <>
      <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
        Nuevo Proyecto
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Registro de Proyecto</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            
            {/* SECCIÓN 1 */}
            <SectionHeader title="1. INFORMACIÓN IDENTIFICATIVA" />
            <Grid item xs={12} sm={4}>
              <TextField name="codigo" label="Código del Proyecto" fullWidth onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField name="nombre" label="Nombre Completo del Proyecto" fullWidth onChange={handleChange} />
            </Grid>

            {/* SECCIÓN 2 */}
            <SectionHeader title="2. CLASIFICACIÓN ESTRATÉGICA" />
            <Grid item xs={12} sm={6} md={3}><TextField name="plan" label="Plan" fullWidth onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={6} md={3}><TextField name="eje" label="Eje" fullWidth onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={6} md={3}><TextField name="iniciativa" label="Iniciativa" fullWidth onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={6} md={3}><TextField name="subiniciativa" label="Subiniciativa" fullWidth onChange={handleChange} /></Grid>

            {/* SECCIÓN 3: INTERVINIENTES (Ocupan media fila cada uno para nombres largos) */}
            <SectionHeader title="3. EQUIPO E INTERVINIENTES" />
            {[
              { name: 'id_usuario_gestor', label: 'Gestor del Proyecto' },
              { name: 'id_usuario_peticionario', label: 'Peticionario' },
              { name: 'id_usuario_product_Owner', label: 'Product Owner' },
              { name: 'id_usuario_proxy', label: 'Proxy PO' },
              { name: 'id_usuario_LiderD', label: 'Líder Desarrollo' },
              { name: 'id_usuario_LiderV', label: 'Líder Ventas/Negocio' }
            ].map((rol) => (
              <Grid item xs={12} sm={6} key={rol.name}>
                <TextField 
                  select name={rol.name} label={rol.label} fullWidth 
                  value={proyecto[rol.name]} onChange={handleChange}
                >
                  {usuarios.map(u => (
                    <MenuItem key={u.id} value={u.id}>{u.nombre_completo}</MenuItem>
                  ))}
                </TextField>
              </Grid>
            ))}

            {/* SECCIÓN 4 */}
            <SectionHeader title="4. PLANIFICACIÓN Y OBJETIVOS" />
            <Grid item xs={12} sm={6}>
              <TextField 
                name="fecha_inicio" label="Fecha Inicio" type="date" fullWidth 
                InputLabelProps={{ shrink: true }} onChange={handleChange} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                name="fecha_fin" label="Fecha Estimada Fin" type="date" fullWidth 
                InputLabelProps={{ shrink: true }} onChange={handleChange} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                name="objetivos" label="Objetivos del Proyecto" multiline rows={3} fullWidth 
                onChange={handleChange} 
              />
            </Grid>

          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setOpen(false)} color="inherit" sx={{ fontWeight: 'bold' }}>CANCELAR</Button>
          <Button onClick={enviarFormulario} variant="contained" sx={{ px: 4, fontWeight: 'bold' }}>
            GUARDAR PROYECTO
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalProyecto;