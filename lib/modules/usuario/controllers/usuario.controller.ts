import { Request, Response } from 'express';
import * as _ from 'lodash';
import Usuario from '../models/usuario.model';
import { DEFAULT_PASSWORD } from '../../../config';

export class UsuarioController {
    crearUsuario = (req: Request, res: Response) => {        
        const nuevoUsuario = new Usuario(
            {
                apellidoPaterno: req.body.apellidoPaterno,
                apellidoMaterno: req.body.apellidoMaterno,
                nombre: req.body.nombre,
                userName: req.body.userName,
                password: DEFAULT_PASSWORD,
                role: req.body.role
            }
        );
        nuevoUsuario.save()
        .then(usuarioCreado => {
            res.status(201).json(
                {
                    ok: true,
                    usuario: usuarioCreado,
                    message: 'Usuario cread0'
                }
            );
        })
        .catch(error => {
           res.status(400).json({
                ok: false,
                error: error.name,
                message: error.message
            });
        });
    }

    obtenerUsuarios = (req: Request, res: Response) => { 
        Usuario.find()
        .then(usuarios => {
            res.status(200).json(
                {
                    ok: true,
                    usuarios: usuarios
                }
            );
        })
        .catch(error => {
            return res.status(400).json({
                ok: false,
                error: error.name,
                message: error.message
            });
        });
    }

    actualizarUsuario = (req: Request, res: Response) => { 
        const usuario = _.pick(req.body, 'apellidoPaterno','apellidoMaterno','nombre','role');        
        Usuario.findByIdAndUpdate(req.params.id, usuario)
        .then(async usuarioActualizado => {                                   
            res.status(200).json({
                ok: true,
                usuario: usuarioActualizado,                    
                message: 'Usuario Actualizado'
            });
        })
        .catch(error => {
            res.status(400).json({
                ok: false,
                error: error.name,
                message: error.message
            });
        });
    }

    eliminarUsuario = (req: Request, res: Response) => {
        Usuario.findByIdAndDelete(req.params.id)
        .then(usuarioEliminado => {
            res.status(200).json({
                ok: true,                                 
                message: 'Usuario Eliminado'
            });
        })
        .catch(error => {
            res.status(400).json({
                ok: false,
                error: error.name,
                message: error.message
            });
        })
    }

    cambiarPassword = async (req: Request, res: Response) => {
        if(req.body.password && req.body.newPassword) {
            const mUsuario = await Usuario.findById(req.params.id);
            if(mUsuario) {
                if(String(mUsuario.password) === String(req.body.password)) {
                    Usuario.findByIdAndUpdate(req.params.id,{
                        password: String(req.body.newPassword)
                    })
                    .exec()
                    .then(usuarioActualizado => {
                        res.status(200).json(
                            {
                                ok: true,
                                usuario: usuarioActualizado,
                                message: 'Contraseña Actualizada'
                            }
                        );
                    })
                    .catch(error => {
                        res.status(400).json({
                            ok: false,
                            error: error.name,
                            message: error.message
                        });
                    });
                } else {
                    res.status(400).json(
                        {
                            ok: false,
                            message: 'Contraseña actual no válida'
                        }
                    );    
                }
            } else {
                res.status(400).json(
                    {
                        ok: false,
                        message: 'Usuario no válido'
                    }
                );  
            }
        } else {
            res.status(400).json(
                {
                    ok: false,
                    message: 'Datos incompletos'
                }
            );
        }
    }

    reestablecerPassword = async (req: Request, res: Response) => {
        const mUsuario = await Usuario.findById(req.params.id);
        if(mUsuario) {
            Usuario.findByIdAndUpdate(req.params.id, 
                {
                    password: DEFAULT_PASSWORD
                }
            )
            .then(usuarioActualizado => {
                res.status(200).json(
                    {
                        usuario: usuarioActualizado,
                        message: 'Contraseña Reestablecida'
                    }
                );
            })
            .catch(error => {
                res.status(400).json({
                    ok: false,
                    error: error.name,
                    message: error.message
                });
            });
        } else {
            res.status(404).json(
                {
                    ok: false,
                    message: 'Usuario no encontrado'
                }
            );
        }
    }

    login = (req: Request, res: Response) => {
        Usuario.findOne({
            userName: req.body.userName,
            active: true
        })
        .then(usuarioEncontrado => {
            if(usuarioEncontrado) {
                if(String(usuarioEncontrado.password) === String(req.body.password)) {
                    res.status(200).json(
                        {
                            ok: true,
                            usuario: {
                                _id: usuarioEncontrado._id,
                                apellidoPaterno: usuarioEncontrado.apellidoPaterno,
                                apellidoMaterno: usuarioEncontrado.apellidoMaterno,
                                nombre: usuarioEncontrado.nombre,
                                role: usuarioEncontrado.role
                            },
                            message: 'Acceso válido'
                        }
                    );
                } else {
                    res.status(401).json(
                        {
                            ok: false,
                            message: 'Usuario no válido'
                        }
                    );
                }
            } else {
                res.status(401).json(
                    {
                        ok: false,
                        message: 'Usuario no válido'
                    }
                );
            }
        })
        .catch(error => {
            res.status(400).json({
                ok: false,
                error: error.name,
                message: error.message
            });
        })
    }
}