import dbConnect from "@/db/connect.js";
import Place from "@/db/models/Place.js";

/*---------------------------------------------------------------------------------
| Routen-Handling für GET/POST-Request
|----------------------------------------------------------------------------------
| GET:
| - Client/Frontend  : useSWR('api/places') triggert GET-Request (-->places/index.js)
| - ServerAPI/Backend: Abrufen aller Einträge der DB mit Model.find(),
|                      Response der Einträge im JSON-Format an den Client
| POST:
| - Client/Frontend  : handleAddPlace() triggert POST-Request (-->places/create.js)
| - ServerAPI/Backend: Erstellen eines Eintrags in der DB mit Model.create(),
|                      Response an den Client
*/
export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find();

    if (!places) {
      response.status(404).json({ status: "Not found" });
      return;
    }

    response.status(200).json(places);
    return;
  }

  if (request.method === "POST") {
    const placeData = request.body;

    await Place.create(placeData);

    response.status(201).json({ status: "Place created" });
    return;
  }

  response.status(405).json({ status: "Method not Allowed" });
}
