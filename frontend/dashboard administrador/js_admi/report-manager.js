import { DataManager } from './data-manager.js';
import { Toast } from './toast.js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export class ReportManager {
  static exportCSV() {
    try {
      if (DataManager.incidencias.length === 0) {
        Toast.show('No hay datos para exportar', 'warning');
        return;
      }

      const csvContent = [
        ['ID', 'Título', 'Estado', 'Técnico', 'Fecha', 'Descripción'],
        ...DataManager.incidencias.map(inc => {
          const tecnico = DataManager.getTecnicoById(inc.tecnico);
          return [
            inc.id,
            `"${inc.titulo.replace(/"/g, '""')}"`,
            inc.estado,
            tecnico?.nombre || 'Sin asignar',
            inc.fecha.toISOString(),
            `"${(inc.descripcion || '').replace(/"/g, '""')}"`
          ];
        })
      ].map(row => row.join(',')).join('\n');

      const blob = new Blob(["\ufeff", csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const filename = `reporte-${new Date().toISOString().slice(0,10)}.csv`;
      
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      URL.revokeObjectURL(link.href);
      
      Toast.show(`Reporte ${filename} generado`, 'success');
    } catch (error) {
      console.error('Error exportando CSV:', error);
      Toast.show('Error al generar el CSV', 'error');
    }
  }

  static generatePDF() {
    try {
      if (DataManager.incidencias.length === 0) {
        Toast.show('No hay datos para generar PDF', 'warning');
        return;
      }

      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Encabezado
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('Reporte de Incidencias', 14, 20);
      
      // Subtítulo
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Generado: ${new Date().toLocaleDateString('es-ES')}`, 14, 28);

      // Configuración de la tabla
      const headers = [['ID', 'Título', 'Estado', 'Técnico', 'Fecha']];
      const body = DataManager.incidencias.map(inc => {
        const tecnico = DataManager.getTecnicoById(inc.tecnico);
        return [
          inc.id,
          inc.titulo,
          this._formatEstado(inc.estado),
          tecnico?.nombre || 'Sin asignar',
          inc.fecha.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })
        ];
      });

      // Generar tabla
      doc.autoTable({
        head: headers,
        body: body,
        startY: 35,
        styles: { 
          fontSize: 10,
          cellPadding: 3,
          halign: 'left'
        },
        headStyles: {
          fillColor: [44, 62, 80],
          textColor: 255,
          fontStyle: 'bold'
        },
        columnStyles: {
          0: { cellWidth: 25 },
          1: { cellWidth: 45 },
          2: { cellWidth: 30 },
          3: { cellWidth: 45 },
          4: { cellWidth: 25 }
        }
      });

      // Guardar PDF
      const filename = `reporte-${new Date().toISOString().slice(0,10)}.pdf`;
      doc.save(filename);
      Toast.show(`Reporte ${filename} generado`, 'success');
    } catch (error) {
      console.error('Error generando PDF:', error);
      Toast.show('Error al generar el PDF', 'error');
    }
  }

  static _formatEstado(estado) {
    const estados = {
      recibida: 'RECIBIDA',
      en_proceso: 'EN PROCESO',
      cerrada: 'CERRADA'
    };
    return estados[estado] || estado.toUpperCase();
  }
}