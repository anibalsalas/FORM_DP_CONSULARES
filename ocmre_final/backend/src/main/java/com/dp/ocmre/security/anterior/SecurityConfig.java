/*
package com.dp.ocmre.security.anterior;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    private final JwTFilter jwtFilter;

    public SecurityConfig(JwTFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOriginPattern("*"); 
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                    .requestMatchers("/api/auth/**").permitAll()
                    .requestMatchers("/api/ficha1/adjuntar-archivo").permitAll()
                      .requestMatchers("/api/ficha1/listarFichas").permitAll()
                 .requestMatchers("/api/ficha1/datosEntrevistador").permitAll()
                .requestMatchers("/api/ficha1/verificarEntidadActiva").permitAll()
                .requestMatchers("/api/ficha1/padron").permitAll()
                .requestMatchers("/api/ficha1/archivo/listar").permitAll()
                .requestMatchers("/api/ficha1/seccion1/listar").permitAll()
                .requestMatchers("/api/ficha1/seccion1/monitoreo").permitAll()
                .requestMatchers("/api/ficha1/seccion1/resumen-por-region").permitAll()
                .requestMatchers("/api/ficha1/guardarFichaSeccion1").permitAll()
                .requestMatchers("/api/ficha1/guardarFichaSeccion2").permitAll()
                .requestMatchers("/api/ficha1/guardarFichaSeccion3").permitAll()
                .requestMatchers("/api/ficha1/guardarFichaSeccion4").permitAll()
                .requestMatchers("/api/ficha1/guardarFichaSeccion5").permitAll()
                .requestMatchers("/api/ficha1/guardarFichaSeccion6").permitAll()
                .requestMatchers("/api/ficha1/guardarFichaSeccion7").permitAll()
                .requestMatchers("/api/ficha1/guardarFichaSeccion8").permitAll()
                .requestMatchers("/api/ficha1/guardarFichaSeccion9").permitAll()
                .requestMatchers("/api/ficha1/guardarFichaSeccion10").permitAll()
                .requestMatchers("/api/ficha1/guardarFichaSeccion11").permitAll()
                .requestMatchers("/api/ficha1/guardarFichaSeccion12").permitAll()
                .requestMatchers("/api/ficha1/guardarFichaSeccion13").permitAll()
                    .requestMatchers("/api/usuario-roles/**").permitAll()

                     // FICHA 1: Solo ciertos roles pueden acceder
                    .requestMatchers("/api/ficha1/obtenerFichaCompleta/**").hasAnyRole("COMISIONADO", "ESPECIALISTA", "EXTERNO")
                    .requestMatchers("/api/ficha1/**").permitAll()
                .requestMatchers("/api/ficha1/reportes/**").hasAnyRole( "ESPECIALISTA", "ADMINISTRADOR")

                    .anyRequest().authenticated()
            )
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}*/
