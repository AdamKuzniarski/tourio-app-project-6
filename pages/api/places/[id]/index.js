import dbConnect from "@/db/connect.js";
import Place from "@/db/models/Place.js";

/*---------------------------------------------------------------------------------
| Routen-Handling für GET/PUT/DELETE-Request
|----------------------------------------------------------------------------------
| GET:
| - Client/Frontend  : useSWR('api/places/${id}') triggert GET-Request (-->places/[id]/index.js)
| - ServerAPI/Backend: Abrufen eines DB-Eintrags mit Model.findById(id),
|                      Response des Eintrags im JSON-Format an den Client
| PUT:
| - Client/Frontend  : handleEditPlace() triggert PUT-Request (-->places/[id]/edit.js)
| - ServerAPI/Backend: Ändern eines DB-Eintrags mit Model.findByIdAndUpdate(id, data),
|                      Response an den Client
| DELETE:
| - Client/Frontend  : deletePlace() triggert DELETE-Request (-->places/[id]/index.js)
| - ServerAPI/Backend: Löschen eines DB-Eintrags mit Model.findByIdAndDelete(id),
|                      Response an den Client
*/
export default async function handler(request, response) {
   await dbConnect();
   
  const { id } = request.query;

  if (request.method === "GET") {
    const place = await Place.findById(id);

    if (!place) {
      response.status(404).json({ message: "Place not found" });
      return;
    }

    response.status(200).json(place);
    return;
  }

  if (request.method === "PUT") {
    const placeData = request.body;

    await Place.findByIdAndUpdate(id, placeData);

    response.status(200).json({ message: `Place updated` });
    return;
  }

  if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);

    response.status(200).json({ message: `Place deleted` });
    return;
  }

  response.status(405).json({ message: "Method not Allowed" });
}
