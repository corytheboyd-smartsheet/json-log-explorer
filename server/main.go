package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

// Version Inject from build via linker argument
var Version string
var GitHeadSha string

var port = os.Getenv("PORT")
var address = os.Getenv("ADDRESS")
var rootDir = getRootDirAbsolutePath()

func main() {
	showVersionFlag := flag.Bool("v", false, "Show version")
	flag.Parse()
	if *showVersionFlag {
		fmt.Println(fmt.Sprintf("%s (%s)", Version, GitHeadSha))
		os.Exit(0)
	}

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
