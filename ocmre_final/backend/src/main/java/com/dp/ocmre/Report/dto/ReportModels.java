package com.dp.ocmre.Report.dto;

import java.util.*;

public class ReportModels {

    public static class ReportSheet {
        public String title;
        public List<ReportBlock> blocks = new ArrayList<>();
    }

    public static class ReportBlock {
        public String blockTitle;           // “1.1.1 Población peruana…”
        public List<String> header = List.of(); // Encabezados tabla (si aplica)
        public List<List<String>> rows = new ArrayList<>(); // Filas (si aplica)
        public List<ReportKV> kv = new ArrayList<>(); // Para pares clave/valor
    }

    public static class ReportKV {
        public String key;   // Etiqueta pregunta
        public String value; // Valor formateado
        public ReportKV(String k, String v){ this.key = k; this.value = v; }
    }

    private ReportModels() {}
}
