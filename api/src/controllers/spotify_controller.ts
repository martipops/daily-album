import type { Response, Request } from "express"
import * as SpotifyService from "../services/spotify_service.js"

export const getRefreshToken = (req: Request, res: Response) => {
    try{
        const { clientId, code, verifier } = req.body;
        const refresh = SpotifyService.getRefreshToken(clientId, code, verifier);
        res.status(201).json(refresh);
    } catch (err: any){
        res.status(500).json({ error: err.message || "Something went wrong" });
    }
}