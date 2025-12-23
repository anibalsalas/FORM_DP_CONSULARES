package com.dp.ocmre.security.utils;

import java.util.Arrays;
import java.util.stream.Collectors;

import org.springframework.http.HttpMethod;

public class RouteRule {
    private HttpMethod method;
    private String pattern;
    private String authority;
    private boolean permitAll; // <-- nuevo campo

    // Require autorización
    public RouteRule(HttpMethod method, String pattern, String authority) {
        this.method = method;
        this.pattern = pattern;
        
        if(authority != null) {
        	String[] authorities = authority.split(",");
        	authority = Arrays.stream(authorities)
        	        .map(a -> "SCOPE_" + a.trim())
        	        .collect(Collectors.joining(","));
        	this.authority = authority;
        }
        this.permitAll = false;
    }
    
    // Servicios libres
    public RouteRule(HttpMethod method, String pattern) {
        this.method = method;
        this.pattern = pattern;
        this.permitAll = true;
    }

    public HttpMethod getMethod() { return method; }
    public String getPattern() { return pattern; }
    public String getAuthority() { return authority; }
    public boolean isPermitAll() { return permitAll; }
    
}