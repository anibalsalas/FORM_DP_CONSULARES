package com.dp.ocmre.security;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import com.dp.ocmre.security.utils.RouteRule;
import static com.dp.ocmre.security.ConstantesRoles.ADMINISTRADOR;
import static com.dp.ocmre.security.ConstantesRoles.COMISIONADO;
import static com.dp.ocmre.security.ConstantesRoles.ESPECIALISTA;
import static com.dp.ocmre.security.ConstantesRoles.OFICINA_CONSULAR;

@Component
public class RulesApp {
	
	@Value("${server.development:false}")
	private boolean development;
	
	public List<RouteRule> rulesApp(){
		List<RouteRule> rules = new ArrayList<>();
		rules.add(new RouteRule(HttpMethod.GET, "/"));
		
		/* Oauth2 scopes*/
		
		rules.add(new RouteRule(HttpMethod.GET, "/api/auth/**"));
		rules.add(new RouteRule(HttpMethod.POST, "/api/auth/**"));
		
		rules.add(new RouteRule(HttpMethod.POST, "/api/ficha1/obtenerFichaCompleta/**", COMISIONADO+","+ESPECIALISTA+","+OFICINA_CONSULAR));
		rules.add(new RouteRule(HttpMethod.GET, "/api/ficha1/obtenerFichaCompleta/**", COMISIONADO+","+ESPECIALISTA+","+OFICINA_CONSULAR));
		
		rules.add(new RouteRule(HttpMethod.POST, "/api/ficha1/reportes/**", ESPECIALISTA+","+ADMINISTRADOR));
		rules.add(new RouteRule(HttpMethod.GET, "/api/ficha1/reportes/**", ESPECIALISTA+","+ADMINISTRADOR));
		rules.add(new RouteRule(HttpMethod.GET, "/api/ficha1/resumen-por-region", ESPECIALISTA+","+ADMINISTRADOR));
		
		
		rules.add(new RouteRule(HttpMethod.GET, "/error"));
		rules.add(new RouteRule(HttpMethod.GET, "/recursos/**"));
		rules.add(new RouteRule(HttpMethod.GET, "/webjars/**"));
		rules.add(new RouteRule(HttpMethod.GET, "/webjars/**"));

		if (development) {
			rules.add(new RouteRule(HttpMethod.GET, "/publico/**"));
			rules.add(new RouteRule(HttpMethod.GET, "/swagger-ui.html"));
			rules.add(new RouteRule(HttpMethod.GET, "/swagger-ui/**"));
			rules.add(new RouteRule(HttpMethod.GET, "/swagger-resources/**"));
			rules.add(new RouteRule(HttpMethod.GET, "/v3/api-docs/**"));
		}
		return rules;
	}
}
