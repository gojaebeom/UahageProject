"use strict"
import { findOne } from "./space.repository.js";

export async function show( req, res ){
    const space_code = req.params.space_code;
    const { success , message, data, error } = await findOne( space_code );
    {
        data:[
            list
        ]
    }
    success === true ? 
    res.status(200).json({ message: message , data : data}) : 
    res.status(500).json({ message: message , error : error });
}