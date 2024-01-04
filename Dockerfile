FROM node:20-alpine as build

RUN mkdir /project

WORKDIR /project

RUN npm install -g @angular/cli@17

COPY package.json package-lock.json ./

RUN npm clean-install

COPY . .

RUN ng build

FROM nginx:alpine

COPY --from=build /project/dist/task-frontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]