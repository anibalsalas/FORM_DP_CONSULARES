export const environment = {
    api_url: 'http://localhost:8080',

    client: 'bcbb8873066b468a8efe973c49150c3d',
    urlSso:'http://172.30.1.97:7002/login',
    continuar: 'http://localhost:4200/ocmre/auth/next',
    apiUrlAuth: 'http://172.30.1.97:7002/api/', // Api del sistema de autenticación
    apiUrlAutz: 'http://172.30.1.97:7002/api-autz/', // Api del sistema de autorización
    varTipo:'LS',// LS=LocalStaorage, SS=SesionStorage
    varToken: 'dp_mre_acctok',
    varRefToken: 'dp_mre_reftok',
    varPkce: 'pkce_dp_mre',
    urlWeb:'http://localhost:4200/ocmre/',
    pathAuth: '/auth',

    // pathInicial: '/dashboard/ficha1/'

    // Roles:
    rolAdministrador:'ADMINISTRADOR_MRE',
    rolComisionado:'COMISIONADO_MRE',
    rolEspecialista:'ESPECIALISTA_MRE',
    rolOficinaConsular:'OFICINA_CONSULAR_MRE',
}


