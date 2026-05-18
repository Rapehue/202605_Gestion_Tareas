import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/HitosInlineTable.css';

const API = 'http://localhost:3000/api/hitos';

const HitosInlineTable = ({ workOrderId }) => {
    const [hitos, setHitos] = useState([]);

    // Funciones de cálculo mutadas para ser puras
    const calcTotalPorcentaje = (listaHitos) =>
        listaHitos.reduce((sum, h) => sum + Number(h.porcentaje || 0), 0);

    const calcTotalImporte = (listaHitos) =>
        listaHitos.reduce((sum, h) => sum + Number(h.importe || 0), 0);

    const calcConcedido = (listaHitos) =>
        listaHitos
            .filter(h => h.estado === 'CONCEDIDO_VB')
            .reduce((sum, h) => sum + Number(h.importe || 0), 0);

    // Las operaciones de lectura de variables deben ir después de sus funciones auxiliares
    const totalPorcentaje = calcTotalPorcentaje(hitos);
    const totalImporte = calcTotalImporte(hitos);
    const concedido = calcConcedido(hitos);
    const porcentajeExcedido = totalPorcentaje > 100;

    const load = async () => {
        if (!workOrderId) return;
        try {
            const res = await axios.get(`${API}/workorder/${workOrderId}`);
            setHitos(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.error("Error cargando hitos:", error);
        }
    };

    useEffect(() => {
        load();
    }, [workOrderId]);

    const updateField = async (id, field, value) => {
        const updated = hitos.map(h =>
            h.id === id ? { ...h, [field]: value } : h
        );

        const newTotal = calcTotalPorcentaje(updated);

        if (newTotal > 100) {
            alert('⚠ El total de porcentaje no puede superar 100%');
            return;
        }

        setHitos(updated);

        try {
            await axios.put(`${API}/${id}`, {
                [field]: value
            });
        } catch (error) {
            console.error("Error actualizando hito:", error);
        }
    };

    const createHito = async () => {
        try {
            const res = await axios.post(API, {
                id_work_order: workOrderId,
                codigo: `HITO-${hitos.length + 1}`,
                descripcion: '',
                porcentaje: 0,
                importe: 0,
                estado: 'EN_CURSO'
            });

            setHitos(prev => [...prev, res.data]);
        } catch (error) {
            console.error("Error creando hito:", error);
        }
    };

    return (
        <div className="hitos-container">
            <div className="hitos-summary">
                <span>
                    % Total: <strong>{totalPorcentaje}%</strong>
                </span>
                <span>
                    Importe total: <strong>{totalImporte} €</strong>
                </span>
                <span>
                    Concedido: <strong>{concedido} €</strong>
                </span>

                {porcentajeExcedido && (
                    <span className="warning">
                        ⚠ Exceso de porcentaje
                    </span>
                )}
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descripción</th>
                        <th>%</th>
                        <th>Importe</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {hitos.map(h => (
                        <tr key={h.id}>
                            <td>
                                <input
                                    value={h.codigo || ''}
                                    onChange={e => updateField(h.id, 'codigo', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    value={h.descripcion || ''}
                                    onChange={e => updateField(h.id, 'descripcion', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={h.porcentaje || 0}
                                    onChange={e => updateField(h.id, 'porcentaje', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={h.importe || 0}
                                    onChange={e => updateField(h.id, 'importe', e.target.value)}
                                />
                            </td>
                            <td>
                                <select
                                    value={h.estado || 'EN_CURSO'}
                                    onChange={e => updateField(h.id, 'estado', e.target.value)}
                                >
                                    <option value="EN_CURSO">En Curso</option>
                                    <option value="SOLICITADO_VB">Solicitado VB</option>
                                    <option value="CONCEDIDO_VB">Concedido VB</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 🔥 El botón ahora está fuera de la tabla, conservando el HTML semántico válido */}
            <div style={{ marginTop: 10 }}>
                <button
                    className="btn-primary"
                    onClick={createHito}
                >
                    + Añadir Hito
                </button>
            </div>
        </div>
    );
};

export default HitosInlineTable;