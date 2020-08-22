FROM golang:latest

RUN go get "github.com/kkdai/youtube"

COPY . /app
WORKDIR /app

RUN go build -o main .

EXPOSE 3000

CMD ["./main"]
