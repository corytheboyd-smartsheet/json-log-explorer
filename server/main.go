package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

var port = os.Getenv("PORT")
var address = os.Getenv("ADDRESS")
var rootDir = getRootDirAbsolutePath()

func main() {
	publicPath := fmt.Sprintf("%s/public", rootDir)
	addressAndPort := fmt.Sprintf("%s:%s", address, port)
	log.Printf("Starting server: address=`%s` publicPath=`%s`\n", addressAndPort, publicPath)
	log.Fatal(
		http.ListenAndServe(
			addressAndPort,
			http.FileServer(http.Dir(publicPath)),
		),
	)
}

func getRootDirAbsolutePath() string {
	pathExecutable, err := os.Executable()
	if err != nil {
		panic(err)
	}
	return filepath.Dir(pathExecutable)
}
