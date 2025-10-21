# MedBusca - API Backend

API REST para o sistema MedBusca, uma aplicação para busca de remédios e farmácias.

## 📋 Índice

- [Configuração](#configuração)
- [Iniciando o Servidor](#iniciando-o-servidor)
- [Endpoints da API](#endpoints-da-api)
- [Como usar no Postman](#como-usar-no-postman)
- [Estrutura dos Dados](#estrutura-dos-dados)
- [Códigos de Status HTTP](#códigos-de-status-http)

## 🚀 Configuração

### Pré-requisitos

- Node.js (versão 14 ou superior)
- MongoDB
- Postman (para testar as requisições)

### Instalação

1. Clone o repositório
2. Navegue até a pasta do backend:
   ```bash
   cd back
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz da pasta `back`
   - Adicione as seguintes variáveis:
   ```
   MONGODB_URI=mongodb://localhost:27017/medbusca
   PORT=5000
   NODE_ENV=development
   ```

## 🖥️ Iniciando o Servidor

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

O servidor estará rodando em `http://localhost:5000`

## 📡 Endpoints da API

### Base URL
```
http://localhost:5000/api
```

### Health Check
- **GET** `/api/health` - Verifica se a API está funcionando

### Usuários
- **POST** `/api/usuarios` - Criar novo usuário
- **GET** `/api/usuarios` - Listar todos os usuários
- **GET** `/api/usuarios/:id` - Buscar usuário por ID
- **DELETE** `/api/usuarios/:id` - Deletar usuário

### Farmácias
- **POST** `/api/farmacias` - Criar nova farmácia
- **GET** `/api/farmacias` - Listar todas as farmácias
- **GET** `/api/farmacias/:id` - Buscar farmácia por ID
- **DELETE** `/api/farmacias/:id` - Deletar farmácia

### Remédios
- **POST** `/api/remedios` - Criar novo remédio
- **GET** `/api/remedios` - Listar todos os remédios
- **GET** `/api/remedios/:id` - Buscar remédio por ID
- **GET** `/api/remedios/:nome` - Buscar remédio por nome
- **DELETE** `/api/remedios/:id` - Deletar remédio

## 🧪 Como usar no Postman

### 1. Configuração Inicial

1. **Abra o Postman**
2. **Crie uma nova Collection** chamada "MedBusca API"
3. **Configure a Base URL**:
   - Vá em Collection Settings
   
### 2. Testando o Health Check

**Requisição:**
- **Método:** GET
- **URL:** `http://localhost:5000/api/health`
- **Headers:** (nenhum necessário)

**Resposta esperada:**
```json
{
  "success": true,
  "message": "API medbusca está funcionando!",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 3. Gerenciamento de Usuários

#### Criar Usuário
**Requisição:**
- **Método:** POST
- **URL:** `http://localhost:5000/api/usuarios`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (JSON):**
  ```json
  {
    "nome": "João Silva",
    "email": "joao@email.com",
    "senha": "123456"
  }
  ```

#### Listar Usuários
**Requisição:**
- **Método:** GET
- **URL:** `http://localhost:5000/api/usuarios`

#### Buscar Usuário por ID
**Requisição:**
- **Método:** GET
- **URL:** `http://localhost:5000/api/usuarios/64f1234567890abcdef12345`
- **Nota:** Substitua o ID por um ID válido retornado na criação

#### Deletar Usuário
**Requisição:**
- **Método:** DELETE
- **URL:** `http://localhost:5000/api/usuarios/64f1234567890abcdef12345`

### 4. Gerenciamento de Farmácias

#### Criar Farmácia
**Requisição:**
- **Método:** POST
- **URL:** `http://localhost:5000/api/farmacias`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (JSON):**
  ```json
  {
    "nome": "Farmácia São João",
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

#### Listar Farmácias
**Requisição:**
- **Método:** GET
- **URL:** `http://localhost:5000/api/farmacias`

**Resposta incluirá:**
- `mapsUrl`: Link direto para o Google Maps
- `enderecoCompleto`: Endereço formatado

#### Buscar Farmácia por ID
**Requisição:**
- **Método:** GET
- **URL:** `http://localhost:5000/api/farmacias/64f1234567890abcdef12345`

#### Deletar Farmácia
**Requisição:**
- **Método:** DELETE
- **URL:** `http://localhost:5000/api/farmacias/64f1234567890abcdef12345`

### 5. Gerenciamento de Remédios

#### Criar Remédio
**Requisição:**
- **Método:** POST
- **URL:** `http://localhost:5000/api/remedios`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (JSON):**
  ```json
  {
    "nome": "Paracetamol",
    "descricao": "Analgésico e antitérmico",
    "categoria": "Dor e Febre",
    "preco": 12.50
  }
  ```

**Categorias válidas:**
- `Dor e Febre`
- `Gripe e Resfriado`
- `Estômago e intestino`
- `Alergia e infecções`

#### Listar Remédios
**Requisição:**
- **Método:** GET
- **URL:** `http://localhost:5000/api/remedios`

#### Buscar Remédio por ID
**Requisição:**
- **Método:** GET
- **URL:** `http://localhost:5000/api/remedios/64f1234567890abcdef12345`

#### Buscar Remédio por Nome
**Requisição:**
- **Método:** GET
- **URL:** `http://localhost:5000/api/remedios?nome=remedio`
- **Nota:** Use o nome exato do remédio

#### Deletar Remédio
**Requisição:**
- **Método:** DELETE
- **URL:** `http://localhost:5000/api/remedios/64f1234567890abcdef12345`

### 6. Organizando no Postman

**Estrutura recomendada da Collection:**

```
📁 MedBusca API
├── 📁 Health Check
│   └── GET Health Check
├── 📁 Usuários
│   ├── POST Criar Usuário
│   ├── GET Listar Usuários
│   ├── GET Buscar Usuário por ID
│   └── DELETE Deletar Usuário
├── 📁 Farmácias
│   ├── POST Criar Farmácia
│   ├── GET Listar Farmácias
│   ├── GET Buscar Farmácia por ID
│   └── DELETE Deletar Farmácia
└── 📁 Remédios
    ├── POST Criar Remédio
    ├── GET Listar Remédios
    ├── GET Buscar Remédio por ID
    ├── GET Buscar Remédio por Nome
    └── DELETE Deletar Remédio
```

## 📊 Estrutura dos Dados

### Usuário
```json
{
  "nome": "string (obrigatório)",
  "email": "string (obrigatório, único)",
  "senha": "string (obrigatório)"
}
```

### Farmácia
```json
{
  "nome": "string (obrigatório)",
  "endereco": {
    "rua": "string (obrigatório)",
    "numero": "string (obrigatório)",
    "complemento": "string (opcional)",
    "bairro": "string (obrigatório)",
    "cidade": "string (obrigatório)",
    "estado": "string (obrigatório, max 2 caracteres)",
    "cep": "string (obrigatório)"
  }
}
```

### Remédio
```json
{
  "nome": "string (obrigatório)",
  "descricao": "string (obrigatório)",
  "categoria": "string (enum: 'Dor e Febre', 'Gripe e Resfriado', 'Estômago e intestino', 'Alergia e infecções')",
  "preco": 12 
}
```

## 🔢 Códigos de Status HTTP

- **200** - OK (sucesso)
- **201** - Created (criação bem-sucedida)
- **400** - Bad Request (dados inválidos)
- **404** - Not Found (recurso não encontrado)
- **500** - Internal Server Error (erro interno do servidor)

## 📝 Exemplos de Respostas

### Sucesso
```json
{
  "success": true,
  "data": { ... },
  "count": 5  // apenas em listagens
}
```

### Erro
```json
{
  "success": false,
  "message": "Descrição do erro"
}
```

## 🔧 Dicas para Testes

1. **Sempre teste o Health Check primeiro** para garantir que a API está funcionando
2. **Use IDs válidos** retornados nas operações de criação
3. **Verifique os headers** - sempre use `Content-Type: application/json` para POST
4. **Teste cenários de erro** - envie dados inválidos para ver as mensagens de erro
5. **Use a funcionalidade de variáveis** do Postman para facilitar os testes

## 🚨 Troubleshooting

### Problemas Comuns

1. **Erro de conexão com MongoDB:**
   - Verifique se o MongoDB está rodando
   - Confirme a string de conexão no `.env`

2. **Erro 404:**
   - Verifique se o servidor está rodando na porta correta
   - Confirme se a URL está correta

3. **Erro 400:**
   - Verifique se os dados enviados estão no formato correto
   - Confirme se todos os campos obrigatórios foram preenchidos

4. **Erro de CORS:**
   - A API já está configurada para aceitar requisições de qualquer origem
   - Se houver problemas, verifique se o servidor está rodando corretamente