const express = require('express');

const router = express.Router();

router.post("/updateMove", (req, res) => {
    const { dict, json, selected, activePiece, history } = req.body;

    const checkPiece = (selected) => {
        let splitPiece = selected.value.split("-")[1];
        switch (splitPiece) {
            case 'P1': case 'P2': return 'P';
            case 'H1': return 'H1';
            case 'H2': return 'H2';
            case 'H3': return 'H3';
            default: return null
        }
    }

    const checkMove = (dict, selected) => {
        let piece = checkPiece(selected);
        switch (piece) {
            case 'P':
                if (selected.key + 5 === dict.key) {
                    history?.push(`${selected.value}:F`)
                    return true;
                } else if (selected.key - 5 === dict.key) {
                    history?.push(`${selected.value}:B`)
                    return true;
                } else if (selected.key + 1 === dict.key) {
                    history?.push(`${selected.value}:R`)
                    return true;
                } else if (selected.key - 1 === dict.key) {
                    history?.push(`${selected.value}:L`)
                    return true;
                } else {
                    return false;
                }
            case 'H1':
                if (selected.key + 10 === dict.key) {
                    history?.push(`${selected.value}:F`)
                    return true;
                } else if (selected.key - 10 === dict.key) {
                    history?.push(`${selected.value}:B`)
                    return true;
                } else if (selected.key + 2 === dict.key) {
                    history?.push(`${selected.value}:R`)
                    return true;
                } else if (selected.key - 2 === dict.key) {
                    history?.push(`${selected.value}:L`)
                    return true;
                } else {
                    return false;
                }
            case 'H2': if (([3, 11, 15, 23].includes(dict.key))) {
                if (dict.key > selected.key) {
                    if (String(dict.key).split('')[1] > String(selected.key).split('')[1]) {
                        history?.push(`${selected.value}:FR`)
                    } else {
                        history?.push(`${selected.value}:FL`)
                    }
                } else {
                    if (String(dict.key).split('')[1] > String(selected.key).split('')[1]) {
                        history?.push(`${selected.value}:BR`)
                    } else {
                        history?.push(`${selected.value}:BL`)
                    }
                }
                return true;
            } else {
                return false;
            }

            default: return false;
        }
    }

    const setActivePiece = (activePiece) => {
        switch (activePiece) {
            case 'A': return 'B';
            case 'B': return 'A';
            default: return null;
        }
    }

    let boolanValue = checkMove(dict, selected);

    if (boolanValue) {
        json[Number(dict.key) - 1] = {
            key: dict.key,
            value: selected?.value
        };
        json[Number(selected.key) - 1] = {
            key: selected.key,
            value: ""
        };
        res.status(200).json({ json, activePiece: setActivePiece(activePiece), history });
    } else {
        res.status(400).json({ message: "Bad Move", activePiece });
    }

});

module.exports = router;