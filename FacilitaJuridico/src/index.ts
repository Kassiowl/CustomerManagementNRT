import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { RegisterClientUseCase } from "./core/UseCases/register_client_use_case.js";
import { ClientPostgresImpl } from "./core/InterfaceImplementation/ClientPostgresImpl.js";
import Person from "./core/Entities/Person.js";
import Coordinate from "./core/Entities/Coordinate.js";
import bodyParser from "body-parser";
import { GetAllClientsUseCase } from "./core/UseCases/get_all_clients_use_case.js";
import { GetClientBestRouteUseCase } from "./core/UseCases/get_clients_best_route_use_case.js"
import cors from "cors";
import RouteImpl from "./core/InterfaceImplementation/RouteImpl.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use( bodyParser.json() );      
app.use(express.urlencoded({ extended: true }))
app.use(express.json());      
app.use(cors())

app.get("/Clients", async (req: Request, res: Response) => {
  var client_impl = new ClientPostgresImpl()
  var get_clients_use_case = new GetAllClientsUseCase(client_impl)
  var clients = await get_clients_use_case.run()

  var route_impl = new RouteImpl()
  var get_clients_best_route_use_case = new GetClientBestRouteUseCase(route_impl)
  var best_route = get_clients_best_route_use_case.run(clients)

  res.json({'clients': clients, 'route': best_route})
});


app.post("/RegisterClient", (req: Request, res: Response) => {

  var client_coordinate: Coordinate = {
    coordinate_x: req.body.coordinate_x,
    coordinate_y: req.body.coordinate_y
  }
  
  var client: Person = {
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    age: Number(req.body.age),
    address: req.body.address,
    coordinate: client_coordinate
    
  }

  var client_impl = new ClientPostgresImpl()
  var register_cliente_use_case = new RegisterClientUseCase(client_impl)
  var is_registred = register_cliente_use_case.run(client)
  if(is_registred){
    res.json({ success: is_registred });
  }
  else{

    res.status(500).json({message: "Server error", status: 500})
  }
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});