package com.dp.ocmre.security.utils;

import java.time.Duration;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidatorResult;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.client.RestClient;
import com.github.benmanes.caffeine.cache.LoadingCache;
import com.github.benmanes.caffeine.cache.Caffeine;
import com.dp.ocmre.security.Constantes;

public class JtiRevocationValidator implements OAuth2TokenValidator<Jwt>{

	private final RestClient rest;
	private final LoadingCache<String, Boolean> cache;
	
	@Value("${spring.security.oauth2.resourceserver.jwt.token-cache-path:/api/auth/is-revoked}")
    private String tokenCachePath;
	

    public JtiRevocationValidator(String baseUrl) {
    	 this.rest = RestClient.builder()
                 .baseUrl(baseUrl)
                 .build();
    	 this.cache = Caffeine.newBuilder()
                 .expireAfterWrite(Duration.ofSeconds(Constantes.JTI_DUR_SECONS))
                 .maximumSize(Constantes.JTI_MAX_ITEMS)
                 .build(this::checkRemote);
    }
    
    private boolean checkRemote(String jti) {
    	try {
            Map<String, Object> resp = rest.get()
                    .uri(uriBuilder -> uriBuilder
                            .path(tokenCachePath)
                            .queryParam("jti", jti)
                            .build())
                    .retrieve()
                    .onStatus(HttpStatusCode::isError, (req, res) -> {
                        throw new RuntimeException(Constantes.JTI_SERVER_NO_FOUND);
                    })
                    .body(new ParameterizedTypeReference<Map<String, Object>>() {});
            return Boolean.TRUE.equals(resp.get("revoked"));
        } catch (Exception e) {
            return false;
        }
    }
    
	@Override
	public OAuth2TokenValidatorResult validate(Jwt jwt) {
		String jti = jwt.getId();
		if (jti == null) {
            return OAuth2TokenValidatorResult.failure(
                    new OAuth2Error("invalid_token", "missing jti claim", null));
        }
        boolean revoked = cache.get(jti);
        if (revoked) {
            return OAuth2TokenValidatorResult.failure(
                    new OAuth2Error("invalid_token", "revoked", null));
        }
		return OAuth2TokenValidatorResult.success();
	}

}
