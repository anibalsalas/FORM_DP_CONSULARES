package com.dp.ocmre.Report.sections;

import com.dp.ocmre.Report.dto.ReportModels.ReportBlock;
import com.dp.ocmre.Report.dto.ReportModels.ReportSheet;
import com.dp.ocmre.entity.ficha1.Ficha1Sec2Entity;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


@Component
public class Seccion2ReportBuilder {

    public ReportSheet buildGlobalSheet(List<Ficha1Sec2Entity> items, String tituloHoja) {

        ReportSheet sheet = new ReportSheet();
        sheet.title = (tituloHoja == null || tituloHoja.isBlank())
                ? "Sección 2 – Consolidado"
                : tituloHoja;

        ReportBlock block = new ReportBlock();
        block.blockTitle = "Sección 2 (Protección legal y Asistencia humanitaria)";

        block.header = new ArrayList<>();

        // META
        Collections.addAll(block.header, "ID_FICHA", "USUARIO_REGISTRO");

        // 2.1.1 - 2.1.5: Asesor legal
        Collections.addAll(block.header,
                "2.1.1 Cuenta con asesor/a legal (S/N)",
                "2.1.2 N° de asesor(a/es)"
        );

        // 2.1.3 Nacionalidad
        Collections.addAll(block.header,
                "2.1.3 Nacionalidad PERUANA – Cantidad",
                "2.1.3 Nacionalidad EXTRANJERA – Cantidad",
                "2.1.3 Nacionalidad EXTRANJERA – Detalle"
        );

        Collections.addAll(block.header,
                "2.1.4 Su labor es (R=Remunerada, A=Ad honorem)",
                "2.1.5 Registro digitalizado (S= Sí / N = No)",
                "2.1.5 Si NO – Especifique (E=Excel, M=Manual, X=No necesario)"
        );

        // Orientaciones por año (2022-2025)
        String[] years = {"2022", "2023", "2024", "2025"};
        for (String y : years) {
            Collections.addAll(block.header,
                    "Orientaciones " + y + " – N° HOMBRES",
                    "Orientaciones " + y + " – Hombres con discapacidad",
                    "Orientaciones " + y + " – N° MUJERES",
                    "Orientaciones " + y + " – Mujeres con discapacidad"
            );
        }

        // Temáticas por año (2022-2025)
        String[] temas = {
                "Laboral",
                "Pensión",
                "Civil",
                "Administrativo",
                "Familia",
                "Penal",
                "Migratorio",
                "Otro"
        };
        for (String y : years) {
            for (String t : temas) {
                block.header.add("Temática " + y + " – " + t + " – N° asesorías");
            }
        }

        // Intervenciones Mayores/Menores por año (2022-2025)
        for (String y : years) {
            Collections.addAll(block.header,
                    y + " – Mayores detenidos – Hombres",
                    y + " – Mayores detenidos – Hombres con discapacidad",
                    y + " – Mayores detenidos – Mujeres",
                    y + " – Mayores detenidos – Mujeres con discapacidad",
                    y + " – Menores retenidos/detenidos – Hombres",
                    y + " – Menores retenidos/detenidos – Hombres con discapacidad",
                    y + " – Menores retenidos/detenidos – Mujeres",
                    y + " – Menores retenidos/detenidos – Mujeres con discapacidad"
            );
        }

        // Tipos de intervención por año (2022-2025)
        String[] tiposIntervencion = {
                "Visitas a centros de detención",
                "Contacto con autoridades locales",
                "Facilitar comunicación con familia",
                "Proporcionar información legal",
                "Coordinar asistencia consular",
                "Seguimiento de casos",
                "Orientación sobre proceso legal",
                "Derivación a servicios especializados",
                "Otro"
        };
        for (String y : years) {
            for (String tipo : tiposIntervencion) {
                block.header.add("Tipo intervención " + y + " – " + tipo + " – N° casos");
            }
        }

        // 2.1.6-2.1.17: TRATA DE PERSONAS (TP)
        for (String y : years) {
            Collections.addAll(block.header,
                    "2.1.6 TP " + y + " – N° orientados",
                    "2.1.6 TP " + y + " – N° asistidos"
            );
        }
        Collections.addAll(block.header,
                "2.1.7 TP – Protocolo (S/N)",
                "2.1.7 TP – Flujograma (S/N)",
                "2.1.8 TP – Flujo fuera horario laboral (S/N)",
                "2.1.9 TP – Líneas emergencia (S/N)",
                "2.1.10 TP – Apoyo psicológico (S/N)"
        );

         String[] canalesTP11 = {"Presencial","Llamada","Videollamada"};
        String[] canalesTP = {"Presencial","Telefónico","Correo electrónico","Redes sociales","Página web","Otro"};
        for (String canal : canalesTP11) block.header.add("2.1.11 TP – Canal " + canal + " (S/N)");

        Collections.addAll(block.header,
                "2.1.12 TP – Coordina con ONG (S/N)",
                "2.1.12 TP – Entidad #1",
                "2.1.12 TP – Entidad #2",
                "2.1.12 TP – Entidad #3"
        );

        String[] canalesInfoTP = {"Folletos/Brochures","Página web","Redes sociales","Línea telefónica","Correo electrónico","Charlas/Talleres","Otro"};
        for (String c : canalesInfoTP) block.header.add("2.1.13 TP – Canal info " + c + " (S/N)");

        

        String[] entidadesTP = {"Policía Nacional","Ministerio Público","INTERPOL","Poder Judicial","ONG/Organismo","Otros"};
        for (String e : entidadesTP) block.header.add("2.1.14 TP – Coordina con " + e + " (S/N)");
        block.header.add("2.1.14 TP – Otros detalle");

        addMatrizNecesidades(block.header, "2.1.15 TP");
        block.header.add("2.1.16 TP – Personal recibe capacitaciones (S/N)");
        addInstitucionesCapacitacion(block.header, "2.1.17 TP");

        // 2.1.18-2.1.30: VIOLENCIA DE GÉNERO (VG)
        for (String y : years) {
            Collections.addAll(block.header,
                    "2.1.18 VG " + y + " – ¿Orientado? (S/N)",
                    "2.1.18 VG " + y + " – ¿Asistido? (S/N)",
                    "2.1.18 VG " + y + " – N° casos"
            );
        }
        Collections.addAll(block.header,
                "2.1.19 VG – Protocolo (S/N)",
                "2.1.19 VG – Flujograma (S/N)",
                "2.1.20 VG – Flujo fuera horario (S/N)",
                "2.1.21 VG – Líneas emergencia (S/N)",
                "2.1.22 VG – Apoyo psicológico (S/N)"
        );

        String[] canalesTP23 = {"Presencial","Llamada","Videollamada"};
        String[] canalesVG = {"Presencial","Telefónico","Correo electrónico","Redes sociales","Página web","Otro"};
        for (String canal : canalesTP23) block.header.add("2.1.23 VG – Canal " + canal + " (S/N)");

        Collections.addAll(block.header,
                "2.1.24 VG – Coordina con ONG (S/N)",
                "2.1.25 VG – Entidad #1",
                "2.1.25 VG – Entidad #2",
                "2.1.25 VG – Entidad #3"
        );

        String[] canalesInfoVG = {"Folletos/Brochures","Página web","Redes sociales","Línea telefónica","Correo electrónico","Charlas/Talleres","Otro"};
        for (String c : canalesInfoVG) block.header.add("2.1.26 VG – Canal info " + c + " (S/N)");
       

        String[] entidadesVG = {"Policía Nacional","Ministerio Público","INTERPOL","Poder Judicial","Organización","Otros"};
        for (String e : entidadesVG) block.header.add("2.1.27 VG – Coordina con " + e + " (S/N)");
        block.header.add("2.1.27 VG – Otros detalle");

        addMatrizNecesidades(block.header, "2.1.28 VG");
        block.header.add("2.1.29 VG – Personal recibe capacitaciones (S/N)");
        addInstitucionesCapacitacion(block.header, "2.1.30 VG");

        // 2.1.31-2.1.41: DDE
        for (String y : years) {
            Collections.addAll(block.header,
                    "2.1.31 DDE " + y + " – N° atenciones",
                    "2.1.31 DDE " + y + " – Detenciones",
                    "2.1.31 DDE " + y + " – Deportación",
                    "2.1.31 DDE " + y + " – Expulsión"
            );
        }
        Collections.addAll(block.header,
                "2.1.32 DDE – Protocolo (S/N)",
                "2.1.32 DDE – Flujograma (S/N)",
                "2.1.33 DDE – Flujo fuera horario (S/N)",
                "2.1.34 DDE – Líneas emergencia (S/N)"
        );

         String[] canalesTP35 = {"Presencial","Llamada","Videollamada"};
        String[] canalesDDE = {"Presencial","Telefónico","Correo electrónico","Redes sociales","Página web","Otro"};
        for (String canal : canalesTP35) block.header.add("2.1.35 DDE – Canal " + canal + " (S/N)");

        block.header.add("2.1.36 DDE – Coordina emergencia médica (S/N)");

        String[] canalesInfo2DDE = {"Folletos/Brochures","Página web","Redes sociales","Línea telefónica","Correo electrónico","Charlas/Talleres","Otro"};
        for (String c : canalesInfo2DDE) block.header.add("2.1.37 DDE – Canal info " + c + " (S/N)");


        String[] entidadesDDE = {"Policía Nacional","Ministerio Público","INTERPOL","Poder Judicial","Organismo","Otros"};
        for (String e : entidadesDDE) block.header.add("2.1.38 DDE – Coordina con " + e + " (S/N)");
        block.header.add("2.1.38 DDE – Otros detalle");

        addMatrizNecesidades(block.header, "2.1.39 DDE");
        block.header.add("2.1.40 DDE – Personal recibe capacitaciones (S/N)");
        addInstitucionesCapacitacion(block.header, "2.1.41 DDE");

        // 2.2 ASISTENCIA HUMANITARIA
        Collections.addAll(block.header,
                "2.2.1 Registro digitalizado asistencia (S/N)",
                "2.2.1 Si NO – Especifique (A=Excel, B=Manual, C=No necesario)",
                "2.2.2 % presupuesto asistencia humanitaria"
        );

        String[] yearsAH = {"2023", "2024", "2025"};
        String[] eventos = {"N° peruanos fallecidos","N° traslado restos mortales","N° cremaciones realizadas"};
        for (String ev : eventos) for (String y : yearsAH) block.header.add("2.2.3 " + ev + " – " + y);

        String[] tiposAyuda = {
                "Ayuda alimentaria y artículos de primera necesidad",
                "Alojamiento temporal",
                "Apoyo económico para pasajes de retorno"
        };
        for (String tipo : tiposAyuda) {
            for (String y : yearsAH) {
                Collections.addAll(block.header,
                        "2.2." + (tiposAyuda[0].equals(tipo) ? "4" : tiposAyuda[1].equals(tipo) ? "5" : "6") + " " + tipo + " " + y + " – N° casos",
                        "2.2." + (tiposAyuda[0].equals(tipo) ? "4" : tiposAyuda[1].equals(tipo) ? "5" : "6") + " " + tipo + " " + y + " – Ayuda material",
                        "2.2." + (tiposAyuda[0].equals(tipo) ? "4" : tiposAyuda[1].equals(tipo) ? "5" : "6") + " " + tipo + " " + y + " – Ayuda económica"
                );
            }
        }

        String[] indicadores = {
                "N° personas atendidas por situación vulnerabilidad",
                "N° casos remitidos otras instituciones",
                "N° personas beneficiadas programas retorno voluntario"
        };
        for (String ind : indicadores) {
            String numSeccion = indicadores[0].equals(ind) ? "7" : indicadores[1].equals(ind) ? "8" : "9";
            for (String y : yearsAH) block.header.add("2.2." + numSeccion + " " + ind + " – " + y);
        }

        addMatrizNecesidades(block.header, "2.2.10 AH");
        block.header.add("2.2.11 AH – Personal recibe capacitaciones (S/N)");
        addInstitucionesCapacitacion(block.header, "2.2.12 AH");

        // FILAS
        block.rows = new ArrayList<>();

        if (items != null) {
            for (Ficha1Sec2Entity e : items) {
                List<String> row = new ArrayList<>();

                // META
                row.add(val(e.getIdFicha()));
                row.add(val(tryUser(e)));

                // 2.1.1 - 2.1.5
                row.add(flagSN(e.getP211OfiConsular()));
                row.add(val(e.getP212NumAsesor()));
                row.add(val(e.getP213PeruanaCantidad()));
                row.add(val(e.getP213ExtranjeraCantidad()));
                row.add(val(e.getP213ExtranjeraDetalle()));
                row.add(val(e.getP214Labor()));
                row.add(flagSN(e.getP215OrganoLinea()));
                row.add(val(e.getP215Especifique()));

                // Orientaciones por año (2022-2025)
                // 2022 (no existe en entidad)
                row.add(""); row.add(""); row.add(""); row.add("");
                // 2023
                row.add(val(e.getP22023Hombre()));
                row.add(val(e.getP22023HombreDisca()));
                row.add(val(e.getP22023Mujer()));
                row.add(val(e.getP22023MujerDisca()));
                // 2024
                row.add(val(e.getP22024Hombre()));
                row.add(val(e.getP22024HombreDisca()));
                row.add(val(e.getP22024Mujer()));
                row.add(val(e.getP22024MujerDisca()));
                // 2025
                row.add(val(e.getP22025Hombre()));
                row.add(val(e.getP22025HombreDisca()));
                row.add(val(e.getP22025Mujer()));
                row.add(val(e.getP22025MujerDisca()));

                // Temáticas por año
                // 2022 (no existe en entidad)
                for (int i = 0; i < 8; i++) row.add("");
                // 2023 (Laboral, Pensión, Civil, Administrativo, Familia, Penal, Migratorio, Otro)
                row.add(val(e.getP22023LaboralNum()));
                row.add(""); // Pensión
                row.add(val(e.getP22023CivilNum()));
                row.add(""); // Administrativo
                row.add(val(e.getP22023FamiliaNum()));
                row.add(val(e.getP22023PenalNum()));
                row.add(val(e.getP22023MigratoriaNum()));
                row.add(""); // Otro
                // 2024
                row.add(val(e.getP22024LaboralNum()));
                row.add("");
                row.add(val(e.getP22024CivilNum()));
                row.add("");
                row.add(val(e.getP22024FamiliaNum()));
                row.add(val(e.getP22024PenalNum()));
                row.add(val(e.getP22024MigratoriaNum()));
                row.add("");
                // 2025
                row.add(val(e.getP22025LaboralNum()));
                row.add("");
                row.add(val(e.getP22025CivilNum()));
                row.add("");
                row.add(val(e.getP22025FamiliaNum()));
                row.add(val(e.getP22025PenalNum()));
                row.add(val(e.getP22025MigratoriaNum()));
                row.add("");

                // Intervenciones Mayores/Menores por año
                // 2022 (no existe)
                for (int i = 0; i < 8; i++) row.add("");
                // 2023
                row.add(val(e.getP22023MayorHombre()));
                row.add(val(e.getP22023MayorHombreDisca()));
                row.add(val(e.getP22023MayorMujer()));
                row.add(val(e.getP22023MayorMujerDisca()));
                row.add(val(e.getP22023MenorHombre()));
                row.add(val(e.getP22023MenorHombreDisca()));
                row.add(val(e.getP22023MenorMujer()));
                row.add(val(e.getP22023MenorMujerDisca()));
                // 2024
                row.add(val(e.getP22024MayorHombre()));
                row.add(val(e.getP22024MayorHombreDisca()));
                row.add(val(e.getP22024MayorMujer()));
                row.add(val(e.getP22024MayorMujerDisca()));
                row.add(val(e.getP22024MenorHombre()));
                row.add(val(e.getP22024MenorHombreDisca()));
                row.add(val(e.getP22024MenorMujer()));
                row.add(val(e.getP22024MenorMujerDisca()));
                // 2025
                row.add(val(e.getP22025MayorHombre()));
                row.add(val(e.getP22025MayorHombreDisca()));
                row.add(val(e.getP22025MayorMujer()));
                row.add(val(e.getP22025MayorMujerDisca()));
                row.add(val(e.getP22025MenorHombre()));
                row.add(val(e.getP22025MenorHombreDisca()));
                row.add(val(e.getP22025MenorMujer()));
                row.add(val(e.getP22025MenorMujerDisca()));

                // Tipos de intervención por año
                // 2022
                for (int i = 0; i < 9; i++) row.add("");
                // 2023 (no hay equivalentes directos a los 9 tipos definidos)
                for (int i = 0; i < 9; i++) row.add("");
                // 2024
                for (int i = 0; i < 9; i++) row.add("");
                // 2025
                for (int i = 0; i < 9; i++) row.add("");

                // TRATA DE PERSONAS (TP) 2.1.6
                // 2022 (no existe)
                row.add(""); row.add("");
                // 2023
                row.add(val(e.getP2162023Orientado()));
                row.add(val(e.getP2162023Asistio()));
                // 2024
                row.add(val(e.getP2162024Orientado()));
                row.add(val(e.getP2162024Asistio()));
                // 2025
                row.add(val(e.getP2162025Orientado()));
                row.add(val(e.getP2162025Asistio()));

                // 2.1.7 - 2.1.14
                row.add(flagSN(e.getP217Protocolo()));
                row.add(flagSN(e.getP217Flujograma()));
                row.add(flagSN(e.getP218Protocolo()));
                row.add(flagSN(e.getP219Emergencia()));
                row.add(flagSN(e.getP2110Psicologico()));

                // 2.1.11 Canales acceso TP
                row.add(flagSN(e.getP2111Presencial()));
                row.add(flagSN(e.getP2111Llamada()));
                row.add(flagSN(e.getP2111Videolla()));
                row.add(""); // Redes sociales
                row.add(""); // Página web
                row.add(""); // Otro



                // 2.1.12 ONG
                row.add(flagSN(e.getP2112Ong()));
                row.add(val(e.getP21121()));
                row.add(val(e.getP21122()));
                row.add(val(e.getP21123()));

                // 2.1.13 Canales información TP (no equivalentes 1:1)
                for (int i = 0; i < 7; i++) row.add("");

                // 2.1.14 Coordinación entidades TP
                row.add(flagSN(e.getP2114Policia()));
                row.add(flagSN(e.getP2114MinPublico()));
                row.add(flagSN(e.getP2114PoderJudicial()));
                row.add(flagSN(e.getP2114Organismo())); 
                row.add(""); // MIMP
                row.add(""); // ONG especializadas
                row.add(flagSN(e.getP2114Otros()));
                row.add(val(e.getP2114OtrosDetalle()));

                // 2.1.15 MATRIZ Necesidades TP
                addFilaMatrizNecesidades(row, e, "TP");

                // 2.1.16 - 2.1.17 Capacitaciones TP
                row.add(flagSN(e.getP2116PersonalConsul()));
                addFilaInstitucionesCapacitacion(row, e, "TP");

                // VIOLENCIA DE GÉNERO (VG)
                // 2.1.18 Orientado/Asistido por año
                // 2022
                row.add(""); row.add(""); row.add("");
                // 2023
                row.add(flagSN(e.getP21182023Orientado()));
                row.add(flagSN(e.getP21182023Asistido()));
                row.add(val(e.getP21182023NumCasos()));
                // 2024
                row.add(flagSN(e.getP21182024Orientado()));
                row.add(flagSN(e.getP21182024Asistido()));
                row.add(val(e.getP21182024NumCasos()));
                // 2025
                row.add(flagSN(e.getP21182025Orientado()));
                row.add(flagSN(e.getP21182025Asistido()));
                row.add(val(e.getP21182025NumCasos()));

                // 2.1.19 - 2.1.23
                row.add(flagSN(e.getP2119Oficina()));
                row.add(flagSN(e.getP2119Flojograma()));
                row.add(flagSN(e.getP2120Protocolo()));
                row.add(flagSN(e.getP2121Violencia()));
                row.add(flagSN(e.getP2122Apoyo()));

                // 2.1.23 Canales acceso VG
                row.add(flagSN(e.getP2123Presencial()));
                row.add(flagSN(e.getP2123Telefono()));
                row.add(flagSN(e.getP2123Videollama()));
                row.add(""); // Redes sociales
                row.add(""); // Página web
                row.add(""); // Otro

                // 2.1.24 - 2.1.25 ONG
                row.add(flagSN(e.getP2124Ong()));
                row.add(val(e.getP2125Entidad1()));
                row.add(val(e.getP2125Entidad2()));
                row.add(val(e.getP2125Entidad3()));

                // 2.1.26 Canales info VG (no equivalentes 1:1)
                for (int i = 0; i < 7; i++) row.add("");



 

                // 2.1.27 Coordinación entidades VG
                row.add(flagSN(e.getP2127Policia()));
                row.add(flagSN(e.getP2127MinPublico()));
                row.add(flagSN(e.getP2127PoderJudicial()));
                 row.add(flagSN(e.getP2127Organizacion()));
                row.add(""); // Defensoría del Pueblo
                row.add(""); // MIMP
                row.add(""); // ONG especializadas
                row.add(flagSN(e.getP2127Otros()));
                row.add(val(e.getP2127OtrosDetallar()));

                // 2.1.28 MATRIZ Necesidades VG
                addFilaMatrizNecesidades(row, e, "VG");

                // 2.1.29 - 2.1.30 Capacitaciones VG
                row.add(flagSN(e.getP2129RecibePersonal()));
                addFilaInstitucionesCapacitacion(row, e, "VG");

                // DDE
                // 2.1.31 Por año (2023-2025)
                // 2022
                row.add(""); row.add(""); row.add(""); row.add("");
                // 2023
                row.add(val(e.getP21312023NumAnio()));
                row.add(val(e.getP21312023Detenciones()));
                row.add(val(e.getP21312023Deportacion()));
                row.add(val(e.getP21312023Expulsion()));
                // 2024
                row.add(val(e.getP21312024NumAnio()));
                row.add(val(e.getP21312024Detenciones()));
                row.add(val(e.getP21312024Deportacion()));
                row.add(val(e.getP21312024Expulsion()));
                // 2025
                row.add(val(e.getP21312025NumAnio()));
                row.add(val(e.getP21312025Detenciones()));
                row.add(val(e.getP21312025Deportacion()));
                row.add(val(e.getP21312025Expulsion()));

                // 2.1.32 - 2.1.35
                row.add(flagSN(e.getP2132OfiConsular()));
                row.add(flagSN(e.getP2132Flujograma()));
                row.add(flagSN(e.getP2133Protocolo()));
                row.add(flagSN(e.getP2134Existen()));

                // 2.1.35 Canales acceso DDE
                row.add(flagSN(e.getP2135Presencial()));
                row.add(flagSN(e.getP2135Llamada()));
                row.add(flagSN(e.getP2135Videolla()));
                row.add(""); // Redes
                row.add(""); // Página web
                row.add(""); // Otro

                // 2.1.36 - 2.1.37
                row.add(flagSN(e.getP2136Coordina()));

                // 2.1.37 Canales información DDE
                row.add(flagSN(e.getP2137Presecnial()));
                row.add(flagSN(e.getP2137Telefono()));
                row.add(flagSN(e.getP2137Whatsapp()));
                row.add(flagSN(e.getP2137Virtual()));
                row.add(flagSN(e.getP2137Facebook()));
                row.add(flagSN(e.getP2137CuentaX()));
                row.add(flagSN(e.getP2137Correo()));

                // 2.1.38 Coordinación entidades DDE
                row.add(flagSN(e.getP2138Policia()));
                row.add(flagSN(e.getP2138MinPublico()));
                row.add(flagSN(e.getP2138PoderJudicial()));
                row.add(flagSN(e.getP2138Organismo()));
                row.add(""); // Defensoría del Pueblo
                row.add(""); // ONG especializadas
                row.add(flagSN(e.getP2138Otros()));
                row.add(val(e.getP2138OtrosDetalle()));




                // 2.1.39 MATRIZ Necesidades DDE
                addFilaMatrizNecesidades(row, e, "DDE");

                // 2.1.40 - 2.1.41 Capacitaciones DDE
                row.add(flagSN(e.getP2140Recibe()));
                addFilaInstitucionesCapacitacion(row, e, "DDE");

                // 2.2 ASISTENCIA HUMANITARIA
                row.add(flagSN(e.getP221Organo()));
                row.add(val(e.getP221Especifique()));
                row.add(val(e.getP222Porcentaje()));

                // 2.2.3 Eventos
                // Fallecidos 2023-2025
                row.add(val(e.getP223Fallecidos2023()));
                row.add(val(e.getP223Fallecidos2024()));
                row.add(val(e.getP223Fallecidos2025()));
                // Traslado restos mortales (no existe)
                row.add(""); row.add(""); row.add("");
                // Cremaciones realizadas (no existe)
                row.add(""); row.add(""); row.add("");

                // 2.2.4 Ayuda alimentaria
                row.add(val(e.getP2242023NumCasos()));
                row.add(val(e.getP2242023Material()));
                row.add(val(e.getP2242023Economica()));
                row.add(val(e.getP2242024NumCasos()));
                row.add(val(e.getP2242024Material()));
                row.add(val(e.getP2242024Economica()));
                row.add(val(e.getP2242025NumCasos()));
                row.add(val(e.getP2242025Material()));
                row.add(val(e.getP2242025Economica()));

                // 2.2.5 Alojamiento temporal
                row.add(val(e.getP2252023NumCasos()));
                row.add(val(e.getP2252023Material()));
                row.add(val(e.getP2252023Economica()));
                row.add(val(e.getP2252024NumCasos()));
                row.add(val(e.getP2252024Material()));
                row.add(val(e.getP2252024Economica()));
                row.add(val(e.getP2252025NumCasos()));
                row.add(val(e.getP2252025Material()));
                row.add(val(e.getP2252025Economica()));

                // 2.2.6 Apoyo económico pasajes
                row.add(val(e.getP2262023NumCasos()));
                row.add(val(e.getP2262023Material()));
                row.add(val(e.getP2262023Economica()));
                row.add(val(e.getP2262024NumCasos()));
                row.add(val(e.getP2262024Material()));
                row.add(val(e.getP2262024Economica()));
                row.add(val(e.getP2262025NumCasos()));
                row.add(val(e.getP2262025Material()));
                row.add(val(e.getP2262025Economica()));

                // 2.2.7 Personas atendidas por vulnerabilidad (no existe 1:1)
                row.add(""); row.add(""); row.add("");

                // 2.2.8 Casos remitidos (no existe 1:1)
                row.add(""); row.add(""); row.add("");

                // 2.2.9 Retorno voluntario (no existe 1:1)
                row.add(""); row.add(""); row.add("");

                // 2.2.10 MATRIZ Necesidades AH
                addFilaMatrizNecesidades(row, e, "AH");

                // 2.2.11 - 2.2.12 Capacitaciones AH
                row.add(flagSN(e.getP2211Recibe()));
                addFilaInstitucionesCapacitacion(row, e, "AH");

                block.rows.add(row);
            }
        }

        sheet.blocks = new ArrayList<>();
        sheet.blocks.add(block);
        return sheet;
    }

