package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	// "regexp"
	// "strings"
	"github.com/rylio/ytdl"
)

type VideoBlueprint struct {
	Id string
}

func main() {
	fileServer := http.FileServer(http.Dir("./public")) // New code
	http.Handle("/", fileServer)                        // New code
	http.HandleFunc("/api/grab", urlHandler)

	fmt.Printf("Starting server at port 3000\n")
	if err := http.ListenAndServe(":3000", nil); err != nil {
		log.Fatal(err)
	}
}

func urlHandler(res http.ResponseWriter, req *http.Request) {
	if req.URL.Path != "/api/grab" {
		http.Error(res, "404 not found.", http.StatusNotFound)
		return
	}
	if req.Method != "POST" {
		http.Error(res, "Method is not supported.", http.StatusNotFound)
		return
	}
	fmt.Fprintf(res, "POST request successful")

	var video VideoBlueprint

	json.NewDecoder(req.Body).Decode(&video)

	log.Println(video.Id)

	// build url
	req_url := fmt.Sprintf("https://www.youtube.com/get_video_info?html5=1&video_id=%s", video.Id)
	log.Println(req_url)

	// make request for url info
	response, err := http.Get(req_url)
	if err != nil {
		log.Println("Cannot get video Info")
		return
	}
	// we should have the video info?
	defer response.Body.Close()
	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Println("Cannot parse video Info")
		return
	}
	decoded_response, err := url.QueryUnescape(string(body))
	if err != nil {
		log.Println("Could not decode response")
		return
	}
	// finder := regexp.MustCompile(`\"https?:(.*!("))\"`)
	// split_response := strings.Split(decoded_response, ",")
	// mp := make(map[string]interface{})
	// json_err := json.Unmarshal([]byte(decoded_response), &mp)
	// if json_err != nil {
	// 	log.Println("ERROR PARSING RETURN JSON")
	// 	return
	// }
	query, err := url.ParseQuery(decoded_response)
	// keys := make([]string, 0, len(query))
	// for k := range query {
	// 	keys = append(keys, k)
	// }
	log.Println(">>>>", query["player_response"])

}
