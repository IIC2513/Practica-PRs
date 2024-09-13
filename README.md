# Práctica Pull Requests (PRs)

Este repositorio tiene como objetivo que puedas practicar cómo hacer Pull Requests, ya que esperamos que durante el desarrollo del proyecto del curso (y a futuro) te acostumbres a utilizar una *branch* de Git para cada *feature* que desarrolles y que la revisión de este código se realice por medio de la interfaz de GitHub.

**Puedes encontrar más información sobre *branches*, PRs y la metodología de desarrollo Gitflow o Github flow en el curso en [este tutorial de Atlassian](https://www.atlassian.com/es/git/tutorials/comparing-workflows/gitflow-workflow) y [esta sección de GitHub Docs](https://docs.github.com/en/get-started/quickstart/github-flow).**

En general, existen dos escenarios:
1. Si puedes hacer *push* al repositorio directamente (por ejemplo, si tú creaste el repo o te dieron ese nivel de permiso): clonas el repositorio, creas una rama, haces los cambios en esa rama, los subes y haces la PR con esa rama hacia la rama objetivo.
2. No puedes hacer *push* al repositorio directamente (por ejemplo, en los repositorios de Syllabus o este mismo repositorio): haces un *fork*, clonas ese repositorio, haces los cambios en la rama que quieras modificar, los subes y haces la PR desde tu *fork* hacia el repositorio objetivo.

En este caso, tendrás que usar la segunda alternativa, pero durante el proyecto podrás usar la segunda 🤓

### Instrucciones

Recuerda utilizar lo que sabes sobre *branches* para crear tu propio espacio de trabajo local, modificar y agregar los archivos pedidos, y luego subir tu Pull Request para que sea revisada. Estos son los archivos que tu PR deberá modificar:

* Agrega un archivo `*.html` (aunque puede ser de cualquier tipo) a la carpeta `personas/` con tu usuario de GitHub como nombre. Por ejemplo, mi usuario es **aaossa**, así que mi archivo se llamará... `aaossa.html`. Puedes ver los que ya existen en [la carpeta](https://github.com/IIC2513/Practica-PRs/tree/main/personas) o [la página](https://iic2513.github.io/Practica-PRs/) e inspirarte en esos.
* Agrega tu usuario en el archivo `participantes.txt`. Deberás respetar el **orden alfabético** al agregarlo (de la A la Z, ignoremos si es mayúscula o no).
* Puede que al momento de subir tu Pull Request, te indique que existen conflictos que deben ser resueltos en el archivo `participantes.txt`, ya que es un archivo que está siendo modificado por varias personas al mismo tiempo. Debes seleccionar la opción de _Resolve conflicts_ y editar el archivo para resolver el conflicto, asegurandote de que **todos los nombres de usuario presentes** se mantengan en el archivo final respetando el orden alfabético pedido. 

Una vez que hagas tu Pull Request, automáticamente se le asginará una etiqueta con tu semestre y se agregará a [@aaossa](https://github.com/aaossa/) como *reviewer*. Luego de que tus cambios sean revisados, se hará *merge* de tu Pull Request y habrás completado tu primera PR :sunglasses:. Una vez que esto suceda, probablemente después de un minuto, deberías poder encontrar tu foto en [la página web de este repositorio](https://iic2513.github.io/Practica-PRs/).

 ### Dudas o problemas

Si no recuerdas algo o quieres saber más, puedes preguntar en las issues del Syllabus del curso :)
