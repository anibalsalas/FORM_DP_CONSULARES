package com.dp.ocmre.Report;

import java.util.ArrayList;
import java.util.List;

/**
 * Estructura de datos para reportes Excel.
 * Contiene:
 * - headers: nombres de columnas (fila inferior)
 * - qTitles: títulos agrupadores (fila superior)
 * - rows: datos de las filas
 */
public class ReportSheet {

    private List<String> headers = new ArrayList<>();
    private List<String> qTitles = new ArrayList<>();
    private List<List<String>> rows = new ArrayList<>();

    // ========== CONSTRUCTORES ==========
    
    public ReportSheet() {
    }

    public ReportSheet(List<String> headers, List<String> qTitles, List<List<String>> rows) {
        this.headers = headers;
        this.qTitles = qTitles;
        this.rows = rows;
    }

    // ========== GETTERS Y SETTERS ==========
    
    public List<String> getHeaders() {
        return headers;
    }

    public void setHeaders(List<String> headers) {
        this.headers = headers;
    }

    public List<String> getQTitles() {
        return qTitles;
    }

    public void setQTitles(List<String> qTitles) {
        this.qTitles = qTitles;
    }

    public List<List<String>> getRows() {
        return rows;
    }

    public void setRows(List<List<String>> rows) {
        this.rows = rows;
    }

    // ========== MÉTODOS AUXILIARES ==========
    
    public void addRow(List<String> row) {
        this.rows.add(row);
    }

    public int getRowCount() {
        return rows.size();
    }

    public int getColumnCount() {
        return headers.size();
    }

    public boolean isEmpty() {
        return rows.isEmpty();
    }

    // ========== TO STRING ==========
    
    @Override
    public String toString() {
        return "ReportSheet{" +
                "headers=" + headers.size() +
                ", qTitles=" + qTitles.size() +
                ", rows=" + rows.size() +
                '}';
    }
}
