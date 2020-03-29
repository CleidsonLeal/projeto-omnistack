const connection = require('../database/connection');

module.exports = {
    async index(request,response){
        const doadores_id = request.headers.authorization;

        const necessidades = await connection('necessidades')
            .where('doadores_id', doadores_id)
            .select('*');

            return response.json(necessidades);
    }
}