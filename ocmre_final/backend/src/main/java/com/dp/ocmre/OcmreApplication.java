package com.dp.ocmre;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class OcmreApplication extends SpringBootServletInitializer {

    /**
     * Este método se llama cuando se despliega como WAR en un servidor como WildFly.
     */
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(OcmreApplication.class);
    }

    /**
     * Este método se llama solo si ejecutas la app con `java -jar`. No se usa en WildFly.
     */
    public static void main(String[] args) {
        SpringApplication.run(OcmreApplication.class, args);
    }
}