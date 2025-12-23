package com.dp.ocmre.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.web.SecurityFilterChain;

import com.dp.ocmre.security.utils.CustomAccessDeniedHandler;
import com.dp.ocmre.security.utils.CustomAuthEntryPoint;
import com.dp.ocmre.security.utils.JtiRevocationValidator;
import com.dp.ocmre.security.utils.RouteRule;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
	
	private final CustomAuthEntryPoint customAuthEntryPoint;
	private final CustomAccessDeniedHandler customAccessDeniedHandler;
	private final RulesApp rules;
	
	@Value("${spring.security.oauth2.resourceserver.jwt.token-cache-uri:${spring.security.oauth2.resourceserver.jwt.issuer-uri}}")
    private String tokenCacheUri;
	
    public SecurityConfig(CustomAuthEntryPoint customAuthEntryPoint,
                          CustomAccessDeniedHandler customAccessDeniedHandler,
                          RulesApp rules) {
        this.customAuthEntryPoint = customAuthEntryPoint;
        this.customAccessDeniedHandler = customAccessDeniedHandler;
        this.rules = rules;
    }

    @SuppressWarnings("removal")
	@Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        
    	http
            .authorizeHttpRequests(auth -> {
	            for (RouteRule rule : rules.rulesApp()) {
	            	if (rule.isPermitAll()) {
	                    auth.requestMatchers(rule.getMethod(), rule.getPattern()).permitAll();
	                } else {
	                	String[] authorities = rule.getAuthority().split(",");
	                    if (authorities.length > 1) {
	                        auth.requestMatchers(rule.getMethod(), rule.getPattern())
	                            .hasAnyAuthority(authorities);
	                    } else {
	                        auth.requestMatchers(rule.getMethod(), rule.getPattern())
	                            .hasAuthority(rule.getAuthority());
	                    }
	                }
	            }
            	auth
                .anyRequest().authenticated(); 
            })
            // Habilitar JWT
            .oauth2ResourceServer(oauth2 -> oauth2
            		//.opaqueToken() // Con el servidor de autenticacion
            		.jwt() // Solo validacion de tokens aqui
            		.and()
            		.authenticationEntryPoint(customAuthEntryPoint)
            ).exceptionHandling(ex -> ex
            		.accessDeniedHandler(customAccessDeniedHandler)  // <-- Aquí el 403
            );
        return http.build();
    }
    
   
    
    @Bean
    OAuth2TokenValidator<Jwt> jtiRevocationValidator() {
        return new JtiRevocationValidator(tokenCacheUri);
    }
    
}