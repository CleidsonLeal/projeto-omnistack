const connection = require('../database/connection');

module.exports = {
    async index(request,response){
        const { page = 1} = request.query;

        const [count] = await connection('necessidades').count();

        console.log(count);


    
        const necessidades = await connection('necessidades')
            .join('doadores', 'doadores.id', '=', 'necessidades.doadores_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'necessidades.*',
                'doadores.name',
                'doadores.email',
                'doadores.whatsapp',
                'doadores.city',
                'doadores.uf'           
            
            
            ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(necessidades);

    },


    async create(request, response) {
        const { title, description, value } = request.body;
        const doadores_id = request.headers.authorization;

        const [id] = await connection('necessidades').insert({
            title,
            description,
            value,
            doadores_id,
        });

        return response.json({ id });
    },

    async delete(request,response){
        const {id} = request.params;
        const doadores_id = request.headers.authorization;

        const necessidades = await connection('necessidades')
            .where('id', id)
            .select('doadores_id')
            .first();
        if (necessidades.doadores_id != doadores_id) {
            return response.status(401).json({ error: 'Operation not permited.'});
        }

        await connection('necessidades').where('id', id).delete();

        return response.status(204).send();

    }
};