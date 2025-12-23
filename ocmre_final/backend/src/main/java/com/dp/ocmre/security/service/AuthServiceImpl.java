package com.dp.ocmre.security.service;

import org.springframework.stereotype.Service;

import com.dp.ocmre.security.classes.UsuarioAuth;
import com.dp.ocmre.security.utils.StringToJsonConverter;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;

import java.util.Collections;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;

@RequiredArgsConstructor
@Service
public class AuthServiceImpl implements AuthService{

	//private final Authentication authentication;
	
	@Override
	public void setAuthContext(UsuarioAuth auth) {
		final var authentication = new UsernamePasswordAuthenticationToken(
	    		auth, auth.getCuuid(), Collections.emptyList());
	    SecurityContextHolder.getContext().setAuthentication(authentication);
	}

	@Override
	public void setAuthFreeContext() {
		final var authentication = new UsernamePasswordAuthenticationToken(
				"free", null, Collections.emptyList());
	    SecurityContextHolder.getContext().setAuthentication(authentication);
	}

	@Override
	public UsuarioAuth getAuth() {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    	if (principal instanceof Jwt jwt) {
            /*System.out.println("Es un JWT");
            System.out.println(jwt.getId());
            System.out.println(jwt.getSubject());
            System.out.println(jwt.getClaims());
            System.out.println(jwt.getClaims().get("user"));
            */
            Gson gson = new Gson();
            String json = StringToJsonConverter.toJson(jwt.getClaims().get("user").toString());
            var auth = gson.fromJson(json, UsuarioAuth.class);
            //System.out.println(auth);
            auth.setUsername(auth.getUsername().toUpperCase());
            return auth;            
        } else if (principal instanceof OAuth2AuthenticatedPrincipal opaque) {
            System.out.println("Es un token opaco");
            System.out.println(opaque.getName());
            System.out.println(opaque.getAttributes());
        }
		return null;
	}

	@Override
	public List<String> getScopesAuth() {
		var auth = SecurityContextHolder.getContext().getAuthentication();
		List<String> roles = auth.getAuthorities().stream()
		        .map(a -> a.getAuthority().replace("SCOPE_", ""))
		        .toList();
		return roles;
	}

}

