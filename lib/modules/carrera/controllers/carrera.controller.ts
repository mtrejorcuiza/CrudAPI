import { Request, Response } from 'express';
import * as _ from 'lodash';
import Carrera from '../models/carrera.model';
import { DEFAULT_PASSWORD } from '../../../config';

export class CarreraController {
    crearCarrera = (req: Request, res: Response) => {        
        const nuevaCarrera = new Carrera(
            {               
                carrera: req.body.carrera               
            }
        );
        nuevaCarrera.save()
        .then(carreraCreada => {
            res.status(201).json(
                {
                    ok: true,
                    carrera: carreraCreada,
                    message: 'Carrera creada'
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

    obtenerCarreras = (req: Request, res: Response) => { 
        Carrera.find()
        .then(carreras => {
            res.status(200).json(
                {
                    ok: true,
                    carreras: carreras
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

    actualizarCarrera = (req: Request, res: Response) => { 
        const carrera = _.pick(req.body, 'carrera');        
        Carrera.findByIdAndUpdate(req.params.id, carrera)
        .then(async carreraActualizada => {                                   
            res.status(200).json({
                ok: true,
                carrera: carreraActualizada,                    
                message: 'Carrera Actualizada'
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

    eliminarCarrera = (req: Request, res: Response) => {
        Carrera.findByIdAndDelete(req.params.id)
        .then(carreraEliminada => {
            res.status(200).json({
                ok: true,                                 
                message: 'carrera Eliminada'
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
}