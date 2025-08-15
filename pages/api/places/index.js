import dbConnect from "@/db/connect.js";
import Place from "@/db/models/Place.js";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find();

    if (!places) {
      response.status(404).json({ status: "Not found" });
      return;
    }
    return response.status(200).json(places);
  }

  response.status(405).json({ status: "Method not Allowed" });
}
