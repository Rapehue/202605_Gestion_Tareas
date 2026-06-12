import {
  FileText,
  Send,
  CheckCircle,
  CalendarClock,
  PlayCircle,
  ClipboardCheck,
  CheckCheck,
  XCircle
} from 'lucide-react';

export const WO_STATUS = {

  BORRADOR: {
    value: 'BORRADOR',
    label: 'Borrador',
    variant: 'neutral',
    icon: FileText,
    order: 1,
    next: ['ENVIADA']
  },

  ENVIADA: {
    value: 'ENVIADA',
    label: 'Enviada',
    variant: 'info',
    icon: Send,
    order: 2,
    next: [
      'APROBADA',
      'RECHAZADA'
    ]
  },

  APROBADA: {
    value: 'APROBADA',
    label: 'Aprobada',
    variant: 'success',
    icon: CheckCircle,
    order: 3,
    next: [
      'PLANIFICADA'
    ]
  },

  PLANIFICADA: {
    value: 'PLANIFICADA',
    label: 'Planificada',
    variant: 'primary',
    icon: CalendarClock,
    order: 4,
    next: [
      'EN_CURSO'
    ]
  },

  EN_CURSO: {
    value: 'EN_CURSO',
    label: 'En Curso',
    variant: 'warning',
    icon: PlayCircle,
    order: 5,
    next: [
      'EN_VALIDACION'
    ]
  },

  EN_VALIDACION: {
    value: 'EN_VALIDACION',
    label: 'En Validación',
    variant: 'warning',
    icon: ClipboardCheck,
    order: 6,
    next: [
      'FINALIZADA'
    ]
  },

  FINALIZADA: {
    value: 'FINALIZADA',
    label: 'Finalizada',
    variant: 'success',
    icon: CheckCheck,
    order: 7
  },

  RECHAZADA: {
    value: 'RECHAZADA',
    label: 'Rechazada',
    variant: 'danger',
    icon: XCircle,
    order: 99
  }

};