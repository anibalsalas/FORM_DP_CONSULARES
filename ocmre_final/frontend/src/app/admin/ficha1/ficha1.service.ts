import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { FichaEntity } from '../../models/ficha.model';
import { FichaPadronEntity } from '../../models/ficha-padron.model';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root',
})
export class Ficha1Service {
  //private apiUrl = environment.api_url +'/api/ficha1'; 
  private apiUrl = `${environment.api_url}/api/ficha1`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }

listarFichas(): Observable<FichaEntity[]> {
   
    
    return this.http.get<FichaEntity[]>(`${this.apiUrl}/listarFichas`).pipe(
      tap(() => console.log('✅ Listado de fichas exitoso')),
      catchError(error => {
        console.error('❌ Error al listar fichas:', error);
        if (error.status === 403) {
          console.error('⚠️ Posible problema de roles: El usuario no tiene COMISIONADO o ESPECIALISTA');
        }
        return throwError(() => error);
      })
    );
  }

    registrarFicha(ficha: FichaEntity): Observable<FichaEntity> {
    return this.http.post<FichaEntity>(`${this.apiUrl}/guardarFicha`, ficha);
  }

  eliminarFicha(idFicha: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminarFicha/${idFicha}`);
  }



    existeFichaDelUsuario(): Observable<boolean> {
  return this.http.get<boolean>(`${this.apiUrl}/existeFichaExterno`);
}

    

 
    // obtenerPadron(): Observable<FichaPadronEntity[]> {
    //   return this.http.get<FichaPadronEntity[]>(`${this.apiUrl}/padron`).pipe(
    //     catchError(error => {
    //       console.error('Error al cargar el padrón:', error);
    //       return throwError(() => error);
    //     })
    //   );
    // }

  


 
    obtenerPadron(): Observable<FichaPadronEntity[]> {
      return this.http.get<FichaPadronEntity[]>(`${this.apiUrl}/padron`).pipe(
        //tap(() => console.log('📥 Padrón cargado')),
        catchError(error => {
          console.error('Error al cargar el padrón:', error);
          return throwError(() => error);
        })
      );
    }


//           obtenerDatosEntrevistador(): Observable<any> {
//    return this.http.get<any>(`${this.apiUrl}/datosEntrevistador`);
// }

  obtenerDatosEntrevistador(): Observable<any> {
    return this.http.get(`${this.apiUrl}/datosEntrevistador`, {
      headers: this.getHeaders()
    });
  }

 


obtenerDatosEntidadPorCodUnico(codUnicoEntidad: string): Observable<any> {
    console.log('🔵 Angular Service: Llamando a GET /api/ficha1/entidadExterno/' + codUnicoEntidad);
    return this.http.get(`${this.apiUrl}/entidadExterno/${codUnicoEntidad}`, {
        headers: this.getHeaders()
    }).pipe(
        tap(response => console.log('✅ Response recibida del backend:', response)),
        catchError(error => {
            console.error('❌ Error en la llamada HTTP:', error);
            if (error.status === 404) {
                console.error('❌ 404: Entidad no encontrada para codUnico:', codUnicoEntidad);
            }
            return throwError(() => error);
        })
    );
}

  obtenerFichaCompletaPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/obtenerFichaCompleta/${id}`, {
      headers: this.getHeaders()
    });
  }

  // verificarEntidadExistente(nomEntidad: string): Observable<boolean> {
  //   return this.http.get<boolean>(`${this.apiUrl}/existeEntidad`, {
  //     params: { nomEntidad }
  //   });
  // }




// verificarEntidadActiva(entidadNombre: string, idExcluir?: number): Observable<boolean> {
//     const params: any = { entidadNombre };
//     if (idExcluir) params.idExcluir = idExcluir;
    
//     return this.http.get<boolean>(`${this.apiUrl}/verificarEntidadActiva`, {
//       params,
//       headers: this.getHeaders()
//     });
//   }


  
  verificarEntidadActiva(entidadNombre: string, excluirId?: number): Observable<boolean> {
  let params = new HttpParams().set('entidadNombre', entidadNombre);
  if (excluirId != null) params = params.set('excluirId', String(excluirId));
  return this.http.get<boolean>(`${this.apiUrl}/existeEntidad`, { params });
}

//   obtenerFichaCompletaPorId(id: number): Observable<any> {
//   return this.http.get<any>(`${this.apiUrl}/obtenerFichaCompleta/${id}`);
// }




subirArchivos(formData: FormData): Observable<any> {
  return this.http.post(`${this.apiUrl}/adjuntar-archivo`, formData, {
    reportProgress: true, // Si quieres eventos de progreso
    observe: 'events' // O 'response' si solo quieres la respuesta final
  });
}

