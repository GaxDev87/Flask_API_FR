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


    //#RESOURCE ROUTES#//

    route("Documents", "routes/resources/Documents.tsx");
    route("Videos", "routes/resources/Videos.tsx");

    //#COURSE ROUTES#//

    // route("Python", "routes/cursos/python/python.tsx");  
    //     route("Python_m1", "routes/cursos/python/python_m1.tsx");
    //             route("Python_m2", "routes/cursos/python/python_m2.tsx");
    //                             route("Python_m3", "routes/cursos/python/python_m3.tsx");

    
    // route("Ansible", "routes/cursos/ansible/ansible.tsx");
    //     route("Ansible_m1", "routes/cursos/ansible/ansible_m1.tsx");
    //             route("Ansible_m2", "routes/cursos/ansible/ansible_m2.tsx");
    //                             route("Ansible_m3", "routes/cursos/ansible/ansible_m3.tsx");
    
    // route("Rundeck", "routes/cursos/rundeck/rundeck.tsx");
    //   route("Rundeck_m1", "routes/cursos/rundeck/rundeck_m1.tsx");
    //             route("Rundeck_m2", "routes/cursos/rundeck/rundeck_m2.tsx");
    //                             route("Rundeck_m3", "routes/cursos/rundeck/rundeck_m3.tsx");
    
    // route("Bitbucket", "routes/cursos/bitbucket/bitbucket.tsx");    
    //     route("Bitbucket_m1", "routes/cursos/bitbucket/bitbucket_m1.tsx");
    //             route("Bitbucket_m2", "routes/cursos/bitbucket/bitbucket_m2.tsx");
    //                             route("Bitbucket_m3", "routes/cursos/bitbucket/bitbucket_m3.tsx");

    // route("GIT", "routes/cursos/git/git.tsx");    
    //     route("Git_m1", "routes/cursos/git/git_m1.tsx");
    //             route("Git_m2", "routes/cursos/git/git_m2.tsx");
    //                             route("Git_m3", "routes/cursos/git/git_m3.tsx");



                

    // route("Everauto", "routes/cursos/everauto/everauto.tsx");    
    //     route("Everauto_m1", "routes/cursos/everauto/everauto_m1.tsx");
    //             route("Everauto_m2", "routes/cursos/everauto/everauto_m2.tsx");
    //                             route("Everauto_m3", "routes/cursos/everauto/everauto_m3.tsx");



    // route("Terraform", "routes/cursos/terraform/terraform.tsx");
    //     route("Terraform_m1", "routes/cursos/terraform/terraform_m1.tsx");
    //             route("Terraform_m2", "routes/cursos/terraform/terraform_m2.tsx");
    //                             route("Terraform_m3", "routes/cursos/terraform/terraform_m3.tsx");


    // route("Docker-Kubernetes", "routes/cursos/docker-kubernetes/docker-kubernetes.tsx");
    //     route("Docker-Kubernetes_m1", "routes/cursos/docker-kubernetes/docker-kubernetes_m1.tsx");
    //             route("Docker-Kubernetes_m2", "routes/cursos/docker-kubernetes/docker-kubernetes_m2.tsx");
    //                             route("Docker-Kubernetes_m3", "routes/cursos/docker-kubernetes/docker-kubernetes_m3.tsx");


/// SURVEY ROUTE//
    route("Courses_survey", "routes/courses/courses_survey.tsx");



    // route("concerts", "concerts/layout.tsx", () => {
    //   route("", "concerts/home.tsx", { index: true });
    //   route("trending", "concerts/trending.tsx");
    //   route(":city", "concerts/city.tsx");
    // });
  });
},
};
