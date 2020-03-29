exports.up = function(knex) {
    return knex.schema.createTable('necessidades', function(table){
        table.increments(); 
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        
        table.string('doadores_id').notNullable();
        
        table.foreign('doadores_id').references('id').inTable('doadores');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('necessidades')
  };
  