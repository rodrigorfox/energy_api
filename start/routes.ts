/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    // Route resouce contem o crud de medições 
    Route.resource('measurements', 'MeasurementsController')
    // Create-may é uma rota personalizada para criar medições em massa que recebe um json para popular o banco de dados
    Route.post('/measurements/create-many', 'MeasurementsController.createMany')
    // Rota para retornar todos os dispositivos que contém medições salvas
    Route.get('/devices', 'MeasurementsController.findAvailableDevices')
    // Rota para trazer os dados agregados
    Route.get('/device/:deviceId/measurements', 'MeasurementsController.findMensurements')
}).prefix('/api')