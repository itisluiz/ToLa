# Documentação APIs ToLá

## Auth

### **POST**: /api/auth/signup
#### Espera JSON:
```json
PARA PESSOA FÍSICA:
{
    "email": "exemplo@email.com", 
    "senha": "123456", 
    "nome": "Fulano",
    "sobrenome": "Ciclano",
    "genero": "0",
    "nascimento": "1990-12-30",
    "cpf": "00000000000"
}

PARA PESSOA JURÍDICA:
{
    "email": "exemplo@email.com", 
    "senha": "123456", 
    "titulo": "Empresa de Tal",
    "cnpj": "00000000000000"
}
```
#### Responde JSON (HTTP 200):
```json
{"err": 1, "verbose": "Um ou mais campos para cadastro de ${"pessoa jurídica" : "pessoa física"} não foram recebidos"}

{"err": 2, "verbose": "E-mail ou CPF/CNPJ já cadastrado(s)"}

{"err": 3, "verbose": "Conta já cadastrada e aguardando verificação de e-mail"}

{"err": 4, "verbose": "Um ou mais campos eram longos demais"}

{"verbose": "Conta de ${"pessoa jurídica" : "pessoa física"} criada e e-mail enviado"}
```

### **POST**: /api/auth/login
#### Espera JSON:
```json
{
    "email": "exemplo@email.com", 
    "senha": "123456"
}
```
#### Responde JSON (HTTP 200) + Cookie JWT se login efetuado:
```json
{"err": 1, "verbose": "Um ou mais campos para login não foram recebidos"}

{"err": 2, "verbose": "E-mail ou senha incorreto(s)"}

{"err": 3, "verbose": "E-mail de conta ainda não verificado"}

{"verbose": "Login efetuado"}
```

### **POST**: /api/auth/status
#### Não espera nada
#### Responde JSON (HTTP 200)
```json
{"verbose": "Não logado"}

PARA PESSOA FÍSICA:
{
    "pessoafisica": true,
    "verbose": "Logado como pessoa física",
    "userinfo": {
        "id_credencial": 1,
        "nome": "Fulano",
        "sobrenome": "Ciclano",
        "cpf": "00000000000",
        "nascimento": "1990-12-30",
        "genero": 0
    }
}

PARA PESSOA JURÍDICA:
{
    "verbose": "Logado como pessoa jurídica",
    "userinfo": {
        "id_credencial": 2,
        "titulo": "Empresa de Tal",
        "cnpj": "00000000000000"
    }
}
```

### **GET**: /api/auth/logout
#### Não espera nada
#### Não responde nada (HTTP 200)
Desloga (remove cookie de sessão) e redireciona para raiz


