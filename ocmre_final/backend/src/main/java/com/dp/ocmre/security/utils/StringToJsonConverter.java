package com.dp.ocmre.security.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StringToJsonConverter {

	public static String toJson(String input) {
        if (input == null || input.isEmpty()) {
            return "{}";
        }

        // Quitar espacios innecesarios al inicio y final
        input = input.trim();

        // Reemplazar "=" por ":" para estandarizar
        String json = input.replace("=", ":");

        // Agregar comillas a las claves (antes de los :)
        Pattern pattern = Pattern.compile("([a-zA-Z0-9_]+):");
        Matcher matcher = pattern.matcher(json);
        StringBuffer sb = new StringBuffer();
        while (matcher.find()) {
            matcher.appendReplacement(sb, "\"" + matcher.group(1) + "\":");
        }
        matcher.appendTail(sb);
        json = sb.toString();

        // Limpiar valores vacíos => convertir a string vacío ""
        json = json.replaceAll(":,", ":\"\","); // casos como  personal_id=,
        json = json.replaceAll(":}", ":\"\"}"); // casos como nombre=}

        // Agregar comillas a valores que no sean numéricos, null, boolean, objetos o arrays
        pattern = Pattern.compile(":([^\\{\\}\\[\\],]+)(,|})");  
        matcher = pattern.matcher(json);
        sb = new StringBuffer();
        while (matcher.find()) {
            String rawValue = matcher.group(1).trim();
            String suffix = matcher.group(2);

            if (rawValue.equals("null") || rawValue.matches("-?\\d+(\\.\\d+)?") 
                    || rawValue.equals("true") || rawValue.equals("false")) {
                // Dejar tal cual (número, null o booleano)
                matcher.appendReplacement(sb, ":" + rawValue + suffix);
            } else {
                // Poner entre comillas (ej. strings, IPs, códigos alfanuméricos)
                matcher.appendReplacement(sb, ":\"" + rawValue + "\"" + suffix);
            }
        }
        matcher.appendTail(sb);
        json = sb.toString();

        // Encerrar todo entre llaves si no lo está
        if (!json.startsWith("{")) {
            json = "{ " + json + " }";
        }

        json = json.replaceAll(":,", ":\"\",");
        json = json.replaceAll(":}", ":\"\"}");
        json = json.replaceAll("\"\"\"+", "\"\"");
        return json;
    }

}