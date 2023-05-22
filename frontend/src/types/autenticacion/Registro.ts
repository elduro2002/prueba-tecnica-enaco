export interface RegistroForm {
    nombre:     string
    usuario:    string
    contrasena: string
}

export interface RegistroRespuesta {
    nombre:  string;
    usuario: string;
    id:      string;
    token:     string;
}


export interface RefrescarRespuesta {
    id:      string;
    nombre:  string;
    usuario: string;
}
