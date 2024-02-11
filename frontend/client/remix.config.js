/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
  serverDependenciesToBundle: [/^react-icons/],

routes(defineRoutes) {
  return defineRoutes((route) => {

    route("Documents", "routes/resources/Documents.tsx");
    route("Videos", "routes/resources/Videos.tsx");

    route("Python", "routes/cursos/python/python.tsx");  
    route("Ansible", "routes/cursos/ansible/ansible.tsx");
    route("Rundeck", "routes/cursos/rundeck/rundeck.tsx");

    route("Terraform", "routes/cursos/terraform/terraform.tsx");
    route("Kubernetes", "routes/cursos/kubernetes/kubernetes.tsx");


    // route("concerts", "concerts/layout.tsx", () => {
    //   route("", "concerts/home.tsx", { index: true });
    //   route("trending", "concerts/trending.tsx");
    //   route(":city", "concerts/city.tsx");
    // });
  });
},
};
