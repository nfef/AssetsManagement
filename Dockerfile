# STAGE 1 : build the react project
FROM node:18.12.1 as build

# add certificcate
#ADD DigiCertCA.crt /usr/local/share/ca-certificates/DigiCertCA.crt
#RUN chmod 644 /usr/local/share/ca-certificates/DigiCertCA.crt && update-ca-certificates

# set working directory
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# copy package.json and install app dependencies
COPY package.json package-lock.json ./
RUN npm ci 

# set max_old_space_size to 8Go
RUN export NODE_OPTIONS=--max_old_space_size=8192

# copy the project into the image
COPY . ./

# build production 
RUN npm run build

# stage 2 - build the final image and copy the react build files
FROM nginx:1.17.8-alpine

# copy the builded files from previous stage to deployement directory for nginx
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# replace the old default.conf file with our own
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx.conf /etc/nginx/conf.d

# set time zone to Douala/Cameroun
ENV TZ=Africa/Douala
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# expose the app to the port 8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]