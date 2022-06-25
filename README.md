# Teste Oderço PHP - UI
Teste Oderço

## Requisitos
- [Docker](https://docs.docker.com/engine/install/).

## Instalação

Baixando o projeto.
```sh
git clone https://github.com/karenyov/odercoTestPHP.git
```

Na raiz do projeto abra o terminal e execute o comando:
```sh
docker build -t vuejs-cookbook/dockerize-vuejs-app .
```
Subindo a aplicação:
```sh
docker run -it -p 8080:8080 --rm --name dockerize-vuejs-app-1 vuejs-cookbook/dockerize-vuejs-app
```