subirArchivos2(formData: FormData): Observable<any> {
  return this.http.post(`${this.apiUrl}/adjuntar-archivo2`, formData, {
     reportProgress: true,
    observe: 'events'

  });
}

eliminarArchivo(idArchivo: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/archivo/eliminar/${idArchivo}`);
}


 listarArchivos(idFicha: number): Observable<any[]> {
    const url = `${this.apiUrl}/fichas/${idFicha}/archivos`;
    return this.http.get<any[]>(url);
  }


   listarArchivos2(idFicha: number): Observable<any[]> {
    const url = `${this.apiUrl}/fichas/${idFicha}/archivos2`;
    return this.http.get<any[]>(url);
  }

  
listarArchivosSinCodUnico(idFicha: number, idInputFile: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/archivo/listar`, {
    params: {
      id_ficha: idFicha,
      id_input_file: idInputFile,
    }
  });
}



eliminarArchivo2(idArchivo: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/archivo/eliminar2/${idArchivo}`);
}



listarArchivos2SinCodUnico(idFicha: number, idInputFile: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/archivo/listar2`, {
    params: {
      id_ficha: idFicha,
      id_input_file: idInputFile,
    }
  });
}


getResumenPorRegion() {  
    return this.http.get<any>(`${this.apiUrl}/resumen-por-region`);

}


  obtenerFichasSeccion1(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/seccion1/listar`);
}


//   marcarFichaComoValidada(idFicha: number) {
//   return this.http.put<{ ok: boolean; mensaje: string; idFicha: number; flagValidar: string }>(
//     `${this.apiUrl}/marcar-validada/${idFicha}`, null
//   );
// }


marcarFichaComoValidada(idFicha: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/marcarValidada/${idFicha}`, {}, {
      headers: this.getHeaders()
    });
  }


///////////////////////////////////////////////////////////////////////////////


 guardarFichaSeccion2(data: any): Observable<any> { 
    const url = `${this.apiUrl}/guardarFichaSeccion2`;
    return this.http.post<any>(url, data);
  }


   guardarFichaSeccion4(data: any): Observable<any> { 
    const url = `${this.apiUrl}/guardarFichaSeccion4`;
    return this.http.post<any>(url, data);
  }

     guardarFichaSeccion5(data: any): Observable<any> { 
    const url = `${this.apiUrl}/guardarFichaSeccion5`;
    return this.http.post<any>(url, data);
       }

  validarFichaSeccion5(payload: any): Observable<void> {
    const url = `${this.apiUrl}/actualizarValidaS5`;
    return this.http.patch<void>(url, payload);
  }


     guardarFichaSeccion6(data: any): Observable<any> { 
    const url = `${this.apiUrl}/guardarFichaSeccion6`;
    return this.http.post<any>(url, data);
       }

        validarFichaSeccion6(payload: any): Observable<void> {
    const url = `${this.apiUrl}/actualizarValidaS6`;
    return this.http.patch<void>(url, payload);
  }


    validarFichaSeccion7(payload: any): Observable<void> {
    const url = `${this.apiUrl}/actualizarValidaS7`;
    return this.http.patch<void>(url, payload);
  }

    validarFichaSeccion8(payload: any): Observable<void> {
    const url = `${this.apiUrl}/actualizarValidaS8`;
    return this.http.patch<void>(url, payload);
  }


    validarFichaSeccion9(payload: any): Observable<void> {
    const url = `${this.apiUrl}/actualizarValidaS9`;
    return this.http.patch<void>(url, payload);
    }


  //    validarFichaSeccion4(payload: any): Observable<void> {
  //   const url = `${this.apiUrl}/actualizarValidaS4`;
  //   return this.http.patch<void>(url, payload);
  // }




    validarFichaSeccion2(payload: any): Observable<void> {
    const url = `${this.apiUrl}/actualizarValidaS2`;
    return this.http.patch<void>(url, payload);
  }

    guardarFichaSeccion7(data: any): Observable<any> { 
    const url = `${this.apiUrl}/guardarFichaSeccion7`;
    return this.http.post<any>(url, data);
       }

  guardarFichaSeccion8(data: any): Observable<any> { 
    const url = `${this.apiUrl}/guardarFichaSeccion8`;
    return this.http.post<any>(url, data);
  }





  obtenerFichaSeccion8(idFicha: number): Observable<any> {
  const url = `${this.apiUrl}/obtenerFichaSeccion8/${idFicha}`;
  return this.http.get<any>(url);
}

