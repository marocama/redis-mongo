# redis-mongo

Aplicação Node.js com MongoDB e Redis como cache.

- Container com MongoDB e outro com Mongo Express para auxiliar no gerenciamento dos dados
- Container Node com Mongoose expondo uma API simples, apenas para listar e salvar dados em uma coleção do MongoDB

O objetivo deste repositório é exemplificar de maneira simples o uso do Redis como sistema de cache para os dados armazenados no MongoDB.

`docker-composer up`