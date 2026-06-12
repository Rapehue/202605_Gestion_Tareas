import {
    CalendarDays,
    Timer
} from 'lucide-react';

import {
    Card,
    Input
} from '@/components/ui';

import { calculateWorkingDays } from '@/utils/date';

import './WorkOrderPlanningSection.css';

const WorkOrderPlanningSection = ({
    form,
    onChange
}) => {

    return (

        <Card className="wo-form-card">

            <div className="wo-form-section-title">

                <CalendarDays size={18} />

                <span>
                    Planificación
                </span>

            </div>

            <div className="wo-planning-grid">

                <Input
                    label="Fecha inicio"
                    type="date"
                    value={form.fechaInicio || ''}
                    onChange={(e) =>
                        onChange(
                            'fechaInicio',
                            e.target.value
                        )
                    }
                />

                <Input
                    label="Fecha fin"
                    type="date"
                    value={form.fechaFin || ''}
                    onChange={(e) =>
                        onChange(
                            'fechaFin',
                            e.target.value
                        )
                    }
                />

                <Input
                    label="Jornadas estimadas"
                    type="number"
                    min="0"
                    step="0.5"
                    value={form.jornadas || ''}
                    onChange={(e) =>
                        onChange(
                            'jornadas',
                            e.target.value
                        )
                    }
                />

            </div>

            {
                form.fechaInicio &&
                form.fechaFin && (

                    <div className="wo-planning-summary">

                        <Timer size={16} />

                        <span>

                            Duración prevista:{' '}

                            <strong>

                                {
                                    calculateWorkingDays(
                                        form.fechaInicio,
                                        form.fechaFin
                                    )
                                }

                                {' '}días laborables

                            </strong>

                        </span>

                    </div>

                )
            }

        </Card>

    );

};

export default WorkOrderPlanningSection;