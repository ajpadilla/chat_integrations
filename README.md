
## 🚀 Environment Setup

### 🐳 herramientas necesarias

1. [Install Node](https://kinsta.com/es/blog/como-instalar-node-js/)
2. [Install MongoDB](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/#additional-information)
3. Clonar el proyecto: `https://github.com/ajpadilla/chat_integrations`
4. Crear una cuenta en Twilio (https://dicksondata.com/support/article/creating-a-twilio-account)

### 🛠️ Environment configuración

1. Crear un archivo env local (`cp .env .env.local`) si quieres modificar algún parámetro.
Para el ejemplo se utilizara la api Twilio y asi poder enviar mensajes, por lo cual se dejara los números habilitados para este proyecto de prueba.


### 🔥 Ejecución de aplicaciones

1. Instale todas las dependencias del proyecto ejecutando: `npm install`
2. Entonces tendrás la aplicación disponible por defecto en el puerto 3000:
    1. [GET] http://localhost:3000/messages
    2.   [POST] http://localhost:3000/messages (se debe enviar 2 parametros en el cuerpo de la peticion {
         "body": "",
         "author": ""
         })

### ✅ Ejecución de pruebas
1. Las pruebas de intregración se encuentran dentro de la carpeta e2e, ejecuta el siguiente comando para correr los test de intregración: npm run test:e2e. Tambien se peude ejecutar un los test uno a la vez ejecutando npm run test services/twilio.service o npm run test services/message.service
2. Las pruebas unitarias se encuentran dentro de la carpeta services, ejecuta el siguiente comando para correr los test unitarios: npm run test 


### ✅ Base de datos seleccionada
Se seleccionó una base de datos no relacional porque son mucho más flexibles a la hora de crear esquemas de información, lo que las convierte en una solución ideal para el almacenamiento y gestión de datos no estructurados. Ofrecen una mayor escalabilidad. Pueden soportar mayores volúmenes de datos y añadir mayor capacidad añadiendo nuevos módulos de software, sin necesidad de añadir nuevos servidores.