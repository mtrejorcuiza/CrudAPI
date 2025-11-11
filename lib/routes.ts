import { MateriaRoutes } from "./modules/materia/routes/materia.routes";
import { AreaRoutes } from "./modules/area/routes/area.routes";
import { UsuarioRoutes } from "./modules/usuario/routes/usuario.routes";
import { CicloEscolarRoutes } from "./modules/cicloEscolar/routes/cicloEscolar.routes";
import { CarreraRoutes } from "./modules/carrera/routes/carrera.routers";

export class Routes {

    private usuarioRoutes: UsuarioRoutes = new UsuarioRoutes();
    private areaRoutes: AreaRoutes = new AreaRoutes();
    private materiaRoutes: MateriaRoutes= new MateriaRoutes();
    private cicloEscolarRoutes: CicloEscolarRoutes = new CicloEscolarRoutes();
    private carreraRoutes: CarreraRoutes = new CarreraRoutes();

    public routes(app): void {
        this.usuarioRoutes.routes(app);
        this.areaRoutes.routes(app);
        this.materiaRoutes.routes(app);
        this.cicloEscolarRoutes.routes(app);
        this.carreraRoutes.routes(app);
    }
}