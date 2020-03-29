const connection = require('../database/connection');


module.exports = {
    async create(request,response) {
        const { id } = request.body;

        const doadores = await connection('doadores')
            .where('id', id)
            .select('name')
            .first();

        if (!doadores) {
            return response.status(400).json({ error : 'Não existe Doador com esta IDENTIFICAÇÃO'});

        }

        return response.json(doadores);
    },
};