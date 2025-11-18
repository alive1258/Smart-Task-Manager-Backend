import { Router } from "express";
import { UserRoutes } from "../modules/users/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { TeamRoutes } from "../modules/teams/team.route";
import { ProjectRoutes } from "../modules/projects/project.route";
import { TaskRoutes } from "../modules/task/task.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    router: UserRoutes,
  },

  {
    path: "/auth",
    router: AuthRoutes,
  },
  {
    path: "/team",
    router: TeamRoutes,
  },
  {
    path: "/projects",
    router: ProjectRoutes,
  },
  {
    path: "/tasks",
    router: TaskRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
