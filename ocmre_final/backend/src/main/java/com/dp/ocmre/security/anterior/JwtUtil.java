package com.dp.ocmre.security.anterior;



import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.SignatureAlgorithm;
//import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component
public class JwtUtil {


     @Value("${jwt.secret}")
    private String secretKeyString;

    @Value("${jwt.expiration}")
    private long expiration;

    private Key key;

    @PostConstruct
    public void init() {
        this.key = new SecretKeySpec(secretKeyString.getBytes(StandardCharsets.UTF_8), SignatureAlgorithm.HS256.getJcaName());
    }


    // 🎯 Simplificar roles antes de ponerlos en el token
    private List<String> simplifyRoles(List<String> roles) {
        List<String> result = roles.stream()
            .filter(role -> role != null && !role.isEmpty())
            .map(role -> {
                if (role.contains("FICHA_ESPECIALISTA")) return "ROLE_ESPECIALISTA";
                if (role.contains("FICHA_COMISIONADO")) return "ROLE_COMISIONADO";
                if (role.equalsIgnoreCase("EXTERNO")) return "ROLE_EXTERNO";
                if (role.equalsIgnoreCase("ADMINISTRADOR")) return "ROLE_ADMINISTRADOR";
                if (role.equals("ROLE_COMISIONADO") || role.equals("ROLE_ADMIN")) return "ROLE_COMISIONADO";
                return null;
            })
            .filter(r -> r != null)
            .distinct()
            .collect(Collectors.toList());

        if (result.isEmpty()) result.add("ROLE_COMISIONADO");

        return result;
    }

    public String generateToken(String username, List<String> roles) {
        if (roles == null || roles.isEmpty()) {
            roles = List.of("COMISIONADO");
        }

        return Jwts.builder()
            .setSubject(username)
            .claim("roles", simplifyRoles(roles))
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }

    public List<String> getRolesFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody();
        return claims.get("roles", List.class);
    }
}
