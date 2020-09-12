FROM golang:latest

RUN go get "github.com/kkdai/youtube"

ADD . /app
WORKDIR /app

RUN ./rewrite && go build -o main .

EXPOSE 3000

CMD ["./main"]
