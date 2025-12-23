package com.dp.ocmre.security.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.jwt.JwtValidationException;
import org.springframework.security.oauth2.server.resource.InvalidBearerTokenException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.springframework.web.client.ResourceAccessException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.dp.ocmre.security.classes.ResponseRest;
import java.io.IOException;
import com.dp.ocmre.security.Constantes;

@Component
public class CustomAuthEntryPoint implements AuthenticationEntryPoint {
	
    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException {
    	
    	Throwable cause = authException.getCause();
    	int codigo = HttpServletResponse.SC_UNAUTHORIZED;
        response.setContentType("application/json");
        
        String mensaje = Constantes.AUTH_NO_AUTENTICATED;
        String detail = null;
        if (cause instanceof ResourceAccessException) {
            mensaje = Constantes.AUTH_SERVER_NO_FOUND;
            codigo = HttpServletResponse.SC_BAD_REQUEST;
        }else {
        	if (cause instanceof JwtValidationException jwtEx) {
                for (OAuth2Error error : jwtEx.getErrors()) {
                    String code = error.getErrorCode();
                    String desc = error.getDescription() != null ? error.getDescription() : "";
                    if ("invalid_token".equals(code)) {
                        if (desc.contains("Jwt expired")) {
                            mensaje = Constantes.AUTH_TOKEN_EXPIRED;
                        } else if (desc.contains("aud claim")) {
                            mensaje = Constantes.AUTH_TOKEN_NO_AUDIENCE;
                        } else if (desc.contains("iss claim")) {
                            mensaje = Constantes.AUTH_TOKEN_NO_EMISOR;
                        } else if (desc.contains("jti")) {
                            mensaje = Constantes.AUTH_TOKEN_NO_ID_TOKEN;
                        } else if (desc.contains("revoked")) {
                            mensaje = Constantes.AUTH_TOKEN_REVOCATED;
                        } else {
                            mensaje = Constantes.AUTH_TOKEN_INVALID;
                        }
                    } else {
                        mensaje = "Error JWT: " + code+".";
                    }
                }
            }else {
            	if (authException instanceof InvalidBearerTokenException) {
            		mensaje = Constantes.AUTH_TOKEN_FORMAT_INCORRECT;
            	}else {
            		detail = authException.getMessage();
            	}
            }
        }
        
        if(detail != null && detail.equals("Full authentication is required to access this resource")) {
        	detail = null;
        }
        
        response.setStatus(codigo);
        
        ResponseRest response2 =  ResponseRest.builder()
        		.codigo(Constantes.AUTH_CODE)
        		.mensaje(mensaje)
        		.detalle(detail)
        		.build();
        new ObjectMapper().writeValue(response.getOutputStream(), response2);
    }
}