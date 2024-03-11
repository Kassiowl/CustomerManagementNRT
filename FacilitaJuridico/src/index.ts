import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { RegisterClientUseCase } from "./core/UseCases/register_client_use_case.js";
import { ClientPostgresImpl } from "./core/InterfaceImplementation/ClientPostgresImpl.js";
import Person from "./core/Entities/Person.js";
import bodyParser from "body-parser";
import { GetAllClientsUseCase } from "./core/UseCases/get_all_clients_use_case.js";
import cors from "cors";

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
  res.json({'clients': clients})
});

app.post("/RegisterClient", (req: Request, res: Response) => {

  var client: Person = {
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    age: Number(req.body.age),
    address: req.body.address

  }

  var client_impl = new ClientPostgresImpl()
  var register_cliente_use_case = new RegisterClientUseCase(client_impl)
  var is_registred = register_cliente_use_case.run(client)
  if(is_registred){
    res.json({ success: is_registred });
  }
  res.status(500).json({message: "Server error", status: 500})
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});