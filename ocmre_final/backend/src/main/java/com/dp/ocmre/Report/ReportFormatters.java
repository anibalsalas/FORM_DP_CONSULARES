package com.dp.ocmre.Report;


import java.text.SimpleDateFormat;
import java.util.Date;
import java.math.BigDecimal;

public final class ReportFormatters {
    private ReportFormatters() {}

    public static String sn(String v) {
        if ("S".equalsIgnoreCase(v)) return "Sí";
        if ("N".equalsIgnoreCase(v)) return "No";
        return "";
    }
    public static String boolSN(Boolean b) {
        if (b == null) return "";
        return b ? "Sí" : "No";
    }
    public static String dateDMY(Date d) {
        if (d == null) return "";
        return new SimpleDateFormat("dd/MM/yyyy").format(d);
    }
    public static String percent(BigDecimal p) {
        if (p == null) return "";
        return p.stripTrailingZeros().toPlainString() + " %";
    }
    public static String num(Integer n) { return n == null ? "" : String.valueOf(n); }
    public static String num(Long n)    { return n == null ? "" : String.valueOf(n); }
}