///////////////////////////


   guardarFichaSeccion9(data: any): Observable<any> { 
    const url = `${this.apiUrl}/guardarFichaSeccion9`;
    return this.http.post<any>(url, data);
       }

  obtenerFichaSeccion9(idFicha: number): Observable<any> {
  const url = `${this.apiUrl}/obtenerFichaSeccion9/${idFicha}`;
  return this.http.get<any>(url);
   }
 

   ///////////////////////////


  guardarFichaSeccion10(data: any): Observable<any> { 
    const url = `${this.apiUrl}/guardarFichaSeccion10`;
    return this.http.post<any>(url, data);
       }

  validarFichaSeccion10(payload: any): Observable<void> {
    const url = `${this.apiUrl}/actualizarValidaS10`;
    return this.http.patch<void>(url, payload);
  }


   //////////

   guardarFichaSeccion11(data: any): Observable<any> { 
    const url = `${this.apiUrl}/guardarFichaSeccion11`;
    return this.http.post<any>(url, data);
       }

  validarFichaSeccion11(payload: any): Observable<void> {
    const url = `${this.apiUrl}/actualizarValidaS11`;
    return this.http.patch<void>(url, payload);
  }

     //////////

   guardarFichaSeccion12(data: any): Observable<any> { 
    const url = `${this.apiUrl}/guardarFichaSeccion12`;
    return this.http.post<any>(url, data);
       }

  validarFichaSeccion12(payload: any): Observable<void> {
    const url = `${this.apiUrl}/actualizarValidaS12`;
    return this.http.patch<void>(url, payload);
  }


     //////////

   guardarFichaSeccion13(data: any): Observable<any> { 
    const url = `${this.apiUrl}/guardarFichaSeccion13`;
    return this.http.post<any>(url, data);
       }

  validarFichaSeccion13(payload: any): Observable<void> {
    const url = `${this.apiUrl}/actualizarValidaS13`;
    return this.http.patch<void>(url, payload);
  }


 ///////////////////

  guardarFichaSeccion1(data: any): Observable<any> { 
    const url = `${this.apiUrl}/guardarFichaSeccion1`;
    return this.http.post<any>(url, data);
       }


   validarFichaSeccion1(payload: any): Observable<void> {
    const url = `${this.apiUrl}/actualizarValidaS1`;
    return this.http.patch<any>(url, payload);
  }

  /////////////////////////////



     guardarFichaSeccion3(data: any): Observable<any> { 
    const url = `${this.apiUrl}/guardarFichaSeccion3`;
    return this.http.post<any>(url, data);
  }

  validarFichaSeccion3(payload: any): Observable<void> {
    const url = `${this.apiUrl}/actualizarValidaS3`;
    return this.http.patch<void>(url, payload);
  }

///////////////////////tabla estudio S8////////////////////





    // ==========================================================
  // === MÉTODOS PARA LA FICHA PRINCIPAL (CABECERA)         ===
  // ==========================================================


  guardarFicha(fichaData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/guardarFicha`, fichaData);
  }
  
  actualizarFicha(id: number, fichaData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/actualizarFicha/${id}`, fichaData);
  }
  
  // guardarFichaCompleta(dtoCompleto: any): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/guardarFichaCompleta`, dtoCompleto);
  // }

    actualizarFichaComoCompleta(idFicha: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/marcarcompleta/${idFicha}`, {});
  }
  
    verificarEntidadExistente(nomEntidad: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/existeEntidad`, {
      params: { nomEntidad }
    });
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



 eliminarAgua(id29: number, idFicha: number) {
  const url = `${this.apiUrl}/agua/${id29}?idFicha=${idFicha}`;
  return this.http.delete(url);
}
  

descargarArchivoPorId(idArchivo: number): Observable<Blob> {
  // URL RESTful que identifica el recurso exacto.
  const url = `${this.apiUrl}/archivo/${idArchivo}/descargar`; 
  
  //  GET y indicamos que la respuesta es de tipo 'blob'.
  return this.http.get(url, { responseType: 'blob' });
}

descargarArchivo2PorId(idArchivo: number): Observable<Blob> {
  // URL RESTful que identifica el recurso exacto.
  const url = `${this.apiUrl}/archivo/${idArchivo}/descargar2`; 
  
  //  GET y indicamos que la respuesta es de tipo 'blob'.
  return this.http.get(url, { responseType: 'blob' });
}


descargarArchivo3PorId(idArchivo: number): Observable<Blob> {
  // URL RESTful que identifica el recurso exacto.
  const url = `${this.apiUrl}/archivo/${idArchivo}/descargar3`; 
  
  //  GET y indicamos que la respuesta es de tipo 'blob'.
  return this.http.get(url, { responseType: 'blob' });
}


  //////////////////////////////////////////////////////////////


  darBajaFicha(idFicha: number, observacion: string) {
  const payload = {
    idFicha,
    estadoRegistro: 'X',           
    observacionBaja: observacion,  
  };
  return this.http.put<any>(`${this.apiUrl}/fichas/${idFicha}/baja`, payload);
}

  validarFichaSeccion4(payload: any): Observable<void> {
    const url = `${this.apiUrl}/actualizarValidaS4`;
    return this.http.patch<void>(url, payload);
  }
}