    // HELPERS CABECERA

    private static void addMatrizNecesidades(List<String> header, String prefijo) {
        String[] tipos = {"Logística", "Infraestructura", "Personal", "Presupuesto", "Otro"};

        for (String tipo : tipos) {
            header.add(prefijo + " Necesidad " + tipo + " – Seleccionado (S/N)");
            header.add(prefijo + " Necesidad " + tipo + " – ¿Gestiones? (S/N)");
            header.add(prefijo + " Necesidad " + tipo + " – Suficiente (S/N)");

            if (tipo.equals("Otro")) {
                header.add(prefijo + " Necesidad " + tipo + " – Especifique");
            }
            header.add(prefijo + " Necesidad " + tipo + " – Observaciones");
        }
        header.add(prefijo + " Necesidad NINGUNO (S/N)");
    }

    private static void addInstitucionesCapacitacion(List<String> header, String prefijo) {
        String[] instituciones = {
                "MRE", "RENIEC", "MIGRACIONES", "INTERPOL", "INEI",
                "JNE", "ONPE", "SUNARP", "PODER JUDICIAL",
                 "Otros"
        };

        for (String inst : instituciones) header.add(prefijo + " Institución " + inst + " (S/N)");
        header.add(prefijo + " Institución Otro – Detalle");
        header.add(prefijo + " NINGUNA capacitación (S/N)");
        header.add(prefijo + " NINGUNA capacitación – Detalle");
    }

