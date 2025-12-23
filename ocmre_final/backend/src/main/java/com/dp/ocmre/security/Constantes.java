package com.dp.ocmre.security;

public class Constantes {

	public static final String AUTH_CODE = "E001";
	public static final String AUTH_NO_AUTENTICATED = "Las credenciales de autenticación no se proveyeron.";
	public static final String AUTH_SERVER_NO_FOUND = "El servidor de autenticación no está disponible.";
	public static final String AUTH_TOKEN_EXPIRED = "El token ha expirado.";
	public static final String AUTH_TOKEN_NO_AUDIENCE = "El token no está emitido para la audiencia configurada (aud).";
	public static final String AUTH_TOKEN_NO_EMISOR = "El token no pertence al emisor configurado (issuer).";
	public static final String AUTH_TOKEN_NO_ID_TOKEN = "No contiene un ID Token (jti).";
	public static final String AUTH_TOKEN_REVOCATED = "La sesión ha sido cerrada (token_revoked).";
	public static final String AUTH_TOKEN_INVALID = "El token es inválido.";
	public static final String AUTH_TOKEN_FORMAT_INCORRECT = "El token tiene un formato incorrecto.";
	
	public static final String AUTZ_CODE = "E010";
	public static final String AUTZ_NO_ACCESS = "No tiene los permisos suficientes para acceder al recurso.";
	
	public static final long JTI_DUR_SECONS = 30;
	public static final long JTI_MAX_ITEMS = 10_000;
	public static final String JTI_SERVER_NO_FOUND = "Problemas con el servidor de validación (JTI).";
		
}
