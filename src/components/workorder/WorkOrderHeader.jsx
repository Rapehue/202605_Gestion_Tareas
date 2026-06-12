import {
    ClipboardList
} from 'lucide-react';

import {
    Card,
    Input,
    Select
} from '@/components/ui';

import {
    WO_STATUS
} from '@/constants/workOrderStatus';

import {
    WO_PRIORITY
} from '@/constants/workOrderPriority';

import './WorkOrderHeader.css';

const WorkOrderHeader = ({
    form,
    onChange
}) => {

    return (

        <Card className="wo-form-card">

            <div className="wo-form-section-title">

                <ClipboardList size={18} />

                <span>
                    Identificación
                </span>

            </div>

            <div className="wo-fields-grid">

                <Input
                    label="Código"
                    placeholder="WO-2026-001"
                    value={form.codigo || ''}
                    onChange={(e) =>
                        onChange(
                            'codigo',
                            e.target.value
                        )
                    }
                />

                <Input
                    label="Proveedor"
                    placeholder="Proveedor"
                    value={form.proveedor || ''}
                    onChange={(e) =>
                        onChange(
                            'proveedor',
                            e.target.value
                        )
                    }
                />

                <Select
                    label="Estado"
                    value={form.estado || 'BORRADOR'}
                    onChange={(e) =>
                        onChange(
                            'estado',
                            e.target.value
                        )
                    }
                >

                    {
                        Object.values(
                            WO_STATUS
                        ).map(status => (

                            <option
                                key={status.value}
                                value={status.value}
                            >

                                {status.label}

                            </option>

                        ))
                    }

                </Select>

                <Select
                    label="Prioridad"
                    value={form.prioridad || 'MEDIA'}
                    onChange={(e) =>
                        onChange(
                            'prioridad',
                            e.target.value
                        )
                    }
                >

                    {
                        Object.values(
                            WO_PRIORITY
                        ).map(priority => (

                            <option
                                key={priority.value}
                                value={priority.value}
                            >

                                {priority.label}

                            </option>

                        ))
                    }

                </Select>

            </div>

        </Card>

    );

};

export default WorkOrderHeader;