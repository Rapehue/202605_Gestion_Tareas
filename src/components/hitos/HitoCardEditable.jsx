import {
  Input,
  Select,
  CurrencyInput,
  DateInput
} from '@/components/forms';

import Badge from '@/components/ui/Badge';

import './HitoCardEditable.css';

const ESTADOS = [
  {
    value: 'EN_CURSO',
    label: 'En Curso'
  },
  {
    value: 'SOLICITADO_VB',
    label: 'VB Solicitado'
  },
  {
    value: 'CONCEDIDO_VB',
    label: 'VB Concedido'
  }
];

const HitoCardEditable = ({
  hito,
  index,
  onChange
}) => {

  const badgeVariant = {

    EN_CURSO: 'info',
    SOLICITADO_VB: 'warning',
    CONCEDIDO_VB: 'success'

  }[hito.estado] || 'default';

  return (

    <div className="hito-card">

      <div className="hito-card-header">

        <div className="hito-card-code">

          <Input
            label="Código"
            value={hito.codigo}
            onChange={(e) =>
              onChange(
                index,
                'codigo',
                e.target.value
              )
            }
          />

        </div>

        <Badge variant={badgeVariant}>
          {
            ESTADOS.find(
              e =>
                e.value === hito.estado
            )?.label
          }
        </Badge>

      </div>

      <div className="hito-card-description">

        <Input
          label="Descripción"
          value={hito.descripcion}
          onChange={(e) =>
            onChange(
              index,
              'descripcion',
              e.target.value
            )
          }
        />

      </div>

      <div className="hito-card-status-selector">

        <Select
          label="Estado"
          value={hito.estado}
          options={ESTADOS}
          onChange={(e) =>
            onChange(
              index,
              'estado',
              e.target.value
            )
          }
        />

      </div>

      <div className="hito-card-metrics">

        <Input
          label="% Facturación"
          type="number"
          value={hito.porcentaje}
          onChange={(e) =>
            onChange(
              index,
              'porcentaje',
              e.target.value
            )
          }
        />

        {/* <CurrencyInput
          label="Importe"
          value={hito.importe}
          onChange={(value) =>
            onChange(
              index,
              'importe',
              value
            )
          }
        /> */}

        <CurrencyInput
          label="Importe"
          value={hito.importe}
          onChange={(value) =>
            onChange(
              index,
              'importe',
              value
            )
          }
        />

      </div>

      <div className="hito-card-dates">

        <DateInput
          label="Solicitud VB"
          value={hito.fecha_solicitud_vb}
          onChange={(value) =>
            onChange(
              index,
              'fecha_solicitud_vb',
              value
            )
          }
        />

        <DateInput
          label="Concesión VB"
          value={hito.fecha_concesion_vb}
          onChange={(value) =>
            onChange(
              index,
              'fecha_concesion_vb',
              value
            )
          }
        />

      </div>

    </div>

  );

};

export default HitoCardEditable;