    // HELPERS FILAS

    private static void addFilaMatrizNecesidades(List<String> row, Ficha1Sec2Entity e, String tipo) {
        switch (tipo) {
            case "TP":
                // A - Logística
                row.add(flagSN(e.getP2115ALogistica()));
                row.add(flagSN(e.getP2115AGestiones()));
                row.add(flagSN(e.getP2115ASuficiente()));
                row.add(val(e.getP2115AEspecifique()));
                // B - Infraestructura
                row.add(flagSN(e.getP2115BInfra()));
                row.add(flagSN(e.getP2115BGestiones()));
                row.add(flagSN(e.getP2115BSuficiente()));
                row.add(val(e.getP2115BEspecifique()));
                // C - Personal
                row.add(flagSN(e.getP2115CPersonal()));
                row.add(flagSN(e.getP2115CGestiones()));
                row.add(flagSN(e.getP2115CSuficiente()));
                row.add(val(e.getP2115CEspecifique()));
                // D - Presupuesto
                row.add(flagSN(e.getP2115DPresupuesto()));
                row.add(flagSN(e.getP2115DGestiones()));
                row.add(flagSN(e.getP2115DSuficiente()));
                row.add(val(e.getP2115DEspecifique()));
                // E - Otro
                row.add(flagSN(e.getP2115EOtro()));
                row.add(flagSN(e.getP2115EGestiones()));
                row.add(flagSN(e.getP2115ESuficiente()));
                row.add(val(e.getP2115EEspecifique()));
                row.add(val(e.getP2115EOtroDetalle()));
                // Ninguno
                row.add(flagSN(e.getP2115Ninguno()));
                break;

            case "VG":
                row.add(flagSN(e.getP2128ALogistica()));
                row.add(flagSN(e.getP2128AGestiones()));
                row.add(flagSN(e.getP2128ASuficiente()));
                row.add(val(e.getP2128AEspecifique()));
                row.add(flagSN(e.getP2128BInfra()));
                row.add(flagSN(e.getP2128BGestiones()));
                row.add(flagSN(e.getP2128BSuficiente()));
                row.add(val(e.getP2128BEspecifique()));
                row.add(flagSN(e.getP2128CPersonal()));
                row.add(flagSN(e.getP2128CGestiones()));
                row.add(flagSN(e.getP2128CSuficiente()));
                row.add(val(e.getP2128CEspecifique()));
                row.add(flagSN(e.getP2128DPresupuesto()));
                row.add(flagSN(e.getP2128DGestiones()));
                row.add(flagSN(e.getP2128DSuficiente()));
                row.add(val(e.getP2128DEspecifique()));
                row.add(flagSN(e.getP2128EOtro()));
                row.add(flagSN(e.getP2128EGestiones()));
                row.add(flagSN(e.getP2128ESuficiente()));
                row.add(val(e.getP2128EEspecifique()));
                row.add(val(e.getP2128EOtroDetalle()));
                row.add(flagSN(e.getP2128Ninguno()));
                break;

            case "DDE":
                row.add(flagSN(e.getP2139ALogistica()));
                row.add(flagSN(e.getP2139AGestiones()));
                row.add(flagSN(e.getP2139ASuficiente()));
                row.add(val(e.getP2139AEspecifique()));
                row.add(flagSN(e.getP2139BInfra()));
                row.add(flagSN(e.getP2139BGestiones()));
                row.add(flagSN(e.getP2139BSuficiente()));
                row.add(val(e.getP2139BEspecifique()));
                row.add(flagSN(e.getP2139CPersonal()));
                row.add(flagSN(e.getP2139CGestiones()));
                row.add(flagSN(e.getP2139CSuficiente()));
                row.add(val(e.getP2139CEspecifique()));
                row.add(flagSN(e.getP2139DPresupuesto()));
                row.add(flagSN(e.getP2139DGestiones()));
                row.add(flagSN(e.getP2139DSuficiente()));
                row.add(val(e.getP2139DEspecifique()));
                row.add(flagSN(e.getP2139EOtro()));
                row.add(flagSN(e.getP2139EGestiones()));
                row.add(flagSN(e.getP2139ESuficiente()));
                row.add(val(e.getP2139EEspecifique()));
                row.add(val(e.getP2139EOtroDetalle()));
                row.add(flagSN(e.getP2139Ninguno()));
                break;

            case "AH":
                row.add(flagSN(e.getP2210ALogistica()));
                row.add(flagSN(e.getP2210AGestiones()));
                row.add(flagSN(e.getP2210ASuficiente()));
                row.add(val(e.getP2210AEspecifique()));
                row.add(flagSN(e.getP2210BInfra()));
                row.add(flagSN(e.getP2210BGestiones()));
                row.add(flagSN(e.getP2210BSuficiente()));
                row.add(val(e.getP2210BEspecifique()));
                row.add(flagSN(e.getP2210CPersonal()));
                row.add(flagSN(e.getP2210CGestiones()));
                row.add(flagSN(e.getP2210CSuficiente()));
                row.add(val(e.getP2210CEspecifique()));
                row.add(flagSN(e.getP2210DPresupuesto()));
                row.add(flagSN(e.getP2210DGestiones()));
                row.add(flagSN(e.getP2210DSuficiente()));
                row.add(val(e.getP2210DEspecifique()));
                row.add(flagSN(e.getP2210EOtro()));
                row.add(flagSN(e.getP2210EGestiones()));
                row.add(flagSN(e.getP2210ESuficiente()));
                row.add(val(e.getP2210EEspecifique()));
                row.add(val(e.getP2210EOtroDetalle()));
                row.add(flagSN(e.getP2210Ninguno()));
                break;
        }
    }

