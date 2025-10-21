# MedBusca - API Testing Guide

Este guia ensina como testar todos os endpoints da API MedBusca usando o Postman.

## Configuração Base

- **URL Base**: `http://localhost:5000/api`
- **Content-Type**: `application/json`

## 1. Health Check

### GET - Verificar se a API está funcionando
```
GET http://localhost:5000/api/health
```

**Headers:**
- Content-Type: application/json

**Resposta esperada:**
```json
{
  "success": true,
  "message": "API medbusca está funcionando!",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 2. Usuários

### POST - Criar usuário
```
POST http://localhost:5000/api/usuarios
```

**Body (JSON):**
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456"
}
```

### GET - Listar todos os usuários
```
GET http://localhost:5000/api/usuarios
```

### GET - Buscar usuário por ID
```
GET http://localhost:5000/api/usuarios/{id}
```

### DELETE - Deletar usuário
```
DELETE http://localhost:5000/api/usuarios/{id}
```

## 3. Farmácias

### POST - Criar farmácia
```
POST http://localhost:5000/api/farmacias
```

**Body (JSON):**
```json
{
  "nome": "Farmácia Central",
  "endereco": {
    "rua": "Rua das Flores",
    "numero": "123",
    "complemento": "Loja 1",
    "bairro": "Centro",
    "cidade": "São Paulo",
    "estado": "SP",
    "cep": "01234-567"
  }
}
```

### GET - Listar todas as farmácias
```
GET http://localhost:5000/api/farmacias
```

### GET - Buscar farmácia por ID
```
GET http://localhost:5000/api/farmacias/{id}
```

### DELETE - Deletar farmácia
```
DELETE http://localhost:5000/api/farmacias/{id}
```

## 4. Remédios

### POST - Criar remédio
```
POST http://localhost:5000/api/remedios
```

**Body (JSON):**
```json
{
  "nome": "Paracetamol",
  "descricao": "Analgésico e antitérmico",
  "categoria": "Dor e Febre",
  "preco": 15.50
}
```

**Categorias disponíveis:**
- "Dor e Febre"
- "Gripe e Resfriado"
- "Estômago e intestino"
- "Alergia e infecções"

### GET - Listar todos os remédios
```
GET http://localhost:5000/api/remedios
```

### GET - Buscar remédio por ID
```
GET http://localhost:5000/api/remedios/{id}
```

### GET - Buscar remédio por nome
```
GET http://localhost:5000/api/remedios/{nome}
```

### GET - Buscar remédio por categoria
```
GET http://localhost:5000/api/remedios/{categoria}
```

### PUT - Atualizar remédio
```
PUT http://localhost:5000/api/remedios/{id}
```

**Body (JSON):**
```json
{
  "nome": "Paracetamol 500mg",
  "descricao": "Analgésico e antitérmico 500mg",
  "categoria": "Dor e Febre",
  "preco": 18.00,
  "disponivel": true
}
```

### DELETE - Deletar remédio
```
DELETE http://localhost:5000/api/remedios/{id}
```

## 5. Favoritos

### POST - Adicionar remédio aos favoritos
```
POST http://localhost:5000/api/usuarios/{usuarioId}/favoritos/{remedioId}
```

### GET - Listar favoritos do usuário
```
GET http://localhost:5000/api/usuarios/{usuarioId}/favoritos
```

### DELETE - Remover remédio dos favoritos
```
DELETE http://localhost:5000/api/usuarios/{usuarioId}/favoritos/{remedioId}
```

### PATCH - Toggle notificação de estoque
```
PATCH http://localhost:5000/api/usuarios/{usuarioId}/favoritos/{remedioId}/notificacao
```

## 6. Notificações

### GET - Listar notificações do usuário
```
GET http://localhost:5000/api/{usuarioId}/notificacoes
```

### PATCH - Marcar notificação como lida
```
PATCH http://localhost:5000/api/{usuarioId}/notificacoes/{notificacaoId}/lida
```

## Exemplos de Teste no Postman

### 1. Criar um usuário
1. Método: POST
2. URL: `http://localhost:5000/api/usuarios`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "nome": "Maria Santos",
  "email": "maria@email.com",
  "senha": "senha123"
}
```

### 2. Criar uma farmácia
1. Método: POST
2. URL: `http://localhost:5000/api/farmacias`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "nome": "Farmácia São Paulo",
  "endereco": {
    "rua": "Av. Paulista",
    "numero": "1000",
    "complemento": "Sobreloja",
    "bairro": "Bela Vista",
    "cidade": "São Paulo",
    "estado": "SP",
    "cep": "01310-100"
  }
}
```

### 3. Criar um remédio
1. Método: POST
2. URL: `http://localhost:5000/api/remedios`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "nome": "Dipirona",
  "descricao": "Analgésico e antitérmico",
  "categoria": "Dor e Febre",
  "preco": 8.50
}
```

### 4. Adicionar remédio aos favoritos
1. Método: POST
2. URL: `http://localhost:5000/api/usuarios/{usuarioId}/favoritos/{remedioId}`
3. Headers: `Content-Type: application/json`
4. Body: vazio

## Respostas de Erro Comuns

- **400 Bad Request**: Dados inválidos ou duplicados
- **404 Not Found**: Recurso não encontrado
- **500 Internal Server Error**: Erro interno do servidor

## Dicas para Testes

1. **Sempre use o Content-Type correto**: `application/json`
2. **Copie os IDs das respostas**: Use os IDs retornados nas criações para outros testes
3. **Teste cenários de erro**: Tente criar recursos duplicados ou com dados inválidos
4. **Verifique as respostas**: Todas as respostas seguem o padrão `{success: boolean, data: object, message: string}`
