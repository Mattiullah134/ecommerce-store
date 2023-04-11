// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    const availAblePin = {
        "54000": ["LAHORE G.P.O", "PAKISTAN"],
        "53720": ["BAHRIA TOWN", "PAKISTAN"],
        "54780": ["AWAN COLONEY", "PAKISTAN"],
        "54792": ["LAHORE DEFENCE HOUSING SOICETY", "PAKISTAN"],
    }
    res.status(200).json(availAblePin)
}