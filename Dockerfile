FROM golang:1.15.2

RUN go get "github.com/kkdai/youtube"

ADD . /app
WORKDIR /app

RUN /bin/bash rewrite.sh && go build -o main .

EXPOSE 3000

CMD ["./main"]
