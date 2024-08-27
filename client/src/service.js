import axios from 'axios';

export const updateMove = async (dict, json, selected, activePiece, history) => {
    return await axios.post("http://localhost:8000/api/updateMove", 
        {
            dict,
            json,
            selected,
            activePiece,
            history
        }
    )
}