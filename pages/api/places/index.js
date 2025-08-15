import dbConnect from "@/db/connect.js";
import Place from "@/db/models/Place.js";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find();

    if (!places) {
      return response.status(404).json({ status: "Not found" });
    }
    return response.status(200).json(places);
  }

  if (request.method === "POST") {
    const placeData = request.body;
    await Place.create(placeData);

    return response.status(201).json({ status: "Place created" });
  }

  response.status(405).json({ status: "Method not Allowed" });
}
