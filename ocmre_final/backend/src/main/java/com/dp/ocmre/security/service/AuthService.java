package com.dp.ocmre.security.service;

import java.util.List;

import com.dp.ocmre.security.classes.UsuarioAuth;

public interface AuthService {
	void setAuthContext(UsuarioAuth auth);
	void setAuthFreeContext();
	UsuarioAuth getAuth();
	List<String> getScopesAuth();
}
