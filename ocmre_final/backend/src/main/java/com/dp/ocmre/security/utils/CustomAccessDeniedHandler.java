package com.dp.ocmre.security.utils;

import java.io.IOException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.dp.ocmre.security.classes.ResponseRest;
import com.dp.ocmre.security.Constantes;

@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
                       AccessDeniedException accessDeniedException) throws IOException {
    	
    	int codigo = HttpServletResponse.SC_FORBIDDEN;
    	response.setContentType("application/json");
        response.setStatus(codigo);
        
        ResponseRest response2 =  ResponseRest.builder()
        		.codigo(Constantes.AUTZ_CODE)
        		.mensaje(Constantes.AUTZ_NO_ACCESS)
        		.build();
        
        new ObjectMapper().writeValue(response.getOutputStream(), response2);
    }

}
