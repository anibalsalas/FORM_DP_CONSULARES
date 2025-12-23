package com.dp.ocmre.security.classes;

import com.google.gson.annotations.SerializedName;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UsuarioAuth {
	
	private Long id;
	
	private String cuuid;
	
	@SerializedName("usuario")
	private String username;
	
	@SerializedName("tipo_doc_codigo")
	private String tipoDocCod;
	
	@SerializedName("tipo_doc_nombre")
	private String tipoDocNom;
	
	@SerializedName("numero_doc")
	private String numeroDoc;
	
	@SerializedName("nombre_completo")
	private String nombreCompleto;
	
	@SerializedName("rel_laboral_codigo")
	private String relLaboralCod;
	
	@SerializedName("rel_laboral_nombre")
	private String relLaboralNom;
	
	@SerializedName("personal_id")
	private String personalCod;
}