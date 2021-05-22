FROM golang:1.16.4

WORKDIR /app
ADD go.mod /app/go.mod

RUN go mod tidy

ADD . /app

RUN /bin/bash rewrite.sh && go build

EXPOSE 3000

CMD ["/app/clipper"]