    private static void addFilaInstitucionesCapacitacion(List<String> row, Ficha1Sec2Entity e, String tipo) {
        switch (tipo) {
            case "TP":
                row.add(flagSN(e.getP2117Mre()));
                row.add(flagSN(e.getP2117Reniec()));
                row.add(flagSN(e.getP2117Migraciones()));
                row.add(flagSN(e.getP2117Interpol()));
                row.add(flagSN(e.getP2117Inei()));
                row.add(flagSN(e.getP2117Jne()));
                row.add(flagSN(e.getP2117Onpe()));
                row.add(flagSN(e.getP2117Sunarp()));
                row.add(flagSN(e.getP2117PoderJudicial()));
                row.add(""); // MINJUSDH (no existe)
                row.add(""); // MIMP (no existe)
                row.add(""); // MINISTERIO PUBLICO (no existe)
                row.add(""); // DEFENSORIA (no existe)
                row.add(flagSN(e.getP2117Otros()));
                row.add(val(e.getP2117OtrosDetalle()));
                row.add(flagSN(e.getP2117Ninguna()));
                row.add(val(e.getP2117NingunaDetalle()));
                break;

            case "VG":
                row.add(flagSN(e.getP2130Mre()));
                row.add(flagSN(e.getP2130Reniec()));
                row.add(flagSN(e.getP2130Migraciones()));
                row.add(flagSN(e.getP2130Interpol()));
                row.add(flagSN(e.getP2130Inei()));
                row.add(flagSN(e.getP2130Jne()));
                row.add(flagSN(e.getP2130Onpe()));
                row.add(flagSN(e.getP2130Sunarp()));
                row.add(flagSN(e.getP2130PoderJudicial()));
                row.add(""); // MINJUSDH
                row.add(""); // MIMP
                row.add(""); // MINISTERIO PUBLICO
                row.add(""); // DEFENSORIA
                row.add(flagSN(e.getP2130Otros()));
                row.add(val(e.getP2130OtrosDetalle()));
                row.add(flagSN(e.getP2130Ninguna()));
                row.add(val(e.getP2130NingunaDetalle()));
                break;

            case "DDE":
                row.add(flagSN(e.getP2141Mre()));
                row.add(flagSN(e.getP2141Reniec()));
                row.add(flagSN(e.getP2141Migraciones()));
                row.add(flagSN(e.getP2141Interpol()));
                row.add(flagSN(e.getP2141Inei()));
                row.add(flagSN(e.getP2141Jne()));
                row.add(flagSN(e.getP2141Onpe()));
                row.add(flagSN(e.getP2141Sunarp()));
                row.add(flagSN(e.getP2141PoderJudicial()));
                row.add(""); // MINJUSDH
                row.add(""); // MIMP
                row.add(""); // MINISTERIO PUBLICO
                row.add(""); // DEFENSORIA
                row.add(flagSN(e.getP2141Otro()));
                row.add(val(e.getP2141OtroDetalle()));
                row.add(flagSN(e.getP2141Ninguno()));
                row.add(""); // NingunoDetalle (no existe)
                break;

            case "AH":
                row.add(flagSN(e.getP2212Mre()));
                row.add(flagSN(e.getP2212Reniec()));
                row.add(flagSN(e.getP2212Migraciones()));
                row.add(flagSN(e.getP2212Interpol()));
                row.add(flagSN(e.getP2212Inei()));
                row.add(flagSN(e.getP2212Jne()));
                row.add(flagSN(e.getP2212Onpe()));
                row.add(flagSN(e.getP2212Sunarp()));
                row.add(flagSN(e.getP2212PoderJudicial()));
                row.add(""); // MINJUSDH
                row.add(""); // MIMP
                row.add(""); // MINISTERIO PUBLICO
                row.add(""); // DEFENSORIA
                row.add(flagSN(e.getP2212Otros()));
                row.add(val(e.getP2212OtrosDetalle()));
                row.add(flagSN(e.getP2212Ninguno()));
                row.add(val(e.getP2212NingunoDetalle()));
                break;
        }
    }

    // HELPERS VALORES

    private static String val(Object o) {
        return (o == null) ? "" : String.valueOf(o).trim();
    }

    private static String flagSN(Object v) {
        if (v == null) return "";
        if (v instanceof Boolean b) return b ? "S" : "";
        String x = String.valueOf(v).trim();
        if (x.equalsIgnoreCase("S")) return "S";
        if (x.equalsIgnoreCase("N")) return "N";
        if (x.equalsIgnoreCase("true")) return "S";
        if (x.equalsIgnoreCase("false")) return "";
        return x;
    }

    private static String tryUser(Ficha1Sec2Entity e) {
        try {
            if (e.getUsuRegistro() != null && !e.getUsuRegistro().isBlank()) {
                return e.getUsuRegistro().trim();
            }
        } catch (Throwable ignore) {}
        try {
            if (e.getUsuActualiza() != null && !e.getUsuActualiza().isBlank()) {
                return e.getUsuActualiza().trim();
            }
        } catch (Throwable ignore) {}
        return "";
    }
}
