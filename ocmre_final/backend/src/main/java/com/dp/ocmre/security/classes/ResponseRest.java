package com.dp.ocmre.security.classes;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Builder;
import lombok.Data;
import lombok.Builder.Default;

@JsonPropertyOrder({"tipo", "codigo", "mensaje","detalle"})
@Data
@Builder
public class ResponseRest {
	@Default
    private String tipo = "ERROR";
	
    @JsonInclude(Include.NON_NULL)
    private String codigo;

    @JsonInclude(Include.NON_NULL)
    private String mensaje;

    @JsonInclude(Include.NON_NULL)
    private Object detalle;
}
