package com.dp.ocmre.serviceimpl;

import com.dp.ocmre.service.VariableSistemaService;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


@Service
public class VariableSistemaServiceImpl implements VariableSistemaService {

    private static final Logger logger = LogManager.getLogger(VariableSistemaServiceImpl.class);

    // private final WebClient webClient;

    // public VariableSistemaServiceImpl() {
    //     HttpClient httpClient = HttpClient.create()
    //             .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 10000)
    //             .responseTimeout(Duration.ofMillis(10000))
    //             .doOnConnected(conn -> conn
    //                     .addHandlerLast(new ReadTimeoutHandler(10000, TimeUnit.MILLISECONDS))
    //                     .addHandlerLast(new WriteTimeoutHandler(10000, TimeUnit.MILLISECONDS)));

    //     this.webClient = WebClient.builder()
    //             .baseUrl(Constantes.PLUSNETWS)
    //             .clientConnector(new ReactorClientHttpConnector(httpClient))
    //             .defaultCookie("cookieKey", "cookieValue")
    //             .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
    //             .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_HTML_VALUE)
    //             .defaultUriVariables(Collections.singletonMap("url", Constantes.PLUSNETWS))
    //             .build();
    // }

    // @Override
    // public Date current_date() {
    //     try {
    //         return webClient.get()
    //                 .uri("current_date")
    //                 .retrieve()
    //                 .bodyToMono(Date.class)
    //                 .block();
    //     } catch (Exception e) {
    //         logger.error("Error current_date(): " + e.getMessage(), e);
    //         return null;
    //     }
    // }

    @Override
    public String userID() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            String name = authentication.getName();
            if (name != null) {
                return name.trim().toUpperCase();
            }
        }
        return null;
    }

    // @Override
    // public Date dias_habiles(String dd, String mm, String yyyy, Integer dias_procesar, String tipo) {
    //     String uri = "dias_habiles/" + dd + "/" + mm + "/" + yyyy + "/" + dias_procesar + "/" + tipo;
    //     try {
    //         return webClient.get().uri(uri).retrieve().bodyToMono(Date.class).block();
    //     } catch (Exception e) {
    //         logger.error("Error dias_habiles(): " + e.getMessage(), e);
    //         return null;
    //     }
    // }

    // @Override
    // public Double calculo_horas(String ddi, String mmi, String yyyyi, String hhhi, String mmmi,
    //                              String ddf, String mmf, String yyyyf, String hhhf, String mmmf) {
    //     String uri = "calculo_horas/" + ddi + "/" + mmi + "/" + yyyyi + "/" + hhhi + "/" + mmmi + "/" + ddf + "/" + mmf + "/" + yyyyf + "/" + hhhf + "/" + mmmf;
    //     try {
    //         return webClient.get().uri(uri).retrieve().bodyToMono(Double.class).block();
    //     } catch (Exception e) {
    //         logger.error("Error calculo_horas(): " + e.getMessage(), e);
    //         return null;
    //     }
    // }

    // @Override
    // public Date dias_horas(String dd, String mm, String yyyy, String tipo) {
    //     String uri = "dias_horas/" + dd + "/" + mm + "/" + yyyy + "/" + tipo;
    //     try {
    //         return webClient.get().uri(uri).retrieve().bodyToMono(Date.class).block();
    //     } catch (Exception e) {
    //         logger.error("Error dias_horas(): " + e.getMessage(), e);
    //         return null;
    //     }
    // }

    // @Override
    // public Date dias_calendario(String dd, String mm, String yyyy, Integer numero_dias) {
    //     String uri = "dias_calendario/" + dd + "/" + mm + "/" + yyyy + "/" + numero_dias;
    //     try {
    //         return webClient.get().uri(uri).retrieve().bodyToMono(Date.class).block();
    //     } catch (Exception e) {
    //         logger.error("Error dias_calendario(): " + e.getMessage(), e);
    //         return null;
    //     }
    // }

    // @Override
    // public Date dias_habiles_regresiva(String dd, String mm, String yyyy, Integer dias_procesar) {
    //     String uri = "dias_habiles_regresiva/" + dd + "/" + mm + "/" + yyyy + "/" + dias_procesar;
    //     try {
    //         RequestHeadersSpec<?> headersSpec = webClient.get().uri(uri);
    //         Mono<Date> date = headersSpec.exchangeToMono(response -> {
    //             if (response.statusCode().equals(HttpStatus.OK)) {
    //                 return response.bodyToMono(Date.class);
    //             } else if (response.statusCode().equals(HttpStatus.NO_CONTENT)) {
    //                 logger.error("No content dias_habiles_regresiva(): " + response.statusCode());
    //                 return Mono.empty();
    //             } else {
    //                 logger.error("Error dias_habiles_regresiva(): " + response.statusCode());
    //                 return response.createException().flatMap(Mono::error);
    //             }
    //         });
    //         return date.block();
    //     } catch (Exception e) {
    //         logger.error("Error dias_habiles_regresiva(): " + e.getMessage(), e);
    //         return null;
    //     }
    // }
}
