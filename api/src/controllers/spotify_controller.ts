import type { Response, Request } from "express"
import * as SpotifyService from "../services/spotify_service.js"

export const getRefreshToken = (req: Request, res: Response) => {
    try{
        console.log(req.body);
        const { client_id, code, code_verifier } = req.body;
        const refresh = SpotifyService.getRefreshToken(client_id, code, code_verifier);
        res.status(201).json(refresh);
    } catch (err: any){
        res.status(500).json({ error: err.message || "Something went wrong" });
    }
}