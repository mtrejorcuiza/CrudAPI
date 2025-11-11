import { Request, Response } from 'express';
import * as _ from 'lodash';
import Materia from '../models/materia.model';

export class MateriaController {
    crearMateria = (req: Request, res: Response) => {        
        const nuevaMateria = new Materia(
            {               
                materia: req.body.materia, 
                creditos: req.body.creditos             
            }
        );
        nuevaMateria.save()
        .then(materiaCreada => {
            res.status(201).json(
                {
                    ok: true,
                    Materia: materiaCreada,
                    message: 'Materia creada'
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

    obtenerMaterias = (req: Request, res: Response) => { 
        Materia.find()
        .then(materias => {
            res.status(200).json(
                {
                    ok: true,
                    materias: materias
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

    actualizarMateria = (req: Request, res: Response) => { 
        const materia = _.pick(req.body, 'materia','creditos');    
        Materia.findByIdAndUpdate(req.params.id, materia)
        .then(async materiaActualizada => {                                   
            res.status(200).json({
                ok: true,
                Materia: materiaActualizada,                    
                message: 'Materia Actualizada'
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

    eliminarMateria = (req: Request, res: Response) => {
        Materia.findByIdAndDelete(req.params.id)
        .then(materiaEliminada => {
            res.status(200).json({
                ok: true,                                 
                message: 'Materia Eliminada'
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