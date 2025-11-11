import { Request, Response } from 'express';
import * as _ from 'lodash';
import CicloEscolar from '../models/cicloEscolar.model';
import { DEFAULT_PASSWORD } from '../../../config';

export class CicloEscolarController {
    crearCicloEscolar = (req: Request, res: Response) => {        
        const nuevaCicloEscolar = new CicloEscolar(
            {               
                cicloEscolar: req.body.cicloEscolar               
            }
        );
        nuevaCicloEscolar.save()
        .then(cicloEscolarCreado => {
            res.status(201).json(
                {
                    ok: true,
                    cicloEscolar: cicloEscolarCreado,
                    message: 'Ciclo Escolar creado'
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

    obtenerCicloEscolar = (req: Request, res: Response) => { 
        CicloEscolar.find()
        .then(cicloEscolar => {
            res.status(200).json(
                {
                    ok: true,
                    cicloEscolar: cicloEscolar
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

    actualizarCicloEscolar = (req: Request, res: Response) => { 
        const cicloEscolar = _.pick(req.body, 'cicloEscolar');        
        CicloEscolar.findByIdAndUpdate(req.params.id, cicloEscolar)
        .then(async cicloEscolarActualizado => {                                   
            res.status(200).json({
                ok: true,
                cicloEscolar: cicloEscolarActualizado,                    
                message: 'Ciclo Escolar Actualizado'
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

    eliminarCicloEscolar = (req: Request, res: Response) => {
        CicloEscolar.findByIdAndDelete(req.params.id)
        .then(cicloEscolarEliminado => {
            res.status(200).json({
                ok: true,                                 
                message: 'Ciclo Escolar Eliminado'
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