
# Task App

This app can be used to create and assign tasks on etherium blockchain

## Deployment

In order to deploy this application you'd need a working docker env. Blockchain part of the application is already deployed on ethereum sepolia testnet at address: `0x37E0aAEd8BD206D39cd0d92Dc5Fa91AaeadF3239`

```bash
  sudo docker sudo docker build -t task-frontend .   
  sudo docker run -d -p 8080:80 task-frontend
```

This will build the docker images and run the application.



## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd task-frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npx ng serve
```